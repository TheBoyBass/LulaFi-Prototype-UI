import { useState } from "react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { providerActivity } from "@/data/provider";
import { FileText, UserRound, Users, MessageSquareLock, Activity as ActivityIcon } from "lucide-react";

const filters = ["All", "Forms", "Status", "Sign-ins", "Messages", "Groups"] as const;

const typeByFilter: Record<string, string> = {
  Forms: "form",
  Status: "status",
  "Sign-ins": "login",
  Messages: "message",
  Groups: "group",
};

const icons = {
  form: FileText,
  login: UserRound,
  status: ActivityIcon,
  message: MessageSquareLock,
  group: Users,
};

const ProviderActivityScreen = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const rows = providerActivity.filter(
    a => filter === "All" || a.type === typeByFilter[filter]
  );

  return (
    <ProviderLayout title="Provider Activity" activeTab="activity">
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Provider Activity</h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Submissions, status changes, staff sign-ins and group events.
        </p>

        <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium border cursor-pointer transition-colors ${
                filter === f
                  ? "bg-brand text-bg-primary border-brand"
                  : "bg-bg-secondary text-text-secondary border-border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {rows.map(item => {
            const Icon = icons[item.type];
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary p-3"
              >
                <div className="w-9 h-9 shrink-0 rounded-full bg-brand/10 flex items-center justify-center">
                  <Icon size={17} className="text-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-text-primary truncate">{item.title}</div>
                  <div className="text-[11px] text-text-muted truncate">{item.detail}</div>
                </div>
                <span className="shrink-0 text-[11px] text-text-muted">{item.time}</span>
              </div>
            );
          })}
          {rows.length === 0 && (
            <div className="rounded-xl border border-dashed border-border-primary p-8 text-center text-sm text-text-muted">
              Nothing recorded for this filter yet.
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderActivityScreen;
