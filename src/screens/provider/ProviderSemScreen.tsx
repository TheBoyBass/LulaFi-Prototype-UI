import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Search,
  Share2,
  X,
  MessageCircle,
  FileText,
  Users,
  SearchX,
} from "lucide-react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { useApp } from "@/context/AppContext";
import { providerSemGroups, ProviderSemRow, semStatusStyles } from "@/data/provider";
import { shareProviderDeepLink } from "@/lib/providerLinks";
import { toast } from "sonner";

type FilterKey = "All" | "General" | "Forms" | "Groups";
const filters: FilterKey[] = ["All", "General", "Forms", "Groups"];

const kindMatchesFilter = (row: ProviderSemRow, filter: FilterKey) =>
  filter === "All" ||
  (filter === "General" && row.kind === "PROVIDER") ||
  (filter === "Forms" && row.kind === "FORM") ||
  (filter === "Groups" && row.kind === "GROUP");

const rowMatchesQuery = (row: ProviderSemRow, groupName: string, groupType: string, q: string) => {
  if (!q) return true;
  return [row.name, row.subtitle, row.preview, row.ref ?? "", row.status ?? "", groupName, groupType]
    .join(" ")
    .toLowerCase()
    .includes(q);
};

const ProviderSemScreen = () => {
  const { navigateProvider, openSemThread, providerFocusToken, providerHighlightId, clearProviderHighlight } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");
  const [highlightNewest, setHighlightNewest] = useState(false);
  const [readRows, setReadRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Deep-linked from a notification: clear filters so the newest thread is visible
  useEffect(() => {
    if (!providerFocusToken) return;
    setQuery("");
    setFilter("All");
    setHighlightNewest(true);
    const timer = window.setTimeout(() => setHighlightNewest(false), 2400);
    return () => window.clearTimeout(timer);
  }, [providerFocusToken]);

  // Shared deep link to a specific thread: scroll it into view and highlight it
  useEffect(() => {
    if (!providerHighlightId) return;
    const frame = window.requestAnimationFrame(() => {
      rowRefs.current[providerHighlightId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    const timer = window.setTimeout(clearProviderHighlight, 3000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [providerHighlightId, clearProviderHighlight]);

  const share = async (e: React.MouseEvent | React.KeyboardEvent, id: string, name: string) => {
    e.stopPropagation();
    const url = await shareProviderDeepLink("sem", id, name);
    toast("Link ready to share", { description: url });
  };

  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      providerSemGroups
        .map(g => ({
          ...g,
          rows: g.rows.filter(r => kindMatchesFilter(r, filter) && rowMatchesQuery(r, g.name, g.type, q)),
        }))
        .filter(g => g.rows.length > 0),
    [filter, q]
  );

  const counts = useMemo(() => {
    const all = providerSemGroups.flatMap(g => g.rows.filter(r => rowMatchesQuery(r, g.name, g.type, q)));
    return {
      All: all.length,
      General: all.filter(r => r.kind === "PROVIDER").length,
      Forms: all.filter(r => r.kind === "FORM").length,
      Groups: all.filter(r => r.kind === "GROUP").length,
    } as Record<FilterKey, number>;
  }, [q]);

  const unreadFor = (row: ProviderSemRow) => (readRows[row.id] ? 0 : row.unread);

  const openRow = (row: ProviderSemRow) => {
    setReadRows(prev => ({ ...prev, [row.id]: true }));
    openSemThread(row.id);
  };

  const newestId = providerSemGroups[0]?.rows[0]?.id;

  return (
    <ProviderLayout title="lulaSEM" activeTab="sem" focusToken={providerFocusToken}>
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-semibold text-text-primary">LulaSEM</h1>

        <LulaButton
          onClick={() => navigateProvider("pgroup")}
          className="mt-4 w-full flex items-center justify-center gap-2"
        >
          <Plus size={16} /> New LulaSEM
        </LulaButton>

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border-primary bg-bg-secondary px-4 py-3">
          <Search size={16} className="shrink-0 text-text-muted" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search clients, forms, references"
            className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search" className="shrink-0 text-text-muted">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {filters.map(f => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium border cursor-pointer transition-colors ${
                  active
                    ? "bg-brand text-bg-primary border-brand"
                    : "bg-bg-secondary text-text-secondary border-border-primary"
                }`}
              >
                {f}
                <span className={active ? "text-bg-primary/70" : "text-text-muted"}>{counts[f]}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {groups.map(group => {
            const groupUnread = group.rows.reduce((sum, r) => sum + unreadFor(r), 0);
            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-xl border border-border-primary bg-bg-secondary"
              >
                <div className="flex items-center gap-3 border-b border-border-primary p-4">
                  <div className="relative w-10 h-10 shrink-0 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-text-secondary">{group.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-text-primary">{group.name}</div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                      {group.type} · {group.rows.length} conversations
                    </div>
                  </div>
                  {groupUnread > 0 && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand text-bg-primary text-[10px] font-semibold flex items-center justify-center">
                      {groupUnread}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  {group.rows.map(row => {
                    const unread = unreadFor(row);
                    const highlighted =
                      providerHighlightId === row.id || (highlightNewest && row.id === newestId);
                    const Icon =
                      row.kind === "FORM" ? FileText : row.kind === "GROUP" ? Users : MessageCircle;
                    return (
                      <button
                        key={row.id}
                        ref={el => {
                          rowRefs.current[row.id] = el;
                        }}
                        onClick={() => openRow(row)}
                        className={`flex items-start gap-3 border-b border-border-primary px-4 py-3 text-left last:border-b-0 cursor-pointer transition-colors hover:bg-brand/[0.04] ${
                          highlighted ? "bg-brand/10 ring-2 ring-inset ring-brand/40" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${
                            row.kind === "FORM" ? "bg-info/10" : "bg-brand/10"
                          }`}
                        >
                          <Icon
                            size={15}
                            className={row.kind === "FORM" ? "text-info" : "text-brand"}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
                              {row.name}
                            </span>
                            <span className="shrink-0 text-[10px] text-text-muted">{row.time}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-text-secondary">
                            <span className="min-w-0 truncate">{row.subtitle}</span>
                            {row.ref && <span className="shrink-0 text-text-muted">· {row.ref}</span>}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="min-w-0 flex-1 truncate text-xs text-text-muted">
                              {row.preview}
                            </span>
                            {row.status && (
                              <span
                                className={`shrink-0 text-[9px] font-semibold tracking-wide ${
                                  semStatusStyles[row.status] ?? "text-text-muted"
                                }`}
                              >
                                {row.status}
                              </span>
                            )}
                            {unread > 0 && (
                              <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-bg-primary">
                                {unread}
                              </span>
                            )}
                            <span
                              role="button"
                              tabIndex={0}
                              aria-label={`Share link to ${row.name}`}
                              onClick={e => share(e, row.id, row.name)}
                              onKeyDown={e => e.key === "Enter" && share(e, row.id, row.name)}
                              className="shrink-0 rounded-md border border-border-primary p-1 text-text-muted cursor-pointer transition-colors hover:border-brand hover:text-brand"
                            >
                              <Share2 size={12} />
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {groups.length === 0 && (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-primary p-8 text-center">
              <SearchX size={22} className="text-text-muted" />
              <div className="text-sm font-medium text-text-primary">No conversations found</div>
              <div className="text-xs text-text-muted">
                Try a different search term or switch filters.
              </div>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderSemScreen;
