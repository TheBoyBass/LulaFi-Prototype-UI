import { useEffect, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaInput } from "@/components/lulafi/LulaInput";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { getProvider, getProviderForm, buildProviderLink, getFormFieldPlan } from "@/data/providers";
import { FileText, Sparkles, Share2, Link as LinkIcon, ShieldCheck, Pencil } from "lucide-react";
import { toast as sonner } from "sonner";

const fallbackFields = ["First Name", "Last Name", "ID Number"];

const FormFillScreen = () => {
  const { navigate, activeProviderId, activeProviderFormId, arrivedViaDeepLink } = useApp();
  const provider = getProvider(activeProviderId);
  const form = getProviderForm(activeProviderId, activeProviderFormId);

  const plan = getFormFieldPlan(form);
  const prefilledLabels = plan.autofilled.length
    ? plan.autofilled.map(f => f.label)
    : fallbackFields;
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    plan.autofilled.forEach(f => {
      next[f.label] = provider ? f.value : "";
    });
    plan.manual.forEach(label => {
      next[label] = "";
    });
    setValues(next);
  }, [activeProviderId, activeProviderFormId]); // eslint-disable-line react-hooks/exhaustive-deps

  const shareLink = async () => {
    if (!provider) return;
    const url = buildProviderLink(provider.id, form?.id);
    try {
      if (navigator.share) {
        await navigator.share({ title: `${form?.name ?? provider.name} on lulaFi`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "Opening it lands on this form with your details prefilled." });
    } catch {
      toast({ title: "Share link", description: url });
    }
  };

  const title = form?.name ?? "Loan Application Form";
  const fieldCount = form?.fields ?? 13;

  return (
    <ScreenLayout activeTab="services" header={<AppHeader title="FormFill" />}>
      <div className="flex items-center px-6 pb-4">
        <BackButton to="org" />
        <div className="flex-1 pl-3">
          <div className="text-sm font-semibold text-text-primary">
            {provider?.name ?? "18012715663"}
          </div>
        </div>
      </div>
      <div className="px-6 flex flex-col gap-6 pb-4">
        <div>
          <div className="text-2xl font-semibold text-text-primary mb-2">{title}</div>
          <div className="text-sm text-text-secondary mb-3">
            {provider
              ? `Submit this form directly to ${provider.name}. lulaFi has already filled in the details we hold for you — review them before sending.`
              : "The Loan Application Form allows a customer to apply for financial assistance by submitting personal, employment, financial, and supporting document information in order for the system to assess eligibility and risk."}
          </div>
          <div className="flex flex-wrap gap-2">
            <LulaBadge variant="neutral">
              <FileText size={12} className="inline" /> {fieldCount} fields
            </LulaBadge>
            {provider && (
              <LulaBadge variant="success">
                <Sparkles size={12} className="inline" /> {plan.autofilled.length} autofilled
              </LulaBadge>
            )}
          </div>
        </div>

        {provider && (
          <div className="flex flex-col gap-2">
            {arrivedViaDeepLink && (
              <div className="flex items-start gap-3 p-3.5 bg-bg-secondary border border-border-primary rounded-xl">
                <LinkIcon size={16} className="text-brand shrink-0 mt-0.5" />
                <div className="text-xs text-text-secondary">
                  Opened from a shared lulaFi link — you're on the right {provider.name} form.
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 p-3.5 bg-brand/10 border border-brand/30 rounded-xl">
              <ShieldCheck size={16} className="text-brand shrink-0 mt-0.5" />
              <div className="text-xs text-text-secondary">
                Autofilled from your Data Vault after your PIN authorisation. Edit any field, then
                complete the remaining {plan.manual.length} below before sending.
              </div>
            </div>
            <button
              onClick={shareLink}
              className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-border-primary text-xs font-medium text-text-secondary hover:text-brand hover:border-brand transition-colors"
            >
              <Share2 size={14} /> Copy shareable link to this form
            </button>
          </div>
        )}


        <div className="flex flex-col gap-3">
          <div className="text-base font-semibold text-text-primary pb-2">
            Section A — Autofilled from your vault
          </div>
          {prefilledLabels.map(label => (
            <div key={label} className="bg-bg-secondary border border-border-primary rounded-lg p-4">
              <LulaInput
                label={`${label} *`}
                value={values[label] ?? ""}
                onChange={e => setValues(v => ({ ...v, [label]: e.target.value }))}
                helper={provider && values[label] ? "Prefilled from your profile" : undefined}
              />
            </div>
          ))}
        </div>

        {provider && (
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold text-text-primary pb-2 flex items-center gap-2">
              <Pencil size={14} className="text-text-muted" />
              Section B — Complete these yourself
            </div>
            {plan.manual.map(label => (
              <div key={label} className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                <LulaInput
                  label={label}
                  value={values[label] ?? ""}
                  placeholder="Not in your vault — add it here"
                  onChange={e => setValues(v => ({ ...v, [label]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        )}

        <LulaButton
          onClick={() => {
            sonner.success(`Submitted to ${provider?.name ?? "the organisation"}`, {
              description: form?.name ?? title,
            });
            navigate("activity");
          }}
          className="w-full rounded-full gradient-brand text-white shadow-md"
        >
          {provider ? `Send to ${provider.name}` : "Send to organization"}
        </LulaButton>

      </div>
    </ScreenLayout>
  );
};

export default FormFillScreen;
