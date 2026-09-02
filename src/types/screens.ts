export type ScreenId =
  | "splash" | "ob1" | "ob2" | "ob3"
  | "signup" | "otp" | "name"
  | "home" | "activity"
  | "svc" | "org" | "consent" | "pinauth"
  | "form" | "mf" | "fdetail" | "qr"
  | "convo" | "settings"
  | "psearch" | "cal" | "market";

export type ProviderScreenId =
  | "pdash" | "pactivity" | "psem" | "pconvo" | "pgroup"
  | "pinbox" | "psubmission" | "pupdate" | "psettings";

export type AppMode = "client" | "provider";
