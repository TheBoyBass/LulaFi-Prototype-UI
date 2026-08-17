import { Home, MessageSquareLock, FileText, Compass, Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";

export type NavTab = "home" | "services" | "forms" | "discover" | "activity" | "chat";

interface BottomNavProps {
  active: NavTab;
  onScrollToTop?: () => void;
}

type Tab = { key: NavTab; label: string; icon: typeof Home; screen: ScreenId };

const tabs: Tab[] = [
  { key: "home", label: "Home", icon: Home, screen: "home" },
  { key: "services", label: "lulaSEM", icon: MessageSquareLock, screen: "svc" },
  { key: "forms", label: "My Forms", icon: FileText, screen: "mf" },
  { key: "discover", label: "Discover", icon: Compass, screen: "chat" },
  { key: "activity", label: "Activity", icon: Activity, screen: "activity" },
];

const BottomNav = ({ active, onScrollToTop }: BottomNavProps) => {
  const { navigate } = useApp();

  return (
    <div className="h-[72px] bg-bg-secondary border-t border-border-primary flex shrink-0 z-[200] relative">
      {tabs.map(({ key, label, icon: Icon, screen }) => (
        <button
          key={key}
          onClick={() => (active === key ? onScrollToTop?.() : navigate(screen))}

          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-normal transition-colors duration-150 border-none bg-transparent cursor-pointer ${
            active === key ? "text-brand" : "text-text-muted"
          }`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
