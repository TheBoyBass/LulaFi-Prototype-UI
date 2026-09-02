import { useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import SponsoredBanner from "@/components/lulafi/SponsoredBanner";
import { useApp } from "@/context/AppContext";
import { getProvider, getProviderForm } from "@/data/providers";
import { Check, ChevronRight, FileText, Info, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ConsentScreen = () => {
  const { navigate, activeProviderId, activeProviderFormId } = useApp();
  const [agreed, setAgreed] = useState(true);

  const provider = getProvider(activeProviderId);
  const form = getProviderForm(activeProviderId, activeProviderFormId);
  const orgName = provider?.name ?? "123_Examples";
  const formName = form?.name ?? "Add New User";

  const fields = [
    { name: "First name", source: "Auto-filled" },
    { name: "Last name", source: "Auto-filled" },
    { name: "Description", source: "Entered by you" },
  ];

  return (
    <ScreenLayout activeTab="discover" header={<AppHeader title="Consent" />}>
      <div className="pb-8">
        <div className="px-6">
          <SponsoredBanner onClick={() => navigate("org")} />
        </div>

        <div className="px-6 mt-6">
          <h1 className="text-2xl font-bold text-text-primary">Data sharing consent</h1>
          <p className="text-sm text-text-muted mt-1">Step 1 of 2</p>
        </div>

        {/* Request summary */}
        <div className="px-6 mt-4">
          <button
            onClick={() => navigate("org")}
            className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 flex items-center gap-4 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-brand" />
            </div>
            <span className="flex-1 min-w-0">
              <span className="block text-base font-semibold text-text-primary truncate">
                {orgName}
              </span>
              <span className="block text-sm text-text-muted truncate">{formName}</span>
            </span>
            <ChevronRight size={18} className="text-text-muted shrink-0" />
          </button>
        </div>

        {/* Fields shared */}
        <div className="px-6 mt-4">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-4">
            <div className="text-base font-semibold text-text-primary mb-2">
              Before you authorise
            </div>
            <div className="flex flex-col">
              {fields.map((f, i) => (
                <div
                  key={f.name}
                  className={`flex items-center gap-3 py-3 ${
                    i < fields.length - 1 ? "border-b border-border-primary" : ""
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                    <Check size={15} className="text-success" />
                  </span>
                  <span className="text-sm text-text-primary font-medium">
                    {f.name} <span className="text-text-muted font-normal">— {f.source}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="px-6 mt-3">
          <div className="bg-brand/5 border border-border-primary rounded-xl p-4 flex gap-3">
            <Info size={18} className="text-text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary leading-relaxed">
              You are about to share this information with{" "}
              <span className="font-semibold text-text-primary">{orgName}</span>. lulaFi keeps a copy
              securely on your device.
            </p>
          </div>
        </div>

        {/* Consent checkbox */}
        <div className="px-6 mt-3">
          <button
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed(!agreed)}
            className="w-full bg-bg-secondary border border-border-primary rounded-xl p-4 flex gap-3 text-left cursor-pointer"
          >
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                agreed ? "bg-brand border-brand" : "bg-bg-primary border-border-primary"
              }`}
            >
              {agreed && <Check size={15} className="text-primary-foreground" />}
            </span>
            <span className="text-sm text-text-secondary leading-relaxed">
              I consent to share this information with{" "}
              <span className="font-semibold text-text-primary">{orgName}</span> for the purpose of
              processing this request. <span className="text-destructive">*</span>
            </span>
          </button>
        </div>

        <div className="px-6 mt-4 flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-success" />
          <span className="text-sm text-text-secondary">
            Next you'll confirm this action with your PIN.
          </span>
        </div>

        <div className="px-6 mt-4 flex flex-col gap-2">
          <button
            disabled={!agreed}
            onClick={() => {
              if (!agreed) return;
              navigate("pinauth");
            }}
            className="w-full rounded-xl gradient-brand text-primary-foreground py-4 font-semibold flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Lock size={18} /> Authorise with PIN
          </button>
          <button
            onClick={() => {
              toast.info("Data sharing cancelled");
              navigate("org");
            }}
            className="w-full py-3 text-base font-semibold text-text-primary cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ConsentScreen;
