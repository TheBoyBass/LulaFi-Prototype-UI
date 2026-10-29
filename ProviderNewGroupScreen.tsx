import { useEffect, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { useApp } from "@/context/AppContext";
import { Delete, ShieldCheck } from "lucide-react";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"] as const;

const OTPScreen = () => {
  const { navigate } = useApp();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length < 6) return;
    const timer = setTimeout(() => navigate("name"), 450);
    return () => clearTimeout(timer);
  }, [code, navigate]);

  const press = (key: string) => {
    if (key === "del") return setCode(c => c.slice(0, -1));
    if (key === "") return;
    setCode(c => (c.length >= 6 ? c : c + key));
  };

  return (
    <ScreenLayout hideNav header={<AppHeader title="Verify" />}>
      <div className="pb-4">
        <div className="px-6 mt-2 flex flex-col items-center text-center">
          <ShieldCheck size={30} className="text-brand" />
          <h1 className="text-2xl font-bold text-text-primary mt-2">Verify Your Number</h1>
          <p className="text-sm text-text-secondary mt-1">
            Enter the 6-digit code sent to<br />
            <span className="text-brand font-semibold">+27784588458</span>
          </p>
        </div>

        <div className="px-6 mt-2">
          <div className="bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-brand/15 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-brand" />
            </span>
            <span className="text-sm text-text-primary font-semibold truncate">
              +27784588458 <span className="text-text-muted font-normal">· SMS code</span>
            </span>
          </div>
        </div>

        {/* Code dots */}
        <div className="mt-3 flex items-center justify-center gap-3">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-colors ${
                code.length > i ? "bg-brand" : "bg-bg-tertiary border border-border-primary"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="px-10 mt-2 grid grid-cols-3 gap-y-1">
          {KEYS.map(key => (
            <button
              key={key || "blank"}
              onClick={() => press(key)}
              aria-label={key === "del" ? "Delete" : key === "" ? "Empty" : key}
              disabled={key === ""}
              className="h-12 flex items-center justify-center text-2xl font-semibold text-text-primary cursor-pointer rounded-xl hover:bg-brand/[0.06] transition-colors disabled:opacity-0 disabled:cursor-default"
            >
              {key === "del" ? <Delete size={24} className="text-text-primary" /> : key}
            </button>
          ))}
        </div>

        <div className="px-6 mt-2 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-text-secondary">
            Resend code in <span className="text-brand font-semibold">60s</span>
          </p>
          <button
            onClick={() => navigate("signup")}
            className="mt-1 py-2 text-base font-semibold text-text-primary cursor-pointer"
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default OTPScreen;

