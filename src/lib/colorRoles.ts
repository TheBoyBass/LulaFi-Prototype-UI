// ─── Foundation Palette ───────────────────────────────────────────────
// PRIMARY  #1431a5  — Royal blue: trust, authority, intelligence
// TEAL     #17bebb  — Teal: clarity, freshness, modernity
// NAVY     #18214f  — Deep navy: security, depth, professionalism
//
// Applications consume the colour roles below, never palette steps or literals.
// This module has no UI dependencies so the same values work in web, native,
// server rendering, and build-time configuration.

const screenSurface = {
  light: '#eef1fb',
  dark: '#0b1220',
} as const;

// ─── Colour Roles ─────────────────────────────────────────────────────

export interface StatusRole {
  /** Tinted background for banners, pills and icon circles. */
  surface: string;
  /** Text and icons on `surface` or on the screen background. */
  content: string;
  stroke: string;
  /** Filled background (badges, destructive buttons). */
  solid: string;
  /** Text and icons on `solid`. */
  onSolid: string;
}

export interface ColorRoles {
  surface: {
    screen: string;
    elevated: string;
    /**
     * Full-width list sections (e.g. conversation rows): an elevated sheet in
     * light mode, continuous with the canvas and header in dark mode.
     */
    list: string;
    muted: string;
    strong: string;
    interactive: string;
    interactiveStrong: string;
    selected: string;
    accent: string;
    icon: string;
    /** Backdrop behind sheets and dialogs. */
    overlay: string;
    /** Heavier backdrop over media and camera content. */
    scrim: string;
  };
  content: {
    primary: string;
    secondary: string;
    muted: string;
    subtle: string;
    inverse: string;
    interactive: string;
    /** Text and icons on `surface.interactiveStrong`. */
    onInteractive: string;
    selected: string;
    accent: string;
    link: string;
  };
  /**
   * Icon fills. Icons keep the bright action teal in BOTH appearances — only text
   * swaps to teal-black on light surfaces (see `content.interactive`). Never put a
   * teal-role text class on an icon; use this role so the two stay independent.
   */
  icon: {
    interactive: string;
  };
  stroke: {
    default: string;
    subtle: string;
    control: string;
    /** Deeper edge that makes a filled action shape identifiable against surfaces. */
    interactive: string;
    selected: string;
    accent: string;
    focus: string;
  };
  status: {
    danger: StatusRole;
    success: StatusRole;
    warning: StatusRole;
    info: StatusRole;
  };
  brand: {
    main: string;
    pressed: string;
  };
  chat: {
    sent: string;
    received: string;
    sentText: string;
    receivedText: string;
  };
  /**
   * Fills that tell people apart (avatars), always with white initials. Same
   * order in both modes so a person keeps their hue family.
   */
  identity: readonly string[];
  shadow: string;
}

// One action teal for buttons, send, links, selection and accents, held constant in
// both modes. It is a FILL colour: on the light surfaces it reads at ~1.45:1, too low
// to work as text or as a control edge on its own, so filled actions carry a deeper
// teal edge (stroke.interactive) and teal is never used as text on light surfaces.
// Brand blue is reserved for the logo and the info tone.
const lightAction = '#4fe0ca';
const lightActionTint = '#e7f8f8';
const lightActionEdge = '#0b736a';
// Teal-black for teal-role TEXT on light surfaces (rule: never teal text on light).
const lightActionText = '#061b19';
const lightMuted = '#5b6a7d';
const lightDanger = '#be123c';

const lightRoles: ColorRoles = {
  surface: {
    screen: screenSurface.light,
    elevated: '#f5f7fd',
    list: '#f5f7fd',
    muted: '#f8fafc',
    strong: '#f1f5f9',
    interactive: lightActionTint,
    interactiveStrong: lightAction,
    selected: lightActionTint,
    accent: lightAction,
    icon: lightActionTint,
    overlay: 'rgba(15, 23, 42, 0.45)',
    scrim: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: lightMuted,
    subtle: '#94a3b8',
    inverse: '#ffffff',
    interactive: lightActionText,
    onInteractive: '#061b19',
    selected: lightActionText,
    accent: lightActionText,
    link: lightActionText,
  },
  icon: {
    interactive: lightAction,
  },
  stroke: {
    default: '#dce5ef',
    subtle: '#e2e8f0',
    control: '#cbd5e1',
    interactive: lightActionEdge,
    selected: lightAction,
    accent: lightAction,
    focus: lightAction,
  },
  status: {
    danger: {
      surface: '#fff1f2',
      content: lightDanger,
      stroke: '#fecdd3',
      solid: lightDanger,
      onSolid: '#ffffff',
    },
    success: {
      surface: '#ecfdf5',
      content: '#047857',
      stroke: '#a7f3d0',
      solid: '#059669',
      onSolid: '#ffffff',
    },
    warning: {
      surface: '#fffbeb',
      content: '#b45309',
      stroke: '#fde68a',
      solid: '#d97706',
      onSolid: '#ffffff',
    },
    info: {
      surface: '#e8ecf7',
      content: '#1431a5',
      stroke: '#c5ceed',
      solid: '#1431a5',
      onSolid: '#ffffff',
    },
  },
  brand: {
    main: '#1431a5',
    pressed: '#0e2277',
  },
  // Sent bubbles are a soft action tint with dark text (WhatsApp-style); deeper than
  // the UI tint so they stay distinct from white received bubbles on the canvas.
  chat: {
    sent: '#4fe0ca',
    received: '#f5f7fd',
    sentText: '#061b19',
    receivedText: '#0f172a',
  },
  identity: ['#1431a5', '#18214f', '#10b981', '#f59e0b', '#f43f5e'],
  shadow: '#0f172a',
};

