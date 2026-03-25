import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaCard } from "@/components/lulafi/LulaCard";
import { Building2, FileText } from "lucide-react";
import otpCheckmark from "@/assets/otp-checkmark.png";

const ConsentScreen = () => {
  const { navigate } = useApp();

  return (
    <ScreenLayout activeTab="services">
      <div className="flex justify-between items-center px-6 pb-4">
        <BackButton to="org" />
      </div>
      <div className="px-6 flex flex-col items-center gap-6 text-center flex-1">
        <img src={otpCheckmark} alt="Consent" className="w-20 h-20 object-contain" loading="lazy" />
        <div>
          <div className="text-2xl font-semibold text-text-primary mb-3">Data Sharing Consent</div>
          <div className="text-sm text-text-secondary max-w-[270px] mx-auto">Review what information will be shared with this organization</div>
        </div>
        <LulaCard className="w-full text-left">
          <div className="flex items-center gap-4 pb-4">
            <div className="w-[38px] h-[38px] rounded-md bg-bg-tertiary flex items-center justify-center shrink-0">
              <Building2 size={17} className="text-text-secondary" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Organization</div>
              <div className="text-sm font-medium text-text-primary">18012715663</div>
            </div>
          </div>
          <div className="h-px bg-border w-full" />
          <div className="flex items-center gap-4 pt-4">
            <div className="w-[38px] h-[38px] rounded-md bg-bg-tertiary flex items-center justify-center shrink-0">
              <FileText size={17} className="text-text-secondary" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Form</div>
              <div className="text-sm font-medium text-text-primary">Loan Application Form</div>
            </div>
          </div>
        </LulaCard>
        <div className="text-sm text-text-muted text-left leading-relaxed">
          Lulafi never stores your data on external servers. All information stays in your device's vault until you choose to share it.
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-3">
        <LulaButton onClick={() => navigate("form")} className="w-full rounded-full gradient-brand text-white shadow-md">
          Agree and Continue
        </LulaButton>
        <LulaButton variant="secondary" onClick={() => navigate("org")} className="w-full rounded-full">
          Cancel
        </LulaButton>
      </div>
    </ScreenLayout>
  );
};

export default ConsentScreen;
