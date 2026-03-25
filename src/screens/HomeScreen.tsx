import ScreenLayout from "@/components/lulafi/ScreenLayout";
import Logo from "@/components/lulafi/Logo";
import { LulaCard } from "@/components/lulafi/LulaCard";
import { useApp } from "@/context/AppContext";
import { Search, QrCode, MoreHorizontal, Hand, FileText } from "lucide-react";

interface HomeScreenProps {
  withActivity?: boolean;
}

const HomeScreen = ({ withActivity = false }: HomeScreenProps) => {
  const { navigate, displayName } = useApp();

  return (
    <ScreenLayout activeTab="home">
      <div className="flex flex-col min-h-full">
        <div className="flex justify-between items-center px-6 pb-4">
          <Logo />
          <button onClick={() => navigate("settings")} className="w-8 h-8 rounded-md bg-bg-tertiary border border-border-primary flex items-center justify-center cursor-pointer text-text-muted">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="px-6 flex flex-col gap-12 pb-6">
          <div>
            <div className="text-2xl font-medium text-text-primary mb-2">
              Good afternoon,<br />{displayName} <Hand size={24} className="inline text-brand" />
            </div>
            <div className="text-sm text-text-secondary">What would you like to do today?</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("svc")}
              className="bg-bg-secondary border border-border-primary rounded-lg p-6 flex flex-col items-start gap-3 cursor-pointer text-left hover:border-brand transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-brand/10 flex items-center justify-center">
                <Search size={20} className="text-brand" />
              </div>
              <div className="text-sm font-medium text-text-primary leading-tight">Search for a Service</div>
            </button>
            <button
              onClick={() => navigate("qr")}
              className="bg-bg-secondary border border-border-primary rounded-lg p-6 flex flex-col items-start gap-3 cursor-pointer text-left hover:border-brand transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-brand/10 flex items-center justify-center">
                <QrCode size={20} className="text-brand" />
              </div>
              <div className="text-sm font-medium text-text-primary leading-tight">Scan QR Code</div>
            </button>
          </div>
          <div>
            <div className="text-lg font-medium text-text-primary mb-4">Recent Activity</div>
            {withActivity ? (
              <div className="flex flex-col gap-4">
                {[
                  { text: "Submitted a form to 27778765432", time: "Just now" },
                  { text: "Submitted a form to 27790749929", time: "Just now" },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => navigate("mf")}
                    className="flex items-center gap-4 p-4 bg-bg-secondary border border-border-primary rounded-lg cursor-pointer hover:border-brand transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${i === 0 ? "bg-brand/10" : "bg-info/10"}`}>
                      <FileText size={17} className={i === 0 ? "text-brand" : "text-info"} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{item.text}</div>
                      <div className="text-xs text-text-muted mt-0.5">{item.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-sm text-text-muted">No recent activity yet.</div>
            )}
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default HomeScreen;
