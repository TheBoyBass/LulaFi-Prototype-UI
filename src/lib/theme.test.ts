import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  initTheme,
  readThemePreference,
  resolveIsDark,
  setThemePreference,
  subscribeTheme,
} from "./theme";

/** Replace the stubbed matchMedia so a test can pretend the OS is dark or light. */
function setSystemAppearance(dark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: dark,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}

describe("theme preference", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    setSystemAppearance(false);
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    vi.unstubAllGlobals();
  });

  it("starts light when nothing has been chosen", () => {
    expect(readThemePreference()).toBe("light");
    expect(resolveIsDark(readThemePreference())).toBe(false);
  });

  it("resolves dark to dark and light to light regardless of the OS", () => {
    setSystemAppearance(true);
    expect(resolveIsDark("light")).toBe(false);
    expect(resolveIsDark("dark")).toBe(true);
    setSystemAppearance(false);
    expect(resolveIsDark("light")).toBe(false);
    expect(resolveIsDark("dark")).toBe(true);
  });

  it("resolves system to whatever the OS asks for", () => {
    setSystemAppearance(true);
    expect(resolveIsDark("system")).toBe(true);
    setSystemAppearance(false);
    expect(resolveIsDark("system")).toBe(false);
  });

  it("stores the choice and puts the dark class on the document", () => {
    setThemePreference("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");

    setThemePreference("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  it("applies the OS appearance when the stored choice is system", () => {
    setSystemAppearance(true);
    setThemePreference("system");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    setSystemAppearance(false);
    applyTheme("system");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("ignores a stored value that is not one of the three options", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "hot-pink");
    expect(readThemePreference()).toBe("light");
  });

  it("applies the stored appearance before the first paint", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(initTheme()).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("tells subscribers the current preference at once and again on change", () => {
    const seen: string[] = [];
    const unsubscribe = subscribeTheme((preference) => seen.push(preference));
    expect(seen).toEqual(["light"]);

    setThemePreference("dark");
    expect(seen).toEqual(["light", "dark"]);

    unsubscribe();
    setThemePreference("system");
    expect(seen).toEqual(["light", "dark"]);
  });
});
