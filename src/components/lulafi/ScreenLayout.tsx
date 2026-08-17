import { useCallback, useRef, useState } from "react";
import StatusBar from "./StatusBar";
import BottomNav, { NavTab } from "./BottomNav";
import WaveDecoration from "./WaveDecoration";
import { ScrollContext } from "./ScrollContext";

interface ScreenLayoutProps {
  children: React.ReactNode;
  activeTab?: NavTab;
  hideNav?: boolean;
  header?: React.ReactNode;
}

const ScreenLayout = ({ children, activeTab, hideNav, header }: ScreenLayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onScroll = () => {
    const top = scrollRef.current?.scrollTop ?? 0;
    setScrolled(top > 120);
  };

  return (
    <ScrollContext.Provider value={{ scrollToTop, scrolled }}>
      <div className="absolute inset-0 flex flex-col bg-bg-primary overflow-hidden">
        <StatusBar />
        {header && <div className="shrink-0 relative z-20 bg-bg-primary">{header}</div>}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex-1 overflow-y-auto hide-scrollbar relative"
        >
          <div className="relative z-10 min-h-full">
            {children}
          </div>
        </div>

        {!hideNav && activeTab && (
          <div className="pointer-events-none absolute bottom-12 left-0 right-0 z-0">
            <WaveDecoration />
          </div>
        )}
        {!hideNav && activeTab && <BottomNav active={activeTab} onScrollToTop={scrollToTop} />}
      </div>
    </ScrollContext.Provider>
  );
};

export default ScreenLayout;
