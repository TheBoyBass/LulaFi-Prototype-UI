import { Home, Search, FileText, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";

interface BottomNavProps {
  active: "home" | "services" | "forms" | "chat";
}

const tabs: { key: BottomNavProps["active"]; label: string; icon: typeof Home; screen: ScreenId }[] = [
  { key: "home", label: "Home", icon: Home, screen: "home" },
  { key: "services", label: "Services", icon: Search, screen: "svc" },
  { key: "forms", label: "Forms", icon: FileText, screen: "mf" },
  { key: "chat", label: "Chat", icon: MessageSquare, screen: "chat" },
];

const BottomNav = ({ active }: BottomNavProps) => {
  const { navigate } = useApp();

  return (
    <div className="h-[72px] bg-bg-secondary border-t border-border flex shrink-0 z-[200]">
      {tabs.map(({ key, label, icon: Icon, screen }) => (
        <button
          key={key}
          onClick={() => navigate(screen)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-normal transition-colors duration-150 border-none bg-transparent cursor-pointer ${
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
