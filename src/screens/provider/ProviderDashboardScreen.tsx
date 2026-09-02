import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { useApp } from "@/context/AppContext";
import { providerStats, providerActivity } from "@/data/provider";
import { Inbox, UserPlus, UserRoundPlus, Users, FileText, UserRound, MessageSquareLock, Activity as ActivityIcon } from "lucide-react";

const quickActions = [
  { label: "Review Inbox", icon: Inbox, screen: "pinbox" as const },
  { label: "Assign Work", icon: UserPlus, screen: "pinbox" as const },
  { label: "Invite Team", icon: UserRoundPlus, screen: "psettings" as const },
  { label: "New Group", icon: Users, screen: "pgroup" as const },
];

const activityIcon = {
  form: FileText,
  login: UserRound,
  status: ActivityIcon,
  message: MessageSquareLock,
  group: Users,
};

const ProviderDashboardScreen = () => {
  const { navigateProvider } = useApp();

  return (
    <ProviderLayout title="Dashboard" activeTab="home">
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Provider Dashboard</h1>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {providerStats.map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-border-primary bg-bg-secondary p-4"
            >
              <div className="text-xs text-text-secondary">{stat.label}</div>
              <div className="mt-1 text-2xl font-semibold text-text-primary">{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-7 text-lg font-semibold text-text-primary">Quick Actions</h2>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {quickActions.map(({ label, icon: Icon, screen }) => (
            <button
              key={label}
              onClick={() => navigateProvider(screen)}
              className="rounded-xl border border-border-primary bg-bg-secondary p-2.5 flex flex-col items-center gap-2 cursor-pointer hover:border-brand transition-colors"
            >
              <Icon size={20} className="text-brand" />
              <span className="text-[10px] font-medium leading-tight text-text-primary text-center">
                {label}
              </span>
            </button>
          ))}
        </div>

        <h2 className="mt-7 text-lg font-semibold text-text-primary">Recent Activity</h2>
        <div className="mt-3 flex flex-col gap-2.5">
          {providerActivity.slice(0, 4).map(item => {
            const Icon = activityIcon[item.type];
            return (
              <button
                key={item.id}
                onClick={() => navigateProvider("pactivity")}
                className="flex items-center gap-3 rounded-xl border border-border-primary bg-bg-secondary p-3 text-left cursor-pointer hover:border-brand transition-colors"
              >
                <div className="w-9 h-9 shrink-0 rounded-full bg-brand/10 flex items-center justify-center">
                  <Icon size={17} className="text-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-text-primary truncate">{item.title}</div>
                  <div className="text-[11px] text-text-muted truncate">{item.detail}</div>
                </div>
                <span className="shrink-0 text-[11px] text-text-muted">{item.time}</span>
              </button>
            );
          })}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboardScreen;
