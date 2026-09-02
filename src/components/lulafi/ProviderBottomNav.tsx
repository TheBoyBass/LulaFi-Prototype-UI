import { Home, Activity, MessageSquareLock, Inbox } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ProviderScreenId } from "@/types/screens";

export type ProviderTab = "home" | "activity" | "sem" | "inbox";

const tabs: { key: ProviderTab; label: string; icon: typeof Home; screen: ProviderScreenId }[] = [
  { key: "home", label: "Home", icon: Home, screen: "pdash" },
  { key: "activity", label: "Activity", icon: Activity, screen: "pactivity" },
  { key: "sem", label: "LulaSEM", icon: MessageSquareLock, screen: "psem" },
  { key: "inbox", label: "Forms Inbox", icon: Inbox, screen: "pinbox" },
];

interface ProviderBottomNavProps {
  active: ProviderTab;
  onScrollToTop?: () => void;
}

const ProviderBottomNav = ({ active, onScrollToTop }: ProviderBottomNavProps) => {
  const { navigateProvider, providerAlerts } = useApp();
  const badgeFor = (key: ProviderTab) =>
    key === "inbox" ? providerAlerts.inbox : key === "sem" ? providerAlerts.sem : 0;

  return (
    <div className="h-[72px] bg-bg-secondary border-t border-border-primary flex shrink-0 z-[200] relative">
      {tabs.map(({ key, label, icon: Icon, screen }) => (
        <button
          key={key}
          onClick={() => (active === key ? onScrollToTop?.() : navigateProvider(screen))}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-normal transition-colors duration-150 border-none bg-transparent cursor-pointer ${
            active === key ? "text-brand" : "text-text-muted"
          }`}
        >
          <span className="relative">
            <Icon size={20} />
            {badgeFor(key) > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-semibold flex items-center justify-center">
                {badgeFor(key) > 9 ? "9+" : badgeFor(key)}
              </span>
            )}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ProviderBottomNav;
