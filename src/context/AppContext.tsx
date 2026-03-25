import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ScreenId } from "@/types/screens";

interface AppContextType {
  currentScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  const navigate = useCallback((screen: ScreenId) => {
    setCurrentScreen(screen);
  }, []);

  return (
    <AppContext.Provider value={{ currentScreen, navigate, displayName, setDisplayName, isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
