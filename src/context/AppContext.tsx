import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { AppMode, ProviderScreenId, ScreenId } from "@/types/screens";
import { providerGroups } from "@/data/lulasem";
import { toast } from "sonner";

const initialUnread = providerGroups.reduce<Record<string, number>>((acc, g) => {
  g.rows.forEach(r => { acc[r.id] = r.unread; });
  return acc;
}, {});

interface AppContextType {
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  /** Client vs provider side of the prototype */
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  providerScreen: ProviderScreenId;
  navigateProvider: (screen: ProviderScreenId, options?: { focusNewest?: boolean }) => void;
  /** Increments when a toast deep-links into a tab, so screens scroll to the newest item */
  providerFocusToken: number;
  activeSubmissionId: string | null;
  openSubmission: (id: string) => void;
  /** LulaSEM thread (general chat, form conversation or internal group) currently open */
  activeSemThreadId: string | null;
  openSemThread: (id: string) => void;
  /** Client-side LulaSEM conversation (general chat or form conversation) currently open */
  activeClientConvoId: string | null;
  openClientConvo: (id: string | null) => void;

  /** Unseen provider inbox / LulaSEM arrivals shown as bottom-nav badges */
  providerAlerts: { inbox: number; sem: number };
  markProviderAlertsSeen: (tab: "inbox" | "sem") => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  /** Client profile shown on Settings, Profile and prefilled forms */
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  unreadCounts: Record<string, number>;
  markConversationRead: (id: string) => void;
  /** Provider whose form was deep-linked into (prefilled form fill) */
  activeProviderId: string | null;
  /** Form template selected within a provider */
  activeProviderFormId: string | null;
  openProviderForm: (providerId: string, formId?: string) => void;
  /** Open the provider detail screen (details + available forms) */
  openProviderDetail: (providerId: string) => void;
  /** Filled form whose detail page is open */
  activeFormId: string | null;
  openFormDetail: (formId: string) => void;
  /** True when the current screen was reached through a shared deep link */
  arrivedViaDeepLink: boolean;
  /** Inbox submission / LulaSEM thread id opened through a shared provider link */
  providerHighlightId: string | null;
  clearProviderHighlight: () => void;
}



export type { AppContextType };

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

const readDeepLink = () => {
  if (typeof window === "undefined")
    return {
      provider: null as string | null,
      screen: null as ScreenId | null,
      providerMode: false,
      providerTab: null as ProviderScreenId | null,
      providerItem: null as string | null,
    };
  const params = new URLSearchParams(window.location.search);
  const provider = params.get("provider");
  const screen = params.get("screen") as ScreenId | null;
  const providerMode = params.get("mode") === "provider";
  const ptab = params.get("ptab");
  return {
    provider,
    screen: provider ? screen ?? ("form" as ScreenId) : screen,
    providerMode,
    providerTab: providerMode ? (ptab === "sem" ? "psem" : "pinbox") as ProviderScreenId : null,
    providerItem: providerMode ? params.get("item") : null,
  };
};


const MODE_KEY = "lulafi.mode";
const PROVIDER_SCREEN_KEY = "lulafi.providerScreen";

