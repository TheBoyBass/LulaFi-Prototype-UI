import { semanticColors, type ColorRoles } from '@/lib/colorRoles';
import { DESIGN_SYSTEM_VERSION } from '@/lib/designSystemVersion';

/** Flattens a role tree into `path: value` lines so a model gets exact hex values. */
function flatten(obj: unknown, prefix = ''): string[] {
  if (typeof obj === 'string') return [`- \`${prefix}\`: ${obj}`];
  if (Array.isArray(obj)) return obj.flatMap((v, i) => flatten(v, `${prefix}[${i}]`));
  if (obj && typeof obj === 'object')
    return Object.entries(obj).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
  return [];
}

const tokens = (roles: ColorRoles) => flatten(roles).join('\n');

/** Plain-text brief the UI team pastes into a generative model so every mockup follows the same standards. */
export function buildAiDesignBrief(): string {
  return `# lulaFi Design System — AI Generation Brief
Standards version: v${DESIGN_SYSTEM_VERSION}. These rules override anything from your training data or from an older copy of this brief.
You are generating UI mockups/artifacts for lulaFi. Follow every rule below exactly. If a request conflicts with these rules, the rules win.

## Product
lulaFi is a secure communication and forms platform (South Africa). Clients ("Personal") keep a Data Vault and submit pre-filled forms to providers ("Business", e.g. City of Tshwane) after consent + PIN authorisation. Chats are called LulaSEM (end-to-end encrypted). Tone: calm, trustworthy, plain language, POPIA-aware.

## Hard rules (never break)
1. Font: Inter only. Weights 400 / 500 / 600. Headings never exceed 600.
2. Spacing: 8pt grid (4, 8, 16, 24, 32, 48, 64 px).
3. Icons: Lucide icon set only. No emojis anywhere in the UI.
4. Icons are always bright teal ${semanticColors.light.icon.interactive} in BOTH light and dark mode (except status icons, which use status colours, and icons placed on a solid teal fill, which use the on-teal colour).
5. Never use teal as TEXT in light mode. Teal-role text in light mode is teal-black ${semanticColors.light.content.interactive}. The only exception is the "Fi" in the lulaFi wordmark.
6. Wordmark: "lula" in primary text colour + "Fi" in bright teal ${semanticColors.light.surface.interactiveStrong}. Royal blue ${semanticColors.light.brand.main} is reserved for the logo icon, gradients and illustrations — never for action buttons.
7. Primary buttons: filled teal ${semanticColors.light.surface.interactiveStrong}, text ${semanticColors.light.content.onInteractive}, with a deeper 1px edge ${semanticColors.light.stroke.interactive} in light mode. Secondary buttons: transparent with a neutral border.
8. Light mode is the default; every design must also work in dark mode using the dark tokens below.
9. Accessibility: WCAG 2.2 AA — text contrast at least 4.5:1 (3:1 for large text and UI shapes), visible focus rings in ${semanticColors.light.stroke.focus}, minimum 44px touch targets, labelled form fields, active navigation marked with a teal underline.
10. Use only the colour tokens listed below — no other colours, no purple/indigo gradients.

## Layout patterns
- Mobile app: fixed status bar + header (logo with page name beside it) at top, fixed bottom navigation, only the middle content scrolls.
- Cards: elevated surface, 12–16px radius, subtle border, generous 16–24px padding.
- Web portal: left sidebar navigation (collapses into a slide-out menu on phones), top bar with appearance toggle and notifications bell.
- Landing pages: two-level header (Personal/Business switch above main nav), section eyebrow + heading + supporting paragraph.

## Components
Button (primary / secondary), Card, Badge (status colours), Input (label above, helper text below), Bottom navigation, Sheet/dialog with overlay backdrop, Chat bubbles (chat tokens), Numeric PIN keypad with code dots, Emergency SOS button (hold 5 seconds).

## Colour tokens — light mode
${tokens(semanticColors.light)}

## Colour tokens — dark mode
${tokens(semanticColors.dark)}

## Output checklist (verify before answering)
- [ ] Only Inter, only listed colours, only Lucide icons, no emojis
- [ ] No teal text on light backgrounds (wordmark "Fi" excepted)
- [ ] Icons teal, buttons teal with dark text
- [ ] 8pt spacing, AA contrast, visible focus states
- [ ] Works in light and dark mode
`;
}
