import StatusBar from "@/components/lulafi/StatusBar";
import Logo from "@/components/lulafi/Logo";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { motion } from "framer-motion";
import onboardingLock from "@/assets/onboarding-lock.png";
import onboardingForm from "@/assets/onboarding-form.png";
import onboardingFingerprint from "@/assets/onboarding-fingerprint.png";

const IMAGES: Record<number, string> = {
  1: onboardingLock,
  2: onboardingForm,
  3: onboardingFingerprint,
};

interface OnboardingScreenProps {
  step: 1 | 2 | 3;
  icon: string;
  title: string;
  description: string;
  nextScreen: ScreenId;
}

const OnboardingScreen = ({ step, title, description, nextScreen }: OnboardingScreenProps) => {
  const { navigate } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col px-6 pb-12 screen-enter overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-bg-primary" />
      {/* Radial teal glow with pulse */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsla(175,70%,40%,0.15) 0%, transparent 60%)' }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 hidden dark:block"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsla(175,70%,40%,0.25) 0%, hsl(210,61%,11%) 50%, hsl(210,61%,11%) 100%)' }}
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex flex-col flex-1">
        <StatusBar />
        <div className="flex justify-between items-center pb-4">
          <Logo />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-2xl font-semibold text-text-primary">{title}</div>
            <div className="text-sm text-text-secondary max-w-[260px] mx-auto">{description}</div>
            <img src={IMAGES[step]} alt={title} className="w-[140px] h-[140px] object-contain" loading="lazy" />
          </motion.div>
        </div>
        <div className="flex flex-col gap-4">
          <LulaButton onClick={() => navigate(nextScreen)} className="w-full rounded-full gradient-brand text-white shadow-md">
            {step === 3 ? "Get started" : "Next"}
          </LulaButton>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 rounded-full transition-all duration-250 ${s === step ? "w-2 bg-brand" : "w-2 bg-border"}`} />
            ))}
          </div>
          {step < 3 && (
            <button onClick={() => navigate("signup")} className="bg-transparent text-text-muted text-sm py-2 px-4 border-none cursor-pointer hover:text-text-secondary transition-colors">
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
