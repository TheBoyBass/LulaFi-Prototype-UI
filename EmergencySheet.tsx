export type HeroPhase = "filling" | "pin" | "approved" | "sending" | "received";

/** Ordered hero loop with each phase's duration in ms. */
export const HERO_SEQUENCE: { phase: HeroPhase; duration: number }[] = [
  { phase: "filling", duration: 2600 },
  { phase: "pin", duration: 2800 },
  { phase: "approved", duration: 1200 },
  { phase: "sending", duration: 2600 },
  { phase: "received", duration: 3200 },
];