const darkTeal = {
  interactive: '#4fe0ca',
  onInteractive: '#061b19',
};

const darkRoles: ColorRoles = {
  surface: {
    screen: screenSurface.dark,
    elevated: '#151f30',
    list: screenSurface.dark,
    muted: '#111b2b',
    strong: '#1f2b3d',
    interactive: '#123b3a',
    interactiveStrong: darkTeal.interactive,
    selected: '#123b3a',
    accent: darkTeal.interactive,
    icon: '#143834',
    overlay: 'rgba(0, 0, 0, 0.65)',
    scrim: 'rgba(0, 0, 0, 0.72)',
  },
  content: {
    primary: '#f8f3e8',
    secondary: '#cbd5e1',
    muted: '#aab9cc',
    subtle: '#91a2b7',
    inverse: darkTeal.onInteractive,
    interactive: darkTeal.interactive,
    onInteractive: darkTeal.onInteractive,
    selected: darkTeal.interactive,
    accent: darkTeal.interactive,
    link: darkTeal.interactive,
  },
  icon: {
    interactive: darkTeal.interactive,
  },
  stroke: {
    default: '#314158',
    subtle: '#26364b',
    control: '#42536b',
    /* Matches the fill, so dark-mode actions keep the edge they already have. */
    interactive: darkTeal.interactive,
    selected: darkTeal.interactive,
    accent: darkTeal.interactive,
    focus: darkTeal.interactive,
  },
  status: {
    danger: {
      surface: '#401f2b',
      content: '#ff9aab',
      stroke: '#8b4354',
      solid: '#ff7187',
      onSolid: '#2a0a12',
    },
    success: {
      surface: '#103b32',
      content: '#70e6b4',
      stroke: '#2e755d',
      solid: '#34d399',
      onSolid: '#052e22',
    },
    warning: {
      surface: '#3a2a0c',
      content: '#fcd34d',
      stroke: '#7a5a14',
      solid: '#fbbf24',
      onSolid: '#2a1a02',
    },
    info: {
      surface: '#17214a',
      content: '#a4b5ff',
      stroke: '#3a4a8a',
      solid: '#90a4ff',
      onSolid: '#0a1030',
    },
  },
  brand: {
    main: '#90a4ff',
    pressed: '#b8c5ff',
  },
  chat: {
    // Same bright action teal as light mode; text on it uses content.onInteractive (#061b19).
    sent: '#4fe0ca',
    received: '#1f2b3d',
    sentText: '#061b19',
    receivedText: '#f4f7fc',
  },
  identity: ['#4d64cb', '#4d5792', '#059669', '#d97706', '#e11d48'],
  shadow: '#000000',
};

/**
 * Chrome drawn over photos, video and the camera (viewers, capture): black and
 * white in both appearances, since the media sets the backdrop, not the theme.
 */
export const mediaChrome = {
  background: '#000000',
  foreground: '#ffffff',
  /** Buttons and pills on the media. */
  control: 'rgba(255, 255, 255, 0.18)',
  /** Bars and labels over the media. */
  scrim: 'rgba(0, 0, 0, 0.45)',
  /** Status toasts that must read over any frame. */
  toast: 'rgba(15, 23, 42, 0.9)',
  success: '#34d399',
} as const;

export type ColorMode = 'light' | 'dark';

export const semanticColors: Record<ColorMode, ColorRoles> = {
  light: lightRoles,
  dark: darkRoles,
};

// ─── Foundation Palette ───────────────────────────────────────────────
// The scales the roles above were picked from, kept for decorative brand art
// (splash and welcome particles). UI code reads roles, never these steps.

export const palette = {
  // Primary Brand Colors — Royal Blue
  primary: {
    50: '#e8ecf7',
    100: '#c5ceed',
    200: '#9daae2',
    300: '#7587d6',
    400: '#4d64cb',
    500: '#1431a5', // ← foundation
    600: '#112a8e',
    700: '#0e2277',
    800: '#0b1a60',
    900: '#071140',
  },

  // Accent — Deep Navy
  accent: {
    50: '#e8eaf2',
    100: '#c5c9de',
    200: '#9da3c5',
    300: '#757dab',
    400: '#4d5792',
    500: '#18214f', // ← foundation
    600: '#141b43',
    700: '#101537',
    800: '#0c102b',
    900: '#080a1f',
  },

  // Teal — Secondary / Interactive
  teal: {
    50: '#e7f8f8',
    100: '#c3eeee',
    200: '#8fdddc',
    300: '#5bcccb',
    400: '#38c4c2',
    500: '#17bebb', // ← foundation
    600: '#13a09d',
    700: '#0f807e',
    800: '#0b605f',
    900: '#074040',
  },

  // Success — Emerald (harmonises with teal, shifted toward green)
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },

  // Warning — Amber (warm contrast against cool palette)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error — Rose (distinct from the blue family, high urgency)
  error: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },

  // Neutral — Cool gray (blue-tinted to harmonise with primary/navy)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Special
};

export const PARTICLE_COLORS = [
  palette.primary[400], // #4d64cb — medium royal blue
  palette.primary[500], // #1431a5 — foundation blue
  palette.teal[500], // #17bebb — foundation teal
  palette.teal[300], // #5bcccb — light teal
  palette.primary[300], // #7587d6 — lighter blue
  palette.teal[200], // #8fdddc — pale teal
] as const;

export const DOT_COLORS_LIST = [palette.primary[400], palette.primary[500], palette.teal[500]];
