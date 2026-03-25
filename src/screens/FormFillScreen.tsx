import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaInput } from "@/components/lulafi/LulaInput";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { FileText } from "lucide-react";

const FormFillScreen = () => {
  const { navigate } = useApp();

  return (
    <ScreenLayout activeTab="services">
      <div className="flex items-center px-6 pb-4">
        <BackButton to="org" />
        <div className="flex-1 pl-3">
          <div className="text-sm font-semibold text-text-primary">18012715663</div>
        </div>
      </div>
      <div className="px-6 flex flex-col gap-6 pb-4">
        <div>
          <div className="text-2xl font-semibold text-text-primary mb-2">Loan Application Form</div>
          <div className="text-sm text-text-secondary mb-3">The Loan Application Form allows a customer to apply for financial assistance by submitting personal, employment, financial, and supporting document information in order for the system to assess eligibility and risk.</div>
          <LulaBadge variant="neutral"><FileText size={12} className="inline" /> 13 fields</LulaBadge>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-base font-semibold text-text-primary pb-2">Section A — Personal Details</div>
          {[
            { label: "First Name", required: true },
            { label: "Last Name", required: true },
            { label: "ID Number", required: true },
          ].map((f, i) => (
            <div key={i} className="bg-bg-secondary border border-border-primary rounded-lg p-4">
              <LulaInput
                label={`${f.label}${f.required ? " *" : ""}`}
              />
            </div>
          ))}
        </div>
        <LulaButton onClick={() => navigate("home2")} className="w-full rounded-full gradient-brand text-white shadow-md">
          Send to organization
        </LulaButton>
      </div>
    </ScreenLayout>
  );
};

export default FormFillScreen;
