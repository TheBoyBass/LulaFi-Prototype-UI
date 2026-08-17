import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ScreenId } from "@/types/screens";
import { providerGroups } from "@/data/lulasem";

const initialUnread = providerGroups.reduce<Record<string, number>>((acc, g) => {
  g.rows.forEach(r => { acc[r.id] = r.unread; });
  return acc;
}, {});

interface AppContextType {
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
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
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

const readDeepLink = () => {
  if (typeof window === "undefined") return { provider: null as string | null, screen: null as ScreenId | null };
  const params = new URLSearchParams(window.location.search);
  const provider = params.get("provider");
  const screen = params.get("screen") as ScreenId | null;
  return { provider, screen: provider ? screen ?? ("form" as ScreenId) : screen };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deepLink = readDeepLink();
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(deepLink.screen ?? "splash");
  const [displayName, setDisplayName] = useState("TheBoyBass");
  const [isDark, setIsDark] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>(initialUnread);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(deepLink.provider);
  const [arrivedViaDeepLink, setArrivedViaDeepLink] = useState(Boolean(deepLink.provider));
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [activeProviderFormId, setActiveProviderFormId] = useState<string | null>(null);

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
      setCurrentScreen("form");
      setArrivedViaDeepLink(false);
      syncUrl("form", providerId);
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
        displayName,
        setDisplayName,
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
