export type ActivityKind = "form" | "appointment" | "login" | "device";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  /** Human readable timestamp */
  time: string;
  /** ISO date used for grouping */
  date: string;
  meta?: string;
}

/** Recent account activity for the signed-in account (The Boy Bass) */
export const activityItems: ActivityItem[] = [
  {
    id: "a1",
    kind: "form",
    title: "Home Affairs — Smart ID application submitted",
    detail: "9 fields prefilled from your lulaFi profile",
    time: "Just now",
    date: "2026-08-16",
    meta: "Reference DHA-88420115",
  },
  {
    id: "a2",
    kind: "login",
    title: "Signed in with biometrics",
    detail: "iPhone 15 Pro · Centurion, Gauteng",
    time: "12 minutes ago",
    date: "2026-08-16",
    meta: "IP 102.132.44.18",
  },
  {
    id: "a3",
    kind: "appointment",
    title: "Appointment booked with Capitec Bank",
    detail: "FICA document verification · Menlyn branch",
    time: "Today, 14:20",
    date: "2026-08-16",
    meta: "19 Aug 2026, 09:30",
  },
  {
    id: "a4",
    kind: "device",
    title: "New device linked",
    detail: "MacBook Air · lulaFi Web",
    time: "Today, 11:04",
    date: "2026-08-16",
    meta: "Linked via QR scan",
  },
  {
    id: "a5",
    kind: "form",
    title: "CIPC — Annual return submitted",
    detail: "The Boy Bass Media (Pty) Ltd · 7 fields prefilled",
    time: "Yesterday, 18:42",
    date: "2026-08-15",
    meta: "Reference CIPC-4471902",
  },
  {
    id: "a6",
    kind: "appointment",
    title: "Appointment confirmed with City of Tshwane",
    detail: "Municipal account query · Centurion office",
    time: "Yesterday, 16:10",
    date: "2026-08-15",
    meta: "21 Aug 2026, 11:00",
  },
  {
    id: "a7",
    kind: "login",
    title: "Signed in with OTP",
    detail: "iPhone 15 Pro · +27 83 902 7741",
    time: "Yesterday, 07:58",
    date: "2026-08-15",
    meta: "IP 102.132.44.18",
  },
  {
    id: "a8",
    kind: "device",
    title: "Device unlinked",
    detail: "Samsung A54 · removed from your account",
    time: "14 Aug 2026, 20:31",
    date: "2026-08-14",
  },
  {
    id: "a9",
    kind: "form",
    title: "SARS — Tax number confirmation submitted",
    detail: "5 fields prefilled from your lulaFi profile",
    time: "14 Aug 2026, 15:07",
    date: "2026-08-14",
    meta: "Reference SARS-0142668",
  },
  {
    id: "a10",
    kind: "login",
    title: "New sign-in from lulaFi Web",
    detail: "Chrome on macOS · Johannesburg, Gauteng",
    time: "14 Aug 2026, 11:22",
    date: "2026-08-14",
    meta: "IP 41.76.109.5",
  },
];

export const activityFilters = ["All", "Form fills", "Appointments", "Logins", "Devices"] as const;
export type ActivityFilter = (typeof activityFilters)[number];

export const filterToKind: Record<Exclude<ActivityFilter, "All">, ActivityKind> = {
  "Form fills": "form",
  Appointments: "appointment",
  Logins: "login",
  Devices: "device",
};

export const dayLabel = (date: string) => {
  if (date === "2026-08-16") return "Today";
  if (date === "2026-08-15") return "Yesterday";
  return new Date(date).toLocaleDateString("en-ZA", { day: "numeric", month: "long" });
};
