import ScreenLayout from "@/components/lulafi/ScreenLayout";
import Logo from "@/components/lulafi/Logo";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { Building2, CheckCheck } from "lucide-react";

const MessagesScreen = () => {
  const { navigate } = useApp();

  return (
    <ScreenLayout activeTab="chat">
      <div className="px-6 flex flex-col gap-6">
        <div className="mb-2"><Logo /></div>
        <div className="text-2xl font-medium text-text-primary">Messages</div>
        <LulaButton variant="secondary" className="w-full rounded-md flex items-center justify-center gap-2">
          + New chat
        </LulaButton>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("convo")}
            className="flex items-center gap-4 p-4 bg-bg-secondary border border-border-primary rounded-lg cursor-pointer hover:border-brand transition-colors text-left"
          >
            <div className="relative w-11 h-11 rounded-full bg-destructive flex items-center justify-center text-foreground text-[15px] font-semibold shrink-0">
              TS
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-bg-secondary rounded-full flex items-center justify-center border border-border-primary">
                <Building2 size={9} className="text-text-muted" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-text-primary">TechNova Solutions (Pty) Ltd</div>
              <div className="text-xs text-text-muted mt-0.5 flex items-center gap-1">3:21 PM · <CheckCheck size={12} /></div>
            </div>
            <div className="text-text-muted text-base">›</div>
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default MessagesScreen;