import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import type { SettingsField } from "./SettingsSections";

export const APPEARANCE_SELECT_ID = "appearance";
export const DARK_MODE_TOGGLE_ID = "darkMode";

interface AppearanceStateSlice {
  selects: Record<string, string>;
  toggles: Record<string, boolean>;
  onSelectChange: (id: string, value: string) => void;
  onToggleChange: (id: string, value: boolean) => void;
}

/**
 * Shared appearance rows (Appearance select + Dark mode toggle) wired to the
 * global theme state, so Client and Provider settings behave identically.
 */
export function useAppearanceSettings(state: AppearanceStateSlice): SettingsField[] {
  const { isDark, toggleTheme } = useApp();

  // Keep the row values in sync with the global theme (e.g. changed elsewhere).
  useEffect(() => {
    const wanted = isDark ? "Dark" : "Light";
    if (state.selects[APPEARANCE_SELECT_ID] !== wanted) {
      state.onSelectChange(APPEARANCE_SELECT_ID, wanted);
    }
    if (state.toggles[DARK_MODE_TOGGLE_ID] !== isDark) {
      state.onToggleChange(DARK_MODE_TOGGLE_ID, isDark);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return [
    {
      kind: "toggle",
      id: DARK_MODE_TOGGLE_ID,
      name: "Dark mode",
      sub: "Switch the whole app between light and dark",
      onChange: value => {
        if (value !== isDark) toggleTheme();
      },
    },
  ];
}