const readStored = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key) as T | null;
    return value && allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const providerScreens: readonly ProviderScreenId[] = [
  "pdash",
  "pactivity",
  "psem",
  "pconvo",
  "pinbox",
  "psubmission",
  "pupdate",
  "pgroup",
  "psettings",
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deepLink = readDeepLink();
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(deepLink.screen ?? "splash");
  const [displayName, setDisplayName] = useState("TheBoyBass");
  const [phone, setPhone] = useState("+27 82 445 9012");
  const [email, setEmail] = useState("theboybass@lulafi.co.za");
  const [isDark, setIsDark] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>(initialUnread);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(deepLink.provider);
  const [arrivedViaDeepLink, setArrivedViaDeepLink] = useState(Boolean(deepLink.provider));
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [activeProviderFormId, setActiveProviderFormId] = useState<string | null>(null);
  const [mode, setMode] = useState<AppMode>(() =>
    deepLink.providerMode ? "provider" : readStored(MODE_KEY, ["client", "provider"] as const, "client")
  );
  const [providerScreen, setProviderScreen] = useState<ProviderScreenId>(() =>
    deepLink.providerTab ?? readStored(PROVIDER_SCREEN_KEY, providerScreens, "pdash")
  );
  const [providerHighlightId, setProviderHighlightId] = useState<string | null>(
    deepLink.providerItem
  );
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [activeSemThreadId, setActiveSemThreadId] = useState<string | null>(deepLink.providerItem);
  const [activeClientConvoId, setActiveClientConvoId] = useState<string | null>(null);

  const [providerAlerts, setProviderAlerts] = useState({ inbox: 0, sem: 0 });
  const [providerFocusToken, setProviderFocusToken] = useState(deepLink.providerItem ? 1 : 0);


  // Persist the view mode and provider tab so a refresh returns to the same view
  useEffect(() => {
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch { /* storage unavailable */ }
  }, [mode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROVIDER_SCREEN_KEY, providerScreen);
    } catch { /* storage unavailable */ }
  }, [providerScreen]);

  const markProviderAlertsSeen = useCallback((tab: "inbox" | "sem") => {
    setProviderAlerts(prev => (prev[tab] ? { ...prev, [tab]: 0 } : prev));
  }, []);

  const clearProviderHighlight = useCallback(() => {
    setProviderHighlightId(null);
    if (typeof window !== "undefined" && window.location.search.includes("mode=provider")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);


  const navigateProvider = useCallback(
    (screen: ProviderScreenId, options?: { focusNewest?: boolean }) => {
      setProviderScreen(screen);
      if (screen === "pinbox") markProviderAlertsSeen("inbox");
      if (screen === "psem" || screen === "pconvo") markProviderAlertsSeen("sem");
      if (options?.focusNewest) setProviderFocusToken(t => t + 1);
    },
    [markProviderAlertsSeen]
  );

  const openSubmission = useCallback((id: string) => {
    setActiveSubmissionId(id);
    setProviderScreen("psubmission");
  }, []);

  const openSemThread = useCallback((id: string) => {
    setActiveSemThreadId(id);
    setProviderScreen("pconvo");
    markProviderAlertsSeen("sem");
  }, [markProviderAlertsSeen]);





  const openClientConvo = useCallback((id: string | null) => {
    setActiveClientConvoId(id);
    if (id) setUnreadCounts(prev => (prev[id] ? { ...prev, [id]: 0 } : prev));
    setCurrentScreen("convo");
  }, []);

  const screenRef = useRef<ProviderScreenId>(providerScreen);
  useEffect(() => {
    screenRef.current = providerScreen;
  }, [providerScreen]);

  // Simulated realtime provider notifications: new submissions and LulaSEM messages
  useEffect(() => {
    if (mode !== "provider") return;
    let index = 0;
    const events = [
      {
        kind: "inbox" as const,
        title: "New submission received",
        description: "REF-1043 · Service Request from Naledi Dube",
      },
      {
        kind: "sem" as const,
        title: "New LulaSEM message",
        description: "Thato Mokoena replied about REF-1041",
      },
      {
        kind: "inbox" as const,
        title: "New submission received",
        description: "REF-1044 · Membership Application from Sipho Khumalo",
      },
      {
        kind: "sem" as const,
        title: "New LulaSEM message",
        description: "Support Team shared notes on REF-1040",
      },
    ];

    const fire = () => {
      const event = events[index % events.length];
      index += 1;
      const viewing =
        (event.kind === "inbox" && screenRef.current === "pinbox") ||
        (event.kind === "sem" && (screenRef.current === "psem" || screenRef.current === "pconvo"));
      if (!viewing) {
        setProviderAlerts(prev => ({ ...prev, [event.kind]: prev[event.kind] + 1 }));
      }
      toast(event.title, {
        description: event.description,
        action: {
          label: event.kind === "inbox" ? "Open inbox" : "Open LulaSEM",
          onClick: () => {
            setMode("provider");
            navigateProvider(event.kind === "inbox" ? "pinbox" : "psem", { focusNewest: true });
          },
        },
      });
    };

    const first = window.setTimeout(fire, 6000);
    const repeat = window.setInterval(fire, 22000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(repeat);
    };
  }, [mode, navigateProvider]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  const markConversationRead = useCallback((id: string) => {
    setUnreadCounts(prev => (prev[id] ? { ...prev, [id]: 0 } : prev));
  }, []);

  const syncUrl = useCallback((screen: ScreenId, providerId: string | null) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (providerId) {
      params.set("provider", providerId);
      params.set("screen", screen);
    }
    const query = params.toString();
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`
    );
  }, []);

  const navigate = useCallback(
    (screen: ScreenId) => {
      setCurrentScreen(screen);
      if (screen !== "form") {
        setArrivedViaDeepLink(false);
        syncUrl(screen, null);
      }
    },
    [syncUrl]
  );

  const openProviderDetail = useCallback(
    (providerId: string) => {
      setActiveProviderId(providerId);
      setCurrentScreen("org");
      setArrivedViaDeepLink(false);
      syncUrl("org", providerId);
    },
    [syncUrl]
  );

  const openProviderForm = useCallback(
    (providerId: string, formId?: string) => {
      setActiveProviderId(providerId);
      setActiveProviderFormId(formId ?? null);
      // Consent + vault PIN come first, then the prefilled form
      setCurrentScreen("consent");
      setArrivedViaDeepLink(false);
      syncUrl("consent", providerId);
    },
    [syncUrl]
  );

  const openFormDetail = useCallback(
    (formId: string) => {
      setActiveFormId(formId);
      setCurrentScreen("fdetail");
      setArrivedViaDeepLink(false);
      syncUrl("fdetail", null);
    },
    [syncUrl]
  );

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        arrivedViaDeepLink,
        navigate,
        mode,
        setMode,
        providerScreen,
        navigateProvider,
        providerFocusToken,
        providerHighlightId,
        clearProviderHighlight,

        activeSubmissionId,
        openSubmission,
        activeSemThreadId,
        openSemThread,
        activeClientConvoId,
        openClientConvo,

        providerAlerts,
        markProviderAlertsSeen,

        displayName,
        setDisplayName,
        phone,
        setPhone,
        email,
        setEmail,
        isDark,
        toggleTheme,
        unreadCounts,
        markConversationRead,
        activeProviderId,
        activeProviderFormId,
        openProviderForm,
        openProviderDetail,
        activeFormId,
        openFormDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
