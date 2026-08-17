import { useState } from "react";
import { Settings, ArrowUp } from "lucide-react";
import Logo from "./Logo";
import EmergencyButton from "./EmergencyButton";
import EmergencySheet from "./EmergencySheet";
import { useScreenScroll } from "./ScrollContext";
import { useApp } from "@/context/AppContext";


interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
  const { navigate } = useApp();
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const { scrollToTop, scrolled } = useScreenScroll();


  return (
    <>
      <EmergencySheet open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
      <div className="flex items-center justify-between px-6 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Logo size="sm" />
          {title && (
            <span className="text-sm font-medium text-text-muted truncate border-l border-border-primary pl-2 ml-1">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {scrolled && (
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary cursor-pointer"
            >
              <ArrowUp size={18} />
            </button>
          )}

          <button
            onClick={() => navigate("settings")}
            aria-label="Settings"
            className="w-9 h-9 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary cursor-pointer"
          >
            <Settings size={18} />
          </button>
          <EmergencyButton variant="header" onActivate={() => setEmergencyOpen(true)} />
        </div>
      </div>
    </>
  );
};

export default AppHeader;
