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
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("splash");
  const [displayName, setDisplayName] = useState("TheBoyBass");
  const [isDark, setIsDark] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>(initialUnread);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  const markConversationRead = useCallback((id: string) => {
    setUnreadCounts(prev => (prev[id] ? { ...prev, [id]: 0 } : prev));
  }, []);

  const navigate = useCallback((screen: ScreenId) => {
    setCurrentScreen(screen);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigate,
        displayName,
        setDisplayName,
        isDark,
        toggleTheme,
        unreadCounts,
        markConversationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
