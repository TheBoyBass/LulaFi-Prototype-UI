import StatusBar from "@/components/lulafi/StatusBar";
import Logo from "@/components/lulafi/Logo";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaCard } from "@/components/lulafi/LulaCard";
import { Lock, Shield, Ban } from "lucide-react";
import signupShield from "@/assets/signup-shield.png";

const SignupScreen = () => {
  const { navigate } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col px-6 pb-12 screen-enter overflow-y-auto hide-scrollbar">
      <StatusBar />
      <div className="flex justify-center pb-2">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-1 mb-4">
        <div className="text-2xl font-semibold text-text-primary">Welcome</div>
      </div>
      <div className="flex justify-center mb-4">
        <img src={signupShield} alt="Security" className="w-[200px] h-[200px] object-contain" />
      </div>
      <div className="text-lg font-semibold text-text-primary text-center mb-4">Create Account</div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-bg-secondary border border-border-primary rounded-md text-sm font-medium text-text-primary whitespace-nowrap cursor-pointer">
              🇿🇦 +27
            </div>
            <input type="tel" placeholder="Phone Number" className="flex-1 w-full py-3 px-4 bg-bg-secondary border border-border-primary rounded-md text-text-primary text-[15px] outline-none placeholder:text-text-muted focus:border-brand transition-colors" />
          </div>
        </div>
        <LulaButton onClick={() => navigate("otp")} className="w-full rounded-full gradient-brand text-white shadow-md">
          Send OTP
        </LulaButton>
        <LulaCard className="flex flex-col gap-4">
          {[
            { icon: <Lock size={16} className="text-brand" />, text: "Your phone number is used for verification only" },
            { icon: <Shield size={16} className="text-brand" />, text: "All your data is encrypted and stored locally" },
            { icon: <Ban size={16} className="text-brand" />, text: "We never share your information with third parties" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-[13px] text-text-muted leading-relaxed">
              <span className="shrink-0 mt-0.5">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </LulaCard>
        <div className="text-xs text-text-muted text-center">
          By continuing, you agree to our <span className="text-brand cursor-pointer">Terms of Service</span> and <span className="text-brand cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
