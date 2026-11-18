/*
 * Shared appearance preference for every LulaFi surface (landing, portal, prototype).
 *
 * The stored value is one of "light" | "dark" | "system". "system" follows the
 * operating system's own light/dark setting and updates live. The class `dark` on
 * <html> is what the CSS roles key off, so this module is the single place that
 * decides when it is present.
 */

export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "lulafi-theme";

const PREFERENCES: readonly ThemePreference[] = ["light", "dark", "system"];

function isPreference(value: unknown): value is ThemePreference {
  return typeof value === "string" && (PREFERENCES as readonly string[]).includes(value);
}

/** Stored choice, or "light" when nothing valid has been saved yet. */
export function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isPreference(stored) ? stored : "light";
  } catch {
    return "light";
  }
}

/** Whether the operating system currently asks for a dark appearance. */
export function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Turn a preference into the boolean the `dark` class represents. */
export function resolveIsDark(preference: ThemePreference): boolean {
  if (preference === "dark") return true;
  if (preference === "light") return false;
  return systemPrefersDark();
}

/** Write the appearance class and native colour scheme onto <html>. */
export function applyTheme(preference: ThemePreference): void {
  if (typeof document === "undefined") return;
  const dark = resolveIsDark(preference);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

type Listener = (preference: ThemePreference) => void;

const listeners = new Set<Listener>();
let mediaQuery: MediaQueryList | null = null;
let mediaHandler: ((event: MediaQueryListEvent) => void) | null = null;

function notify(preference: ThemePreference) {
  listeners.forEach((listener) => listener(preference));
}

/** Keep a "system" choice in step with the OS without storing anything. */
function watchSystemAppearance() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
  if (mediaQuery || mediaHandler) return;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaHandler = () => {
    if (readThemePreference() !== "system") return;
    applyTheme("system");
    notify("system");
  };
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", mediaHandler);
  }
}

/** Save a choice, apply it, and tell every subscriber. */
export function setThemePreference(preference: ThemePreference): void {
  if (!isPreference(preference)) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* storage unavailable — the appearance still changes for this visit */
  }
  applyTheme(preference);
  notify(preference);
}

/**
 * Follow the appearance from a component. The listener is called immediately with the
 * current preference, then again whenever it changes (including OS changes under "system").
 */
export function subscribeTheme(listener: Listener): () => void {
  watchSystemAppearance();
  listeners.add(listener);
  listener(readThemePreference());
  return () => {
    listeners.delete(listener);
  };
}

/** Apply the stored appearance before the first paint. */
export function initTheme(): ThemePreference {
  watchSystemAppearance();
  const preference = readThemePreference();
  applyTheme(preference);
  return preference;
}
