import { useMemo, useState, useRef, useEffect } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import TshwaneSponsored from "@/components/lulafi/TshwaneSponsored";
import { useApp } from "@/context/AppContext";
import { providerGroups, statusStyles, Conversation, semContacts } from "@/data/lulasem";
import { serviceProviders } from "@/data/providers";
import { Search, Plus, MessageCircle, FileText, SearchX, X, Loader2, Lock, ShieldCheck } from "lucide-react";

const PAGE_SIZE = 2;

type FilterKey = "All" | "Providers" | "Forms";

const matches = (row: Conversation, groupName: string, groupType: string, q: string) => {
  if (!q) return true;
  const haystack = [row.title, row.preview, row.ref ?? "", row.status ?? "", groupName, groupType]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
};

const ServicesScreen = () => {
  const { navigate, unreadCounts, markConversationRead } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [newQuery, setNewQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  const nq = newQuery.trim().toLowerCase();
  const matchedContacts = semContacts.filter(
    c => !nq || `${c.name} ${c.role}`.toLowerCase().includes(nq)
  );
  const matchedProviders = serviceProviders.filter(
    p => p.verified && (!nq || `${p.name} ${p.category} ${p.city}`.toLowerCase().includes(nq))
  );

  const startConversation = () => {
    setNewOpen(false);
    setNewQuery("");
    navigate("convo");
  };

  return (
    <ScreenLayout activeTab="services" header={<AppHeader title="lulaSEM" />}>
      <div className="flex flex-col gap-4 pb-6 pt-2">



        {/* Sponsored banner */}
        <div className="px-6">
          <TshwaneSponsored onOpen={() => navigate("mf")} />
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
            className="relative w-full max-h-[78%] rounded-t-2xl bg-bg-secondary border-t border-border-primary p-6 pb-8 flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0">
              <div>
                <div className="text-sm font-semibold text-text-primary">New encrypted conversation</div>
                <div className="text-[11px] text-text-muted">End-to-end encrypted on lulaSEM</div>
              </div>
              <button onClick={() => setNewOpen(false)} className="text-text-muted" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-bg-tertiary border border-border-primary rounded-full py-2.5 px-4 shrink-0">
              <Search size={14} className="text-text-muted shrink-0" />
              <input
                value={newQuery}
                onChange={e => setNewQuery(e.target.value)}
                placeholder="Search contacts or providers"
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs text-text-primary placeholder:text-text-muted"
              />
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
                  Your contacts
                </div>
                {matchedContacts.length === 0 && (
                  <div className="text-[11px] text-text-muted">No contacts match your search.</div>
                )}
                {matchedContacts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => startConversation()}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border-primary bg-bg-tertiary text-left"
                  >
                    <div className="relative w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-brand">{c.initials}</span>
                      {c.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border border-bg-tertiary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-text-primary truncate">{c.name}</div>
                      <div className="text-[11px] text-text-secondary truncate">{c.role}</div>
                    </div>
                    <Lock size={13} className="text-text-muted shrink-0" />
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
                  Verified service providers
                </div>
                {matchedProviders.length === 0 && (
                  <div className="text-[11px] text-text-muted">No providers match your search.</div>
                )}
                {matchedProviders.map(p => (
                  <button
                    key={p.id}
                    onClick={() => startConversation()}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border-primary bg-bg-tertiary text-left"
                  >
                    <div className="w-9 h-9 rounded-md bg-bg-secondary border border-border-primary flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-semibold text-text-secondary">{p.initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-text-primary truncate">{p.name}</span>
                        <ShieldCheck size={12} className="text-brand shrink-0" />
                      </div>
                      <div className="text-[11px] text-text-secondary truncate">{p.category} · {p.city}</div>
                    </div>
                    <Lock size={13} className="text-text-muted shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ScreenLayout>
  );
};

export default ServicesScreen;
