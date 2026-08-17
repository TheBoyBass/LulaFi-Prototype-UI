import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useApp } from "@/context/AppContext";
import { filledForms, statusVariant, formatFormDate } from "@/data/myForms";
import { downloadFormPdf, printForm } from "@/lib/formExport";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Hash,
  Paperclip,
  Printer,
  Building2,
} from "lucide-react";

const FormDetailScreen = () => {
  const { navigate, activeFormId } = useApp();
  const form = filledForms.find(f => f.id === activeFormId) ?? filledForms[0];

  const handleDownload = () => {
    downloadFormPdf(form);
    toast.success("PDF downloaded", { description: `${form.ref} ${form.formName}` });
  };

  const handlePrint = () => {
    printForm(form);
  };

  return (
    <ScreenLayout activeTab="forms" header={<AppHeader title="Form details" />}>
      <div className="flex flex-col gap-4 pb-8 pt-2">
        <div className="px-6">
          <button
            onClick={() => navigate("mf")}
            className="flex items-center gap-1.5 text-xs text-text-secondary"
          >
            <ArrowLeft size={14} /> My forms
          </button>
        </div>

        <div className="px-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-text-primary leading-snug">
                {form.formName}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <LulaBadge variant={statusVariant[form.status]}>{form.status}</LulaBadge>
                <span className="text-xs text-text-secondary truncate">{form.provider}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 grid grid-cols-2 gap-2.5">
          {[
            {
              icon: <CalendarDays size={13} />,
              label: form.status === "Draft" ? "Saved" : "Submitted",
              value: formatFormDate(form.submittedAt),
            },
            { icon: <Hash size={13} />, label: "Reference", value: form.ref.replace("#", "") },
            { icon: <Building2 size={13} />, label: "Provider", value: form.provider },
            {
              icon: <Paperclip size={13} />,
              label: "Attachments",
              value: `${form.attachments} file${form.attachments === 1 ? "" : "s"}`,
            },
          ].map(item => (
            <div
              key={item.label}
              className="bg-bg-secondary border border-border-primary rounded-xl p-3"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-text-muted">
                {item.icon}
                {item.label}
              </div>
              <div className="text-xs font-medium text-text-primary mt-1.5 break-words">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 flex gap-2.5">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-brand text-bg-primary text-sm font-medium"
          >
            <Download size={16} /> Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-bg-secondary border border-border-primary text-text-primary text-sm font-medium"
          >
            <Printer size={16} /> Print
          </button>
        </div>

        <div className="px-6">
          <div className="text-[10px] uppercase tracking-wide text-text-muted mb-2">Status note</div>
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
            {form.note}
          </div>
        </div>

        <div className="px-6">
          <div className="text-[10px] uppercase tracking-wide text-text-muted mb-2">
            Submitted answers ({form.answers.length})
          </div>
          <div className="bg-bg-secondary border border-border-primary rounded-xl divide-y divide-border-primary">
            {form.answers.map(a => (
              <div key={a.label} className="flex items-start justify-between gap-4 px-4 py-3">
                <span className="text-[11px] text-text-muted shrink-0 max-w-[45%]">{a.label}</span>
                <span className="text-xs text-text-primary text-right break-words">{a.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6">
          <div className="text-[10px] uppercase tracking-wide text-text-muted mb-2">Attachments</div>
          {form.attachmentNames.length === 0 ? (
            <div className="bg-bg-secondary border border-border-primary rounded-xl p-4 text-xs text-text-secondary">
              No attachments uploaded yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {form.attachmentNames.map(name => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-xl px-4 py-3"
                >
                  <Paperclip size={14} className="text-text-muted shrink-0" />
                  <span className="text-xs text-text-primary truncate">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default FormDetailScreen;
