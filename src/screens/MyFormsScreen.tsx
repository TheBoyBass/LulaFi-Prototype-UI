import { useMemo, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useApp } from "@/context/AppContext";
import {
  filledForms,
  formStatuses,
  statusVariant,
  formatFormDate,
  FilledFormStatus,
} from "@/data/myForms";
import { Search, FileText, CalendarDays, Paperclip, SearchX, Hash, Download, Printer, ChevronRight } from "lucide-react";
import { downloadFormPdf, printForm } from "@/lib/formExport";
import { toast } from "sonner";

type Filter = "All" | FilledFormStatus;

const MyFormsScreen = () => {
  const { openFormDetail } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const q = query.trim().toLowerCase();

  const rows = useMemo(
    () =>
      filledForms
        .filter(f => filter === "All" || f.status === filter)
        .filter(
          f =>
            !q ||
            `${f.formName} ${f.provider} ${f.ref} ${f.status}`.toLowerCase().includes(q)
        )
        .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
    [q, filter]
  );

  return (
    <ScreenLayout activeTab="forms" header={<AppHeader title="My Forms" />}>
      <div className="flex flex-col gap-4 pb-6 pt-2">
        <div className="px-6">
          <h1 className="text-2xl font-semibold text-text-primary leading-tight">My forms</h1>
          <p className="text-sm text-text-secondary mt-1.5">
            Forms you've filled in, with their submission status.
          </p>
        </div>

        <div className="px-6">
          <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-3 px-4">
            <Search size={15} className="text-text-muted shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search your forms, providers or refs"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar pb-0.5">
          {(["All", ...formStatuses] as Filter[]).map(label => {
            const active = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? "bg-brand text-bg-primary border-brand"
                    : "bg-bg-secondary text-text-secondary border-border-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="px-6 flex flex-col gap-3">
          {rows.map(f => (
            <div
              key={f.id}
              className="p-4 bg-bg-secondary border border-border-primary rounded-xl hover:border-brand transition-colors"
            >
              <button
                onClick={() => openFormDetail(f.id)}
                className="flex items-start gap-4 w-full text-left"
              >
              <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <FileText size={19} className="text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-text-primary leading-snug">
                    {f.formName}
                  </div>
                  <LulaBadge variant={statusVariant[f.status]} className="shrink-0">
                    {f.status}
                  </LulaBadge>
                </div>
                <div className="text-xs text-text-secondary mt-1 truncate">{f.provider}</div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={11} />
                    {f.status === "Draft" ? "Saved" : "Submitted"} {formatFormDate(f.submittedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash size={11} />
                    {f.ref.replace("#", "")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Paperclip size={11} />
                    {f.attachments} attachments
                  </span>
                  <span>{f.fields} fields</span>
                </div>
                <div className="text-[11px] text-text-secondary mt-2">{f.note}</div>
                </div>
                <ChevronRight size={16} className="text-text-muted shrink-0 mt-1" />
              </button>

              <div className="flex gap-2 mt-3 pt-3 border-t border-border-primary">
                <button
                  onClick={() => {
                    downloadFormPdf(f);
                    toast.success("PDF downloaded", { description: `${f.ref} ${f.formName}` });
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-bg-tertiary border border-border-primary text-[11px] font-medium text-text-primary"
                >
                  <Download size={13} /> PDF
                </button>
                <button
                  onClick={() => printForm(f)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-bg-tertiary border border-border-primary text-[11px] font-medium text-text-primary"
                >
                  <Printer size={13} /> Print
                </button>
              </div>
            </div>
          ))}

          {rows.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3 py-10">
              <div className="w-14 h-14 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center">
                <SearchX size={22} className="text-text-muted" />
              </div>
              <div className="text-sm font-medium text-text-primary">No forms found</div>
              <div className="text-xs text-text-secondary max-w-[220px]">
                Try another search term or status filter.
              </div>
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default MyFormsScreen;
