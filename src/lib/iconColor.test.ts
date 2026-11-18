import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { semanticColors } from "./colorRoles";

/*
 * Rule: icons keep the bright action teal (#4fe0ca) in BOTH appearances. Only text
 * changes — teal-role text resolves to teal-black on light surfaces. So an icon must
 * never carry a teal *text* class (text-brand / text-brand-foreground / text-content-*);
 * it carries the icon role instead.
 */

const TEXT_ROLES = /\btext-(brand|brand-foreground|content-(interactive|link|selected|accent))\b/;
/** A tag and its own className, taken from one line so the match cannot cross `>`. */
const TAG_WITH_CLASS = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*?className=(?:"([^"]*)"|\{([^}]*)\})/g;
/**
 * Names that hold text rather than draw a glyph: components ending in one of these
 * suffixes, or in the extra list, are containers — their text colour is their own choice.
 */
const CONTAINER_SUFFIXES = [
  "Button", "Card", "Layout", "Frame", "Badge", "Chip", "Pill", "Switch", "Toggle", "Input",
  "Select", "Dialog", "Modal", "Sheet", "Menu", "Nav", "Item", "Trigger", "Content", "Header",
  "Footer", "Title", "Label", "Section", "Screen", "Host", "Provider", "List", "Table", "Row",
  "Cell", "Field", "Form", "Grid", "Box", "Wrapper", "Link", "Tab", "Panel", "Bar", "Group",
  "Stack", "Page", "Heading", "Banner", "Actions", "Notifications", "Switcher", "Skeleton",
  "Spinner", "Toast", "Tooltip", "Popover", "Dropdown", "Pagination", "Carousel", "Sidebar",
  "Drawer", "Anchor",
];
const CONTAINERS = new Set([
  "div", "span", "p", "a", "h1", "h2", "h3", "h4", "b", "i", "em", "strong", "li", "td", "th",
  "button", /* drawn parts of an inline illustration, not a glyph */
  "line", "path", "circle", "rect", "polyline", "polygon", "ellipse", "g",
]);

function isContainer(tag: string): boolean {
  return CONTAINERS.has(tag) || tag.startsWith("Lula") || CONTAINER_SUFFIXES.some((s) => tag.endsWith(s));
}

function sourceFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      if (entry === "ui" || entry === "node_modules") continue;
      found.push(...sourceFiles(path));
    } else if (path.endsWith(".tsx")) {
      found.push(path);
    }
  }
  return found;
}

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (n: number) => Math.round(255 * n).toString(16).padStart(2, "0");
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

describe("icon colour role", () => {
  it("puts no teal text role on an icon element", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles("src")) {
      readFileSync(file, "utf8").split("\n").forEach((line, i) => {
        for (const match of line.matchAll(TAG_WITH_CLASS)) {
          const tag = match[1];
          const value = `${match[2] ?? ""} ${match[3] ?? ""}`;
          if (isContainer(tag) || !TEXT_ROLES.test(value)) continue;
          offenders.push(`${file}:${i + 1} <${tag}>`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it("mirrors the icon role into both appearances' CSS variables as the same teal", () => {
    const css = readFileSync("src/index.css", "utf8");
    const values = [...css.matchAll(/--icon-interactive:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)]
      .map((m) => hslToHex(Number(m[1]), Number(m[2]), Number(m[3])));
    expect(values.length).toBe(2);
    expect(values).toEqual([
      semanticColors.light.icon.interactive,
      semanticColors.dark.icon.interactive,
    ]);
  });

  it("exposes the icon role to components as text-icon-interactive", () => {
    const config = readFileSync("tailwind.config.ts", "utf8");
    expect(config).toContain('icon: { interactive: "hsl(var(--icon-interactive))" }');
  });
});
