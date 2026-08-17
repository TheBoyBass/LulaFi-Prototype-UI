import { useMemo, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { useApp } from "@/context/AppContext";
import {
  activityItems,
  activityFilters,
  filterToKind,
  dayLabel,
  ActivityFilter,
  ActivityKind,
} from "@/data/activity";
import { FileText, CalendarDays, LogIn, Smartphone, Inbox, ChevronRight } from "lucide-react";

const kindMeta: Record<ActivityKind, { icon: typeof FileText; tint: string; bg: string; label: string }> = {
  form: { icon: FileText, tint: "text-brand", bg: "bg-brand/10", label: "Form fill" },
  appointment: { icon: CalendarDays, tint: "text-info", bg: "bg-info/10", label: "Appointment" },
  login: { icon: LogIn, tint: "text-success", bg: "bg-success/10", label: "Sign-in" },
  device: { icon: Smartphone, tint: "text-text-secondary", bg: "bg-bg-tertiary", label: "Device" },
};

const ActivityScreen = () => {
  const { navigate, displayName } = useApp();
  const [filter, setFilter] = useState<ActivityFilter>("All");

  const items = useMemo(
    () =>
      filter === "All"
        ? activityItems
        : activityItems.filter(i => i.kind === filterToKind[filter]),
    [filter]
  );

  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    items.forEach(i => {
      map.set(i.date, [...(map.get(i.date) ?? []), i]);
    });
    return [...map.entries()];
  }, [items]);

  const openItem = (kind: ActivityKind) => {
    if (kind === "form") navigate("mf");
    else if (kind === "appointment") navigate("cal");
    else navigate("settings");
  };

  return (
    <ScreenLayout activeTab="activity" header={<AppHeader />}>
      <div className="pb-8 pt-2">
        <div className="px-6">
          <h1 className="text-2xl font-semibold text-text-primary leading-tight">Recent activity</h1>
          <p className="text-sm text-text-secondary mt-1.5">
            Everything that happened on {displayName}'s account — device links, sign-ins,
            appointments and form fills.
          </p>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto hide-scrollbar px-6">
          {activityFilters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                filter === f
                  ? "bg-brand text-bg-primary border-brand"
                  : "bg-bg-secondary text-text-secondary border-border-primary hover:border-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="px-6 mt-3 text-[11px] text-text-muted">
          {items.length} event{items.length === 1 ? "" : "s"}
        </div>

        <div className="px-6 mt-3 flex flex-col gap-5">
          {groups.map(([date, group]) => (
            <div key={date}>
              <div className="text-[11px] font-medium uppercase tracking-wide text-text-muted mb-2">
                {dayLabel(date)}
              </div>
              <div className="flex flex-col gap-3">
                {group.map(item => {
                  const { icon: Icon, tint, bg, label } = kindMeta[item.kind];
                  return (
                    <button
                      key={item.id}
                      onClick={() => openItem(item.kind)}
                      className="flex items-start gap-3 p-4 bg-bg-secondary border border-border-primary rounded-xl text-left hover:border-brand transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                        <Icon size={17} className={tint} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wide text-text-muted">
                            {label}
                          </span>
                          <span className="text-[10px] text-text-muted">· {item.time}</span>
                        </div>
                        <div className="text-sm font-medium text-text-primary mt-1 leading-snug">
                          {item.title}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{item.detail}</div>
                        {item.meta && (
                          <div className="text-[11px] text-text-secondary mt-1.5">{item.meta}</div>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-text-muted shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="flex flex-col items-center text-center gap-2 py-14">
              <Inbox size={28} className="text-text-muted" />
              <div className="text-sm font-medium text-text-primary">Nothing here yet</div>
              <div className="text-xs text-text-muted max-w-[240px]">
                No {filter.toLowerCase()} recorded on this account.
              </div>
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ActivityScreen;
