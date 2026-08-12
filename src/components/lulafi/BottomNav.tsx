import { useState } from "react";
import { Home, Search, FileText, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";
import EmergencyButton from "./EmergencyButton";
import EmergencySheet from "./EmergencySheet";

interface BottomNavProps {
  active: "home" | "services" | "forms" | "chat";
}

type Tab = { key: BottomNavProps["active"]; label: string; icon: typeof Home; screen: ScreenId };

const leftTabs: Tab[] = [
  { key: "home", label: "Home", icon: Home, screen: "home" },
  { key: "services", label: "lulaSEM", icon: Search, screen: "svc" },
];

const rightTabs: Tab[] = [
  { key: "forms", label: "Forms", icon: FileText, screen: "mf" },
  { key: "chat", label: "Chat", icon: MessageSquare, screen: "chat" },
];

const BottomNav = ({ active }: BottomNavProps) => {
  const { navigate } = useApp();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const renderTab = ({ key, label, icon: Icon, screen }: Tab) => (
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
  );

  return (
    <>
      <EmergencySheet open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
      <div className="h-[72px] bg-bg-secondary border-t border-border flex shrink-0 z-[200] relative">
        {leftTabs.map(renderTab)}
        <EmergencyButton onActivate={() => setEmergencyOpen(true)} />
        {rightTabs.map(renderTab)}
      </div>
    </>
  );
};

export default BottomNav;
