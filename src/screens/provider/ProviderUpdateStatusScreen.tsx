import { useState } from "react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { useApp } from "@/context/AppContext";
import { getSubmission, providerStaff } from "@/data/provider";
import { ChevronLeft, Check, MoreVertical } from "lucide-react";
import { toast } from "sonner";

const statuses = ["New", "In Progress", "Overdue", "Closed"];

const ProviderUpdateStatusScreen = () => {
  const { activeSubmissionId, navigateProvider } = useApp();
  const submission = getSubmission(activeSubmissionId);
  const [status, setStatus] = useState("In Progress");
  const [assignees, setAssignees] = useState<string[]>(["Support Team"]);
  const [note, setNote] = useState("Access request being reviewed");
  const [notify, setNotify] = useState(true);

  const options = ["Support Team", ...providerStaff.map(s => s.name.split(" ")[0])];

  const toggle = (name: string) =>
    setAssignees(prev => (prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]));

  const save = () => {
    toast.success(`${submission.ref} updated to ${status}`);
    navigateProvider("psubmission");
  };

  return (
    <ProviderLayout title="Update Status" activeTab="inbox">
      <div className="px-6 pb-8">
        <button
          onClick={() => navigateProvider("psubmission")}
          aria-label="Back to submission"
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
          <div className="mt-2 text-xs text-text-secondary">
            {submission.submittedBy} · {submission.ref}
          </div>
          <div className="text-xs text-text-muted">
            Received {submission.receivedDate} · {submission.receivedTime}
          </div>
        </div>

        <label className="mt-5 block text-sm font-medium text-text-primary">Update Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border-primary bg-bg-secondary px-3 py-3 text-sm text-text-primary outline-none focus:border-brand"
        >
          {statuses.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="mt-4 text-sm font-medium text-text-primary">Assign to</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map(name => {
            const on = assignees.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggle(name)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  on
                    ? "bg-brand text-bg-primary border-brand"
                    : "bg-bg-secondary text-text-secondary border-border-primary"
                }`}
              >
                {name}
                {on && <Check size={13} />}
              </button>
            );
          })}
        </div>

        <label className="mt-4 block text-sm font-medium text-text-primary">Internal note</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-border-primary bg-bg-secondary px-3 py-2.5 text-sm text-text-primary outline-none focus:border-brand"
        />

        <button
          onClick={() => setNotify(v => !v)}
          className="mt-4 flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
        >
          <span
            className={`w-5 h-5 rounded-md border flex items-center justify-center ${
              notify ? "bg-brand border-brand text-bg-primary" : "border-border-primary"
            }`}
          >
            {notify && <Check size={14} />}
          </span>
          <span className="text-sm text-text-primary">Notify the user</span>
        </button>

        <LulaButton onClick={save} className="mt-5 w-full">
          Save Update
        </LulaButton>
        <LulaButton
          variant="secondary"
          onClick={() => navigateProvider("psubmission")}
          className="mt-3 w-full"
        >
          Cancel
        </LulaButton>
      </div>
    </ProviderLayout>
  );
};

export default ProviderUpdateStatusScreen;
