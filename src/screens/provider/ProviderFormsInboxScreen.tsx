import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronRight, Share2, FileText, CalendarDays, Hash, SearchX } from "lucide-react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useScreenScroll } from "@/components/lulafi/ScrollContext";
import { useApp } from "@/context/AppContext";
import { providerSubmissions, SubmissionStatus } from "@/data/provider";
import { shareProviderDeepLink } from "@/lib/providerLinks";
import { toast } from "sonner";

const filters: ("All" | SubmissionStatus)[] = ["All", "New", "In Progress", "Overdue"];

const statusVariant: Record<SubmissionStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  New: "success",
  "In Progress": "info",
  Overdue: "warning",
  Closed: "neutral",
};

const ProviderFormsInboxScreen = () => {
  const { openSubmission, providerFocusToken, providerHighlightId, clearProviderHighlight } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [highlightNewest, setHighlightNewest] = useState(false);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Deep-linked from a notification: clear filters so the newest item is visible
  useEffect(() => {
    if (!providerFocusToken) return;
    setQuery("");
    setFilter("All");
    setHighlightNewest(true);
    const timer = window.setTimeout(() => setHighlightNewest(false), 2400);
    return () => window.clearTimeout(timer);
  }, [providerFocusToken]);

  // Shared deep link to a specific submission: scroll it into view and highlight it
  useEffect(() => {
    if (!providerHighlightId) return;
    const id = window.requestAnimationFrame(() => {
      rowRefs.current[providerHighlightId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    const timer = window.setTimeout(clearProviderHighlight, 3000);
    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(timer);
    };
  }, [providerHighlightId, clearProviderHighlight]);

  const share = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    const url = await shareProviderDeepLink("inbox", id, name);
    toast("Link ready to share", { description: url });
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providerSubmissions.filter(s => {
      const matchesFilter = filter === "All" || s.status === filter;
      const matchesQuery =
        !q ||
        s.formName.toLowerCase().includes(q) ||
        s.submittedBy.toLowerCase().includes(q) ||
        s.ref.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);


  return (
    <ProviderLayout title="Forms Inbox" activeTab="inbox" focusToken={providerFocusToken}>
      <div className="flex flex-col gap-4 pb-6 pt-2">
        <div className="px-6">
          <h1 className="text-2xl font-semibold text-text-primary leading-tight">Forms inbox</h1>
          <p className="text-sm text-text-secondary mt-1.5">
            Forms clients submitted to you, with their processing status.
          </p>
        </div>

        <div className="px-6">
          <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-3 px-4">
            <Search size={15} className="text-text-muted shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search submissions, clients or refs"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar pb-0.5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                filter === f
                  ? "bg-brand text-bg-primary border-brand"
                  : "bg-bg-secondary text-text-secondary border-border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="px-6 flex flex-col gap-3">
          {rows.map((s, index) => (
            <div
              key={s.id}
              className={`p-4 bg-bg-secondary border rounded-xl hover:border-brand transition-colors ${
                (highlightNewest && index === 0) ||
                providerHighlightId === s.id ||
                providerHighlightId === s.ref
                  ? "border-brand ring-2 ring-brand/40"
                  : "border-border-primary"
              }`}
            >
              <button
                ref={el => {
                  rowRefs.current[s.id] = el;
                  rowRefs.current[s.ref] = el;
                }}
                onClick={() => openSubmission(s.id)}
                className="flex items-start gap-4 w-full text-left cursor-pointer"
              >
                <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <FileText size={19} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium text-text-primary leading-snug">
                      {s.formName}
                    </div>
                    <LulaBadge variant={statusVariant[s.status]} className="shrink-0">
                      {s.status === "Overdue" && s.slaHours ? `SLA ${s.slaHours}h` : s.status}
                    </LulaBadge>
                  </div>
                  <div className="text-xs text-text-secondary mt-1 truncate">{s.submittedBy}</div>
                  <div className="mt-2 rounded-lg bg-bg-tertiary border border-border-primary px-3 py-2 flex flex-col gap-1">
                    {s.answers.slice(0, 2).map(a => (
                      <div key={a.label} className="flex items-baseline gap-2">
                        <span className="text-[10px] text-text-muted shrink-0">{a.label}</span>
                        <span className="text-[11px] text-text-primary truncate">{a.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={11} />
                      Received {s.receivedDate} · {s.receivedTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={11} />
                      {s.ref.replace("#", "")}
                    </span>
                    <span>{s.answers.length} fields</span>
                  </div>
                  <div className="text-[11px] text-text-secondary mt-2">
                    {s.assignedTo ? `Assigned to ${s.assignedTo}` : "Unassigned"} · {s.priority} priority
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted shrink-0 mt-1" />
              </button>

              <div className="flex gap-2 mt-3 pt-3 border-t border-border-primary">
                <button
                  onClick={() => openSubmission(s.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-bg-tertiary border border-border-primary text-[11px] font-medium text-text-primary cursor-pointer"
                >
                  <FileText size={13} /> Open
                </button>
                <button
                  aria-label={`Share link to ${s.ref}`}
                  onClick={e => share(e, s.id, `${s.formName} · ${s.ref}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-bg-tertiary border border-border-primary text-[11px] font-medium text-text-primary cursor-pointer"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>
          ))}

          {rows.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3 py-10">
              <div className="w-14 h-14 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center">
                <SearchX size={22} className="text-text-muted" />
              </div>
              <div className="text-sm font-medium text-text-primary">No submissions found</div>
              <div className="text-xs text-text-secondary max-w-[220px]">
                Try another search term or status filter.
              </div>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderFormsInboxScreen;
