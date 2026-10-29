export type PortalRole = "client" | "provider";

export interface PortalUser {
  role: PortalRole;
  username: string;
  displayName: string;
  firstName: string;
  organisation?: string;
  email: string;
  phone: string;
}

export const DEMO_PASSWORD = "demo1234";

export const DEMO_USERS: Record<PortalRole, PortalUser> = {
  client: {
    role: "client",
    username: "TheBoyBass",
    displayName: "The Boy Bass",
    firstName: "The Boy Bass",
    email: "theboybass@lulafi.demo",
    phone: "082 445 9012",
  },
  provider: {
    role: "provider",
    username: "CityOfTshwane",
    displayName: "Thandi Mokoena",
    firstName: "Thandi",
    organisation: "City of Tshwane",
    email: "provider@tshwane.demo",
    phone: "012 358 9999",
  },
};

const KEY = "lulafi.portalSession";

export const readSession = (): PortalUser | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PortalUser) : null;
  } catch {
    return null;
  }
};

export const writeSession = (u: PortalUser | null) => {
  try {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  } catch { /* ignore */ }
};

export const findDemoUser = (username: string, password: string): PortalUser | null => {
  if (password !== DEMO_PASSWORD) return null;
  const u = Object.values(DEMO_USERS).find(d => d.username.toLowerCase() === username.trim().toLowerCase());
  return u ?? null;
};
