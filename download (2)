import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import SettingsScreen from "@/screens/SettingsScreen";
import ProviderSettingsScreen from "@/screens/provider/ProviderSettingsScreen";

const screens = [
  { name: "Client settings", Comp: SettingsScreen },
  { name: "Provider settings", Comp: ProviderSettingsScreen },
] as const;

const renderScreen = (Comp: () => JSX.Element) =>
  render(
    <MemoryRouter>
      <AppProvider>
        <Comp />
      </AppProvider>
    </MemoryRouter>
  );

const openSection = (label: string) => {
  const [first] = screen.queryAllByText(label);
  if (first) fireEvent.click(first);
};

describe.each(screens)("$name", ({ Comp }) => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("exposes the Dark mode toggle and toggles the global theme", () => {
    renderScreen(Comp as () => JSX.Element);
    openSection("Preferences");

    // No Appearance dropdown anymore
    expect(screen.queryByText("Appearance")).not.toBeInTheDocument();

    const darkSwitch = screen.getByRole("switch", { name: /Dark mode/ });
    expect(darkSwitch).toHaveAttribute("aria-checked", "false");
    fireEvent.click(darkSwitch);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    fireEvent.click(screen.getByRole("switch", { name: /Dark mode/ }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("renders toggles as switches that flip on click", () => {
    renderScreen(Comp as () => JSX.Element);
    openSection("Preferences");
    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThan(0);
    const first = switches[0];
    const before = first.getAttribute("aria-checked");
    fireEvent.click(first);
    expect(screen.getAllByRole("switch")[0].getAttribute("aria-checked")).not.toBe(before);
  });

  it("supports inline text editors that save a new value", () => {
    renderScreen(Comp as () => JSX.Element);
    // Account section is open by default on both screens.
    const label = screen.getByText(/^(Full name|Business name)$/);
    fireEvent.click(label);
    const input = document.querySelector('input[name="value"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: "Parity Test Value" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getAllByText("Parity Test Value").length).toBeGreaterThan(0);
  });

  it("supports option chips on select rows", () => {
    renderScreen(Comp as () => JSX.Element);
    openSection("Preferences");
    fireEvent.click(screen.getByText("Language"));
    fireEvent.click(screen.getByRole("button", { name: "isiZulu" }));
    expect(screen.getAllByText("isiZulu").length).toBeGreaterThan(0);
  });

  it("renders action rows and a sign out section", () => {
    renderScreen(Comp as () => JSX.Element);
    openSection("Data & privacy");
    openSection("Data & storage");
    const exportRow = screen.getByText(/Export (my data|submissions)/);
    fireEvent.click(exportRow);
    expect(exportRow).toBeInTheDocument();

    openSection("Sign out");
    expect(
      within(document.body).getByText(/Sign out of lulaFi|Sign out of provider/)
    ).toBeInTheDocument();
  });
});
