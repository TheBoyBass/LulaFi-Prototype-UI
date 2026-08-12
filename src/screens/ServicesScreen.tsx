import { useMemo, useState, useRef, useEffect } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import Logo from "@/components/lulafi/Logo";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";
import { providerGroups, statusStyles, Conversation } from "@/data/lulasem";
import { Search, Plus, MessageCircle, FileText, SearchX, QrCode, X, Loader2 } from "lucide-react";

const PAGE_SIZE = 2;

type FilterKey = "All" | "Providers" | "Forms";

const newActions: { label: string; description: string; icon: typeof FileText; screen: ScreenId }[] = [
  { label: "New form", description: "Browse provider forms and start one", icon: FileText, screen: "org" },
  { label: "New conversation", description: "Message a provider directly", icon: MessageCircle, screen: "chat" },
  { label: "Scan a QR code", description: "Open a form shared by a provider", icon: QrCode, screen: "qr" },
];

const matches = (row: Conversation, groupName: string, groupType: string, q: string) => {
  if (!q) return true;
  const haystack = [row.title, row.preview, row.ref ?? "", row.status ?? "", groupName, groupType]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
};

const ServicesScreen = () => {
  const { navigate, displayName, unreadCounts, markConversationRead } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const initials = displayName.slice(0, 2).toUpperCase();
  const q = query.trim().toLowerCase();

  const filteredGroups = useMemo(
    () =>
      providerGroups
        .map(g => ({
          ...g,
          rows: g.rows.filter(
            r =>
              (activeFilter === "All" ||
                (activeFilter === "Providers" ? r.kind === "provider" : r.kind === "form")) &&
              matches(r, g.name, g.type, q)
          ),
        }))
        .filter(g => g.rows.length > 0),
    [activeFilter, q]
  );

  const counts = useMemo(() => {
    const all = providerGroups.flatMap(g => g.rows.filter(r => matches(r, g.name, g.type, q)));
    return {
      All: all.length,
      Providers: all.filter(r => r.kind === "provider").length,
      Forms: all.filter(r => r.kind === "form").length,
    } as Record<FilterKey, number>;
  }, [q]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q, activeFilter]);

  const visibleGroups = filteredGroups.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGroups.length;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const root = el.closest(".hide-scrollbar") as HTMLElement | null;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(c => Math.min(c + PAGE_SIZE, filteredGroups.length));
        }
      },
      { root, rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, filteredGroups.length]);

  const openConversation = (row: Conversation) => {
    markConversationRead(row.id);
    navigate(row.screen);
  };

  return (
    <ScreenLayout activeTab="services">
      <div className="flex flex-col gap-4 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-semibold text-text-primary tracking-tight">lulaSEM</span>
          </div>
          <button
            onClick={() => navigate("settings")}
            className="w-9 h-9 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-semibold flex items-center justify-center shrink-0"
          >
            {initials}
          </button>
        </div>

        {/* Sponsored banner */}
        <div className="px-6">
          <button
            onClick={() => navigate("mf")}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-brand/10 border border-brand/25 text-left"
          >
            <div className="w-9 h-9 rounded-md bg-brand/15 flex items-center justify-center shrink-0">
              <FileText size={17} className="text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold tracking-widest text-brand">SPONSORED</span>
                <span className="text-[10px] text-text-muted">City of Tshwane</span>
              </div>
              <div className="text-sm font-medium text-text-primary truncate">Renew your municipal account</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-brand text-bg-primary text-xs font-medium shrink-0">Open</span>
          </button>
        </div>

        {/* Search + New */}
        <div className="px-6 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-2.5 px-4">
            <Search size={15} className="text-text-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search providers, forms, references"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs text-text-primary placeholder:text-text-muted"
            />
            {query && (
              <button onClick={() => setQuery("")} className="shrink-0 text-text-muted" aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </div>
          <button
            onClick={() => setNewOpen(true)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-brand text-bg-primary text-xs font-medium shrink-0"
          >
            <Plus size={13} />
            New
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar pb-0.5">
          {(["All", "Providers", "Forms"] as FilterKey[]).map(label => {
            const active = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  active ? "border-brand text-brand bg-brand/10" : "border-border-primary text-text-secondary bg-bg-secondary"
                }`}
              >
                {label}
                <span className={active ? "text-brand/70" : "text-text-muted"}>{counts[label]}</span>
              </button>
            );
          })}
        </div>

        {/* Groups */}
        <div className="px-6 flex flex-col gap-4">
          {visibleGroups.map(group => {
            const groupUnread = group.rows.reduce((sum, r) => sum + (unreadCounts[r.id] ?? 0), 0);
            return (
              <div key={group.id} className="rounded-lg bg-bg-secondary border border-border-primary overflow-hidden">
                <button
                  onClick={() => navigate("org")}
                  className="w-full flex items-center gap-3 p-4 text-left border-b border-border-primary"
                >
                  <div className="w-10 h-10 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-semibold text-text-secondary">{group.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">{group.name}</div>
                    <div className="text-[10px] font-medium tracking-wider text-text-muted uppercase">
                      {group.type} · {group.rows.length} conversations
                    </div>
                  </div>
                  {groupUnread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand text-bg-primary text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {groupUnread}
                    </span>
                  )}
                </button>

                <div className="flex flex-col">
                  {group.rows.map(row => {
                    const unread = unreadCounts[row.id] ?? 0;
                    return (
                      <button
                        key={row.id}
                        onClick={() => openConversation(row)}
                        className="flex items-start gap-3 px-4 py-3 text-left border-b border-border-primary last:border-b-0 hover:bg-brand/[0.04] transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                            row.kind === "provider" ? "bg-brand/10" : "bg-info/10"
                          }`}
                        >
                          {row.kind === "provider" ? (
                            <MessageCircle size={15} className="text-brand" />
                          ) : (
                            <FileText size={15} className="text-info" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-text-primary truncate">{row.title}</span>
                            <span className="ml-auto text-[10px] text-text-muted shrink-0">{row.time}</span>
                            {unread > 0 && (
                              <span className="w-4 h-4 rounded-full bg-brand text-bg-primary text-[9px] font-semibold flex items-center justify-center shrink-0">
                                {unread}
                              </span>
                            )}
                            {row.online && <span className="w-2 h-2 rounded-full bg-success shrink-0" />}
                          </div>
                          {row.kind === "form" && (
                            <div className="flex items-center gap-1.5 mt-0.5 text-[9px] font-semibold tracking-wider">
                              <span className="text-info">FORM CONVERSATION</span>
                              <span className="text-text-muted">
                                {row.ref} · <span className={statusStyles[row.status ?? ""]}>{row.status}</span>
                              </span>
                            </div>
                          )}
                          <div className="text-xs text-text-secondary truncate mt-1">{row.preview}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {filteredGroups.length === 0 && (
            <div className="flex flex-col items-center text-center gap-3 py-10">
              <div className="w-14 h-14 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center">
                <SearchX size={22} className="text-text-muted" />
              </div>
              <div className="text-sm font-medium text-text-primary">No conversations found</div>
              <div className="text-xs text-text-secondary max-w-[220px]">
                {query
                  ? `Nothing matches “${query}” in ${activeFilter === "All" ? "your conversations" : activeFilter.toLowerCase()}.`
                  : `You have no ${activeFilter === "All" ? "conversations" : activeFilter.toLowerCase()} yet.`}
              </div>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveFilter("All");
                }}
                className="px-4 py-2 rounded-full border border-border-primary text-xs font-medium text-text-primary"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={sentinelRef} className="flex items-center justify-center gap-2 py-4 text-[10px] font-semibold tracking-widest text-text-muted uppercase">
              <Loader2 size={13} className="animate-spin" />
              Loading more
            </div>
          )}
          {!hasMore && filteredGroups.length > PAGE_SIZE && (
            <div className="py-2 text-center text-[9px] font-semibold tracking-widest text-text-muted uppercase">
              End of conversations
            </div>
          )}
        </div>
      </div>

      {/* New sheet */}
      {newOpen && (
        <div className="absolute inset-0 z-[300] flex items-end" onClick={() => setNewOpen(false)}>
          <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-sm" />
          <div
            className="relative w-full rounded-t-2xl bg-bg-secondary border-t border-border-primary p-6 pb-8 flex flex-col gap-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Start something new</span>
              <button onClick={() => setNewOpen(false)} className="text-text-muted" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            {newActions.map(({ label, description, icon: Icon, screen }) => (
              <button
                key={label}
                onClick={() => {
                  setNewOpen(false);
                  navigate(screen);
                }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border-primary bg-bg-tertiary text-left"
              >
                <div className="w-9 h-9 rounded-md bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-brand" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-text-primary">{label}</div>
                  <div className="text-[11px] text-text-secondary truncate">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </ScreenLayout>
  );
};

export default ServicesScreen;
