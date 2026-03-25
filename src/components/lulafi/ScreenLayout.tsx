import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import WaveDecoration from "./WaveDecoration";

interface ScreenLayoutProps {
  children: React.ReactNode;
  activeTab?: "home" | "services" | "forms" | "chat";
  hideNav?: boolean;
}

const ScreenLayout = ({ children, activeTab, hideNav }: ScreenLayoutProps) => (
  <div className="absolute inset-0 flex flex-col bg-bg-primary overflow-hidden">
    <StatusBar />
    <div className="flex-1 overflow-y-auto hide-scrollbar relative">
      <div className="relative z-10 min-h-full">
        {children}
      </div>
    </div>
    {!hideNav && activeTab && (
      <div className="pointer-events-none absolute bottom-12 left-0 right-0 z-0">
        <WaveDecoration />
      </div>
    )}
    {!hideNav && activeTab && <BottomNav active={activeTab} />}
  </div>
);

export default ScreenLayout;
