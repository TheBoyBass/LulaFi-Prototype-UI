import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { AppProvider, useApp } from "./AppContext";

function Consumer() {
  const { displayName, setDisplayName } = useApp();
  return <input aria-label="Display name" value={displayName} onChange={event => setDisplayName(event.target.value)} />;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("AppContext boundary", () => {
  it("shares updated state between consumers inside the provider", () => {
    render(<AppProvider><Consumer /><Consumer /></AppProvider>);
    const inputs = screen.getAllByRole("textbox", { name: "Display name" });
    fireEvent.change(inputs[0], { target: { value: "Shared user" } });
    expect(inputs[1]).toHaveValue("Shared user");
  });

  it("still rejects consumers genuinely outside the provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow("useApp must be inside AppProvider");
  });
});