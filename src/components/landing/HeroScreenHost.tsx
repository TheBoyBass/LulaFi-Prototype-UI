import { ReactNode, useEffect, useRef, useState } from "react";
import { AppContext, type AppContextType } from "@/context/AppContext";

/** Logical size of a real app screen — scaled down to fit the hero device. */
const SCREEN_W = 390;
const SCREEN_H = 844;

const noop = () => {};

/**
 * Inert app state for the landing hero. Real screens read this instead of the
 * live prototype context, so they render exactly as in the app but never
 * navigate, persist or fire notifications.
 */
const heroState = (overrides: Partial<AppContextType>): AppContextType => ({
  currentScreen: "form",
  navigate: noop,
  mode: "client",
  setMode: noop,
  providerScreen: "pinbox",
  navigateProvider: noop,
  providerFocusToken: 0,
  activeSubmissionId: null,
  openSubmission: noop,
  activeSemThreadId: null,
  openSemThread: noop,
  activeClientConvoId: null,
  openClientConvo: noop,
  providerAlerts: { inbox: 0, sem: 0 },
  markProviderAlertsSeen: noop,
  displayName: "Lindo",
  setDisplayName: noop,
  phone: "+27 82 445 9012",
  setPhone: noop,
  email: "theboybass@lulafi.co.za",
  setEmail: noop,
  isDark: false,
  toggleTheme: noop,
  unreadCounts: {},
  markConversationRead: noop,
  activeProviderId: "tshwane",
  activeProviderFormId: "cot-renewal",
  openProviderForm: noop,
  openProviderDetail: noop,
  activeFormId: null,
  openFormDetail: noop,
  arrivedViaDeepLink: false,
  providerHighlightId: null,
  clearProviderHighlight: noop,
  ...overrides,
});

interface Props {
  children: ReactNode;
  /** Scroll offset applied to the rendered screen, in logical app pixels */
  offsetY?: number;
  state?: Partial<AppContextType>;
}

/** Renders a real app screen inside a hero phone, scaled and non-interactive. */
const HeroScreenHost = ({ children, offsetY = 0, state }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => {
      // Use layout size, not getBoundingClientRect: the hero phones are
      // 3D-rotated, which inflates the projected box and would over-scale.
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      if (!width || !height) return;
      setScale(Math.min(width / SCREEN_W, height / SCREEN_H));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="pointer-events-none h-full w-full overflow-hidden bg-bg-primary">
      <div
        className="relative origin-top-left"
        style={{
          width: SCREEN_W,
          height: SCREEN_H,
          transform: `scale(${scale}) translateY(${-offsetY}px)`,
        }}
      >
        <AppContext.Provider value={heroState(state ?? {})}>{children}</AppContext.Provider>
      </div>
    </div>
  );
};

export default HeroScreenHost;
