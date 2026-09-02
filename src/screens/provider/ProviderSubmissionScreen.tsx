import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useApp } from "@/context/AppContext";
import { getSubmission } from "@/data/provider";
import { UserPlus, RefreshCw, MessageCircle, MoreVertical, ChevronLeft } from "lucide-react";

const ProviderSubmissionScreen = () => {
  const { activeSubmissionId, navigateProvider } = useApp();
  const submission = getSubmission(activeSubmissionId);

  const actions = [
    { label: "Assign", icon: UserPlus, screen: "pupdate" as const },
    { label: "Update Status", icon: RefreshCw, screen: "pupdate" as const },
    { label: "Message User", icon: MessageCircle, screen: "pconvo" as const },
  ];

  return (
    <ProviderLayout title="Submission" activeTab="inbox">
      <div className="px-6 pb-8">
        <button
          onClick={() => navigateProvider("pinbox")}
          aria-label="Back to forms inbox"
          className="w-[34px] h-[34px] rounded-lg bg-bg-tertiary border border-border-primary flex items-center justify-center cursor-pointer text-text-primary"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">
          Submission {submission.ref}
        </h1>


        <div className="mt-4 rounded-xl border border-border-primary border-l-4 border-l-brand bg-bg-secondary p-4">
          <div className="flex items-start gap-2">
            <span className="flex-1 text-base font-semibold text-text-primary">
              {submission.formName}
            </span>
            <LulaBadge variant="success" className="uppercase text-[10px]">
              {submission.status}
            </LulaBadge>
            <MoreVertical size={18} className="text-text-muted" />
          </div>
          <div className="mt-3 flex flex-col gap-1.5 text-sm">
            <div className="text-text-secondary">
              Submitted by <span className="text-text-primary">{submission.submittedBy}</span>
            </div>
            <div className="text-text-secondary">
              Received{" "}
              <span className="text-text-primary">
                {submission.receivedDate} · {submission.receivedTime}
              </span>
            </div>
            <div className="text-text-secondary">
              Priority: <span className="text-text-primary">{submission.priority}</span>
            </div>
            <div className="text-text-secondary">
              Assigned:{" "}
              <span className="text-text-primary">{submission.assignedTo ?? "Unassigned"}</span>
            </div>
          </div>
        </div>

        <h2 className="mt-7 text-lg font-semibold text-text-primary">Submitted Data</h2>
        <div className="mt-3 rounded-xl border border-border-primary bg-bg-secondary px-4">
          {submission.answers.map((a, i) => (
            <div
              key={a.label}
              className={`flex items-start justify-between gap-4 py-3.5 ${
                i > 0 ? "border-t border-border-primary" : ""
              }`}
            >
              <span className="text-sm text-text-secondary">{a.label}</span>
              <span className="text-sm text-text-primary text-right">{a.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {actions.map(({ label, icon: Icon, screen }) => (
            <button
              key={label}
              onClick={() => navigateProvider(screen)}
              className="rounded-xl border border-border-primary bg-bg-secondary p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-brand transition-colors"
            >
              <Icon size={19} className="text-brand" />
              <span className="text-[11px] font-medium text-text-primary text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderSubmissionScreen;
