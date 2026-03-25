import { useRef } from "react";
import StatusBar from "@/components/lulafi/StatusBar";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaCard } from "@/components/lulafi/LulaCard";
import otpCheckmark from "@/assets/otp-checkmark.png";

const OTPScreen = () => {
  const { navigate } = useApp();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, value: string) => {
    if (value.length === 1 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col px-6 pb-12 screen-enter overflow-y-auto hide-scrollbar">
      <StatusBar />
      <div className="flex justify-between items-center pb-4">
        <BackButton to="signup" />
      </div>
      <div className="flex flex-col items-center gap-4 mt-4 mb-8 text-center">
        <img src={otpCheckmark} alt="Verify" className="w-20 h-20 object-contain" />
        <div className="text-2xl font-semibold text-text-primary">Verify Your Number</div>
        <div className="text-sm text-text-secondary">
          We've sent a 6-digit code to<br />
          <span className="text-brand font-semibold">+27784588458</span>{" "}
          <span className="cursor-pointer text-text-muted text-xs">✏</span>
        </div>
      </div>
      <LulaCard className="flex flex-col gap-6">
        <div className="text-sm text-center font-medium text-text-primary">Enter Code</div>
        <div className="flex gap-3 justify-center">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <input
              key={i}
              ref={el => { inputsRef.current[i] = el; }}
              className="otp-box"
              maxLength={1}
              type="text"
              onInput={(e) => handleInput(i, (e.target as HTMLInputElement).value)}
            />
          ))}
        </div>
        <LulaButton onClick={() => navigate("name")} className="w-full rounded-full gradient-brand text-white shadow-md">
          Verify
        </LulaButton>
      </LulaCard>
      <div className="text-xs text-text-muted text-center mt-6">
        Resend code in <span className="text-brand">60s</span>
      </div>
      <div className="flex flex-col gap-3 mt-6 text-sm text-text-muted">
        <div className="flex items-start gap-2">
          <span>ℹ️</span> We will automatically redirect you once the code is verified.
        </div>
        <div className="flex items-start gap-2">
          <span>✉️</span> Need help? Contact support@lulafi.com
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
