import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, Fingerprint, ShieldCheck } from "lucide-react";

import Phone from "./Phone";
import HeroScreenHost from "./HeroScreenHost";
import FormFillScreen from "@/screens/FormFillScreen";
import PinAuthScreen from "@/screens/PinAuthScreen";
import ActivityScreen from "@/screens/ActivityScreen";
import ProviderDashboardScreen from "@/screens/provider/ProviderDashboardScreen";
import ProviderFormsInboxScreen from "@/screens/provider/ProviderFormsInboxScreen";
import { HERO_SEQUENCE } from "./heroSequence";

const float = (delay: number) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const HeroPhones = () => {
  const [step, setStep] = useState(0);
  const { phase, duration } = HERO_SEQUENCE[step];

  const clientScreen =
    phase === "pin" || phase === "approved"
      ? { key: "pin", node: <PinAuthScreen /> }
      : phase === "filling"
        ? { key: "form", node: <FormFillScreen /> }
        : { key: "activity", node: <ActivityScreen /> };

  const providerScreen =
    phase === "sending" || phase === "received"
      ? { key: "inbox", node: <ProviderFormsInboxScreen /> }
      : { key: "dash", node: <ProviderDashboardScreen /> };

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % HERO_SEQUENCE.length), duration);
    return () => clearTimeout(t);
  }, [step, duration]);

  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[520px] sm:h-[620px]">
      {/* Animated glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 45%, hsla(172,66%,50%,0.28) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 75% 80%, hsla(239,84%,67%,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Paired devices share one perspective so they read as a single hero scene */}
      <div
        className="absolute inset-0 z-10"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 45%" }}
      >
        {/* Phone 1 — client */}
        <motion.div
          className="absolute left-[2%] top-[6%]"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 90, rotateY: 26, rotateZ: -8 }}
          animate={{ opacity: 1, y: 0, rotateY: 15, rotateZ: -3 }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
        >
          <motion.div {...float(0)}>
            <Phone>
              <HeroScreenHost key={clientScreen.key}>{clientScreen.node}</HeroScreenHost>
            </Phone>
          </motion.div>
        </motion.div>

        {/* Phone 2 — provider */}
        <motion.div
          className="absolute bottom-[6%] right-[2%]"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 110, rotateY: -26, rotateZ: 8 }}
          animate={{ opacity: 1, y: 0, rotateY: -15, rotateZ: 3 }}
          transition={{ duration: 1, type: "spring", stiffness: 80, delay: 0.2 }}
        >
          <motion.div {...float(1.4)}>
            <Phone>
              <HeroScreenHost key={providerScreen.key} state={{ mode: "provider" }}>
                {providerScreen.node}
              </HeroScreenHost>
            </Phone>
          </motion.div>
        </motion.div>
      </div>

      {/* Travelling form submission — only while sending */}
      <AnimatePresence>
        {phase === "sending" && (
          <motion.div
            key="parcel"
            className="absolute left-[26%] top-[36%] z-20 flex items-center gap-2 rounded-2xl border border-brand/30 bg-bg-primary/95 px-4 py-3 shadow-[var(--shadow-glow)] backdrop-blur"
            initial={{ x: 0, y: 0, scale: 0.85, opacity: 0 }}
            animate={{ x: [0, 70, 140], y: [0, 60, 150], scale: [0.85, 1.1, 0.85], opacity: [0, 1, 1] }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Municipal account renewal</p>
              <p className="text-[11px] text-text-muted">Lindo → City of Tshwane</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status chips follow the current step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`chip-top-${phase}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute right-2 top-6 z-20 flex items-center gap-2 rounded-xl border border-border-primary bg-bg-primary/95 px-3 py-2 shadow-[var(--shadow-md)]"
        >
          {phase === "received" ? (
            <>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-xs font-medium text-text-secondary">Submission received</span>
            </>
          ) : phase === "sending" ? (
            <>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/15 text-brand">
                <FileText size={14} />
              </div>
              <span className="text-xs font-medium text-text-secondary">Sending securely</span>
            </>
          ) : (
            <>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/15 text-brand">
                <Fingerprint size={14} />
              </div>
              <span className="text-xs font-medium text-text-secondary">
                {phase === "pin" ? "Enter vault PIN" : phase === "approved" ? "PIN approved" : "Vault autofill ready"}
              </span>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute bottom-24 left-2 z-20 flex items-center gap-2 rounded-xl border border-border-primary bg-bg-primary/95 px-3 py-2 shadow-[var(--shadow-md)]"
        animate={{ y: [0, 12, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/15 text-brand">
          <ShieldCheck size={14} />
        </div>
        <span className="text-xs font-medium text-text-secondary">Consent approved</span>
      </motion.div>
    </div>
  );
};

export default HeroPhones;
