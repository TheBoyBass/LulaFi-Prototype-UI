import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ThemeToggle from "./ThemeToggle";
import { THEME_STORAGE_KEY, readThemePreference } from "@/lib/theme";

function openMenu() {
  const trigger = screen.getByRole("button", { name: "Change appearance" });
  fireEvent.keyDown(trigger, { key: "ArrowDown" });
  return trigger;
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("shows a sun button while the appearance is light", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Change appearance" })).toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).toBeNull();
  });

  it("offers light, dark and system in the list", () => {
    render(<ThemeToggle />);
    openMenu();
    expect(screen.getByRole("menuitemradio", { name: "Light mode" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Dark mode" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "System" })).toBeInTheDocument();
  });

  it("marks the current choice and switches to dark when picked", () => {
    render(<ThemeToggle />);
    openMenu();
    expect(screen.getByRole("menuitemradio", { name: "Light mode" })).toHaveAttribute(
      "data-state",
      "checked",
    );

    fireEvent.click(screen.getByRole("menuitemradio", { name: "Dark mode" }));

    expect(readThemePreference()).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
