import { useEffect, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { useApp } from "@/context/AppContext";
import { getProvider, getProviderForm } from "@/data/providers";
import { Delete, Globe, Lock, ScanFace, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "face", "0", "del"] as const;

const PinAuthScreen = () => {
  const { navigate, activeProviderId, activeProviderFormId } = useApp();
  const [pin, setPin] = useState("");

  const provider = getProvider(activeProviderId);
  const form = getProviderForm(activeProviderId, activeProviderFormId);
  const orgName = provider?.name ?? "123_Examples";
  const formName = form?.name ?? "Add New User";

  useEffect(() => {
    if (pin.length < 4) return;
    const timer = setTimeout(() => {
      toast.success("Vault unlocked — fields autofilled", { description: `${orgName} · ${formName}` });
      setPin("");
      navigate("form");
    }, 450);
    return () => clearTimeout(timer);
  }, [pin, orgName, formName, navigate]);

  const press = (key: string) => {
    if (key === "del") return setPin(p => p.slice(0, -1));
    if (key === "face") {
      toast.success("Verified with Face ID — fields autofilled");
      return navigate("form");
    }
    setPin(p => (p.length >= 4 ? p : p + key));
  };


  return (
    <ScreenLayout hideNav header={<AppHeader title="PIN authorisation" />}>
      <div className="pb-4">
        <div className="px-6 mt-2 flex flex-col items-center text-center">
          <Lock size={30} className="text-brand" />
          <h1 className="text-2xl font-bold text-text-primary mt-2">Authorise data sharing</h1>
          <p className="text-sm text-text-muted mt-1">Step 2 of 2</p>
          <p className="text-sm text-text-secondary mt-3">
            Enter your vault PIN to autofill <span className="font-semibold text-text-primary">{formName}</span>{" "}
            for <span className="font-semibold text-text-primary">{orgName}</span>.
          </p>
        </div>

        <div className="px-6 mt-3">
          <div className="bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center shrink-0">
              <Globe size={18} className="text-success" />
            </span>
            <span className="text-sm text-text-primary font-semibold truncate">
              {orgName} <span className="text-text-muted font-normal">· {formName}</span>
            </span>
          </div>
        </div>

        {/* PIN dots */}
        <div className="mt-4 flex items-center justify-center gap-6">
          {[0, 1, 2, 3].map(i => (
            <span
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-colors ${
                pin.length > i ? "bg-brand" : "bg-bg-tertiary border border-border-primary"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="px-10 mt-3 grid grid-cols-3 gap-y-1">
          {KEYS.map(key => (
            <button
              key={key}
              onClick={() => press(key)}
              aria-label={key === "del" ? "Delete" : key === "face" ? "Use Face ID" : key}
              className="h-12 flex items-center justify-center text-2xl font-semibold text-text-primary cursor-pointer rounded-xl hover:bg-brand/[0.06] transition-colors"
            >
              {key === "face" ? (
                <ScanFace size={26} className="text-text-primary" />
              ) : key === "del" ? (
                <Delete size={24} className="text-text-primary" />
              ) : (
                key
              )}
            </button>
          ))}
        </div>

        <div className="px-6 mt-3 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-text-secondary leading-relaxed">
            By entering your PIN, you authorise lulaFi to autofill your vault details for{" "}
            <span className="font-semibold text-text-primary">{orgName}</span>.
          </p>
          <p className="text-sm text-text-secondary">
            Forgot your login PIN?{" "}
            <button
              onClick={() => toast.info("PIN reset link sent")}
              className="text-brand font-semibold cursor-pointer"
            >
              Reset Now
            </button>
          </p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Stored securely on this device</span>
          </div>
          <button
            onClick={() => {
              toast.info("Authorisation cancelled");
              navigate("consent");
            }}
            className="mt-1 py-2 text-base font-semibold text-text-primary cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default PinAuthScreen;
