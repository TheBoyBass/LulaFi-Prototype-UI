/**
 * Single source of truth for the design system release marker.
 *
 * Bump rules (semantic versioning):
 * - MAJOR — a token changes meaning or a documented rule is reversed, so mockups
 *   generated against the previous release would now be wrong.
 * - MINOR — a new capability is documented (new tab, new component, new guideline).
 * - PATCH — wording, examples or a colour value tweak with no rule change.
 *
 * v1.0.0 shipped the foundation tokens and components. v2.0.0 covers everything
 * added or changed since: the semantic colour-role system, the shared
 * light/dark/system appearance choice, brand/wordmark and icon colour guidelines,
 * the WCAG 2.2 AA pass, and the AI Brief with its review step.
 */
export const DESIGN_SYSTEM_VERSION = '2.0.0';

/** Short descriptor shown beside the version in the header and footer. */
export const DESIGN_SYSTEM_RELEASE_NOTES = 'Colour Roles, Theming, Brand Rules & AI Brief';

/** One line per release, newest first — shown in the Guidelines tab. */
export const DESIGN_SYSTEM_CHANGELOG: { version: string; date: string; notes: string[] }[] = [
  {
    version: '2.0.0',
    date: '13 Nov 2026',
    notes: [
      'Semantic colour roles: royal blue branding, bright teal actions, light/dark surfaces, chat, status, stroke and media roles.',
      'Shared light / dark / system appearance choice, remembered per visitor and applied to every surface.',
      'Brand guidelines: wordmark colours, teal "Fi", royal blue reserved for the logo icon and art.',
      'Icon rule: icons always take bright teal #4fe0ca; teal is never used as text on light surfaces.',
      'WCAG 2.2 AA pass: contrast raised, active-page markers, visible keyboard focus, phone-sized layouts.',
      'AI Brief tab with a review-and-confirm step and light/dark previews of the standards.',
    ],
  },
  {
    version: '1.0.0',
    date: 'Foundation release',
    notes: ['Foundation tokens and components: colours, typography, spacing and base components.'],
  },
];
