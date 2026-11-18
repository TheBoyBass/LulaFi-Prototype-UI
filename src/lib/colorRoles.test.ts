import { describe, expect, it } from "vitest";
import { semanticColors } from "./colorRoles";

/* WCAG 2.2 contrast: 4.5:1 for ordinary text, 3:1 for a control's edge. */
function rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
}
function luminance(hex: string): number {
  const [r, g, b] = rgb(hex).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const light = semanticColors.light;
const dark = semanticColors.dark;

describe("colour roles against WCAG AA", () => {
  it("keeps light-mode body text readable on every surface it sits on", () => {
    for (const surface of [light.surface.screen, light.surface.elevated, light.surface.muted]) {
      expect(contrast(light.content.muted, surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(light.status.danger.content, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("gives filled teal actions an edge that stands out from the page", () => {
    expect(contrast(light.stroke.interactive, light.surface.screen)).toBeGreaterThanOrEqual(3);
    expect(contrast(light.stroke.interactive, light.surface.elevated)).toBeGreaterThanOrEqual(3);
  });

  it("keeps the label on a filled danger shape readable", () => {
    expect(contrast(light.status.danger.onSolid, light.status.danger.solid)).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps icons the bright teal in both appearances while light-mode text is not teal", () => {
    expect(light.icon.interactive).toBe("#4fe0ca");
    expect(dark.icon.interactive).toBe(light.icon.interactive);
    /* Text roles must differ from the icon fill in light mode, and stay readable. */
    expect(light.content.link).not.toBe(light.icon.interactive);
    expect(light.content.interactive).not.toBe(light.icon.interactive);
    expect(contrast(light.content.link, light.surface.screen)).toBeGreaterThanOrEqual(4.5);
    /* In dark mode text and icons share the one teal. */
    expect(dark.content.link).toBe(dark.icon.interactive);
  });

  it("leaves dark mode as it stands", () => {
    expect(contrast(dark.content.muted, dark.surface.screen)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(dark.status.danger.content, dark.surface.screen)).toBeGreaterThanOrEqual(4.5);
    /* The dark edge matches the fill, so dark actions keep the outline they already had. */
    expect(dark.stroke.interactive).toBe(dark.content.interactive);
  });
});
