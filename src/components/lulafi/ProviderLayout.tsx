import { useCallback, useEffect, useRef, useState } from "react";
import StatusBar from "./StatusBar";
import ProviderHeader from "./ProviderHeader";
import ProviderFeaturedBanner from "./ProviderFeaturedBanner";
import ProviderBottomNav, { ProviderTab } from "./ProviderBottomNav";
import { ScrollContext } from "./ScrollContext";

interface ProviderLayoutProps {
  children: React.ReactNode;
  activeTab: ProviderTab;
  hideBanner?: boolean;
  /** Optional label shown next to the logo in the pinned header */
  title?: string;
  /** When this value changes, the content scrolls to the newest (top) item */
  focusToken?: number;
  /** Pinned area rendered directly above the bottom navigation */
  footer?: React.ReactNode;
}

const ProviderLayout = ({ children, activeTab, hideBanner, title, focusToken, footer }: ProviderLayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (focusToken === undefined) return;
    const id = window.requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    );
    return () => window.cancelAnimationFrame(id);
  }, [focusToken]);

  const onScroll = () => setScrolled((scrollRef.current?.scrollTop ?? 0) > 120);

  return (
    <ScrollContext.Provider value={{ scrollToTop, scrolled }}>
      <div className="absolute inset-0 flex flex-col bg-bg-primary overflow-hidden">
        <StatusBar />
        <div className="shrink-0 relative z-20 bg-bg-primary">
          <ProviderHeader title={title} />

          {!hideBanner && (
            <div className="px-6 pb-3">
              <ProviderFeaturedBanner />
            </div>
          )}
        </div>
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex-1 overflow-y-auto hide-scrollbar relative"
        >
          <div className="relative z-10 min-h-full">{children}</div>
        </div>
        {footer && <div className="shrink-0 relative z-20 bg-bg-primary">{footer}</div>}
        <ProviderBottomNav active={activeTab} onScrollToTop={scrollToTop} />
      </div>
    </ScrollContext.Provider>
  );
};

export default ProviderLayout;
