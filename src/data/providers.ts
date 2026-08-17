export type ProviderCategory =
  | "Banks"
  | "Municipalities"
  | "Government"
  | "Utilities"
  | "Insurance"
  | "Telecoms";

export type ServiceType =
  | "Applications"
  | "Verification"
  | "Payments & accounts"
  | "Permits & licences"
  | "Claims"
  | "Support & queries";

export type Eligibility =
  | "SA ID required"
  | "Proof of address"
  | "Proof of income"
  | "Business registration"
  | "Open to everyone";

export type ProviderForm = {
  id: string;
  name: string;
  fields: number;
  /** Field labels that lulaFi can prefill from the user profile */
  prefill: string[];
};

export type ServiceProvider = {
  id: string;
  name: string;
  initials: string;
  category: ProviderCategory;
  description: string;
  forms: number;
  verified?: boolean;
  serviceTypes: ServiceType[];
  province: string;
  city: string;
  eligibility: Eligibility[];
  /** Primary form used for deep links from lists and tiles */
  primaryForm: ProviderForm;
};

export const providerCategories: ProviderCategory[] = [
  "Banks",
  "Municipalities",
  "Government",
  "Utilities",
  "Insurance",
  "Telecoms",
];

export const serviceTypes: ServiceType[] = [
  "Applications",
  "Verification",
  "Payments & accounts",
  "Permits & licences",
  "Claims",
  "Support & queries",
];

export const eligibilityOptions: Eligibility[] = [
  "SA ID required",
  "Proof of address",
  "Proof of income",
  "Business registration",
  "Open to everyone",
];

export const provinces = [
  "Gauteng",
  "Western Cape",
  "North West",
  "KwaZulu-Natal",
  "Nationwide",
];

/** Profile values lulaFi uses to prefill forms */
/** Profile of the signed-in account: TheBoyBass */
export const userProfile: Record<string, string> = {
  "First Name": "The Boy",
  "Last Name": "Bass",
  "Full Name": "The Boy Bass",
  "Display Name": "TheBoyBass",
  "ID Number": "9503155018083",
  "Mobile Number": "+27 83 902 7741",
  "Email Address": "theboybass@lulafi.co.za",
  "Home Address": "14 Protea Road, Centurion, 0157",
  "Employer": "Lula Technologies",
  "Monthly Income": "R 32 400",
  "Account Number": "1801 2715 663",
  "Tax Number": "0142 668 391",
  "Company Name": "The Boy Bass Media (Pty) Ltd",
  "Meter Number": "MTR-88420115",
  "Policy Number": "POL-4471902",
};

export const serviceProviders: ServiceProvider[] = [
  // Banks
  { id: "capitec", name: "Capitec Bank", initials: "CB", category: "Banks", description: "Account opening, card replacement, FICA updates", forms: 6, verified: true, serviceTypes: ["Applications", "Verification", "Payments & accounts"], province: "Nationwide", city: "Menlyn", eligibility: ["SA ID required", "Proof of address"], primaryForm: { id: "capitec-fica", name: "FICA document verification", fields: 9, prefill: ["First Name", "Last Name", "ID Number", "Home Address", "Mobile Number"] } },
  { id: "fnb", name: "FNB", initials: "FNB", category: "Banks", description: "Personal accounts, loan applications, proof of banking", forms: 8, verified: true, serviceTypes: ["Applications", "Payments & accounts"], province: "Gauteng", city: "Sandton", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "fnb-loan", name: "Loan Application Form", fields: 13, prefill: ["First Name", "Last Name", "ID Number", "Employer", "Monthly Income", "Account Number"] } },
  { id: "absa", name: "Absa", initials: "AB", category: "Banks", description: "Home loan pre-approval, debit order disputes", forms: 5, verified: true, serviceTypes: ["Applications", "Support & queries"], province: "Gauteng", city: "Pretoria", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "absa-home", name: "Home loan pre-approval", fields: 11, prefill: ["Full Name", "ID Number", "Monthly Income", "Home Address"] } },
  { id: "standardbank", name: "Standard Bank", initials: "SB", category: "Banks", description: "Business banking, statement requests", forms: 7, verified: true, serviceTypes: ["Payments & accounts", "Verification"], province: "Nationwide", city: "Rosebank", eligibility: ["Business registration", "SA ID required"], primaryForm: { id: "sb-business", name: "Business account opening", fields: 12, prefill: ["Company Name", "Full Name", "ID Number", "Email Address"] } },
  { id: "tymebank", name: "TymeBank", initials: "TB", category: "Banks", description: "Digital onboarding and KYC verification", forms: 3, serviceTypes: ["Verification", "Applications"], province: "Nationwide", city: "Online", eligibility: ["SA ID required"], primaryForm: { id: "tyme-kyc", name: "Digital KYC onboarding", fields: 7, prefill: ["First Name", "Last Name", "ID Number", "Mobile Number"] } },

  // Municipalities
  { id: "tshwane", name: "City of Tshwane", initials: "COT", category: "Municipalities", description: "Municipal account renewal, rates clearance", forms: 9, verified: true, serviceTypes: ["Payments & accounts", "Permits & licences"], province: "Gauteng", city: "Pretoria", eligibility: ["Proof of address"], primaryForm: { id: "cot-renewal", name: "Municipal account renewal", fields: 10, prefill: ["Full Name", "ID Number", "Home Address", "Account Number"] } },
  { id: "joburg", name: "City of Johannesburg", initials: "COJ", category: "Municipalities", description: "Water and refuse queries, indigent applications", forms: 11, verified: true, serviceTypes: ["Support & queries", "Applications"], province: "Gauteng", city: "Johannesburg", eligibility: ["Proof of address", "Proof of income"], primaryForm: { id: "coj-indigent", name: "Indigent support application", fields: 14, prefill: ["Full Name", "ID Number", "Home Address", "Monthly Income"] } },
  { id: "ekurhuleni", name: "City of Ekurhuleni", initials: "EKU", category: "Municipalities", description: "Building plan submissions, meter registration", forms: 6, serviceTypes: ["Permits & licences", "Verification"], province: "Gauteng", city: "Germiston", eligibility: ["Proof of address"], primaryForm: { id: "eku-meter", name: "Meter registration", fields: 8, prefill: ["Full Name", "Home Address", "Meter Number"] } },
  { id: "kgetleng", name: "KgetlengRivier Municipality", initials: "KR", category: "Municipalities", description: "Community permit validation, refuse removal", forms: 4, serviceTypes: ["Permits & licences", "Support & queries"], province: "North West", city: "Koster", eligibility: ["Proof of address"], primaryForm: { id: "kr-permit", name: "Community permit validation", fields: 6, prefill: ["Full Name", "ID Number", "Home Address"] } },
  { id: "capetown", name: "City of Cape Town", initials: "CCT", category: "Municipalities", description: "Rates, permits and service connections", forms: 10, verified: true, serviceTypes: ["Payments & accounts", "Permits & licences"], province: "Western Cape", city: "Cape Town", eligibility: ["Proof of address"], primaryForm: { id: "cct-connection", name: "Service connection request", fields: 9, prefill: ["Full Name", "Home Address", "Mobile Number"] } },

  // Government
  { id: "cipc", name: "CIPC", initials: "CIPC", category: "Government", description: "Company registration, annual returns, name reservation", forms: 12, verified: true, serviceTypes: ["Applications", "Verification"], province: "Nationwide", city: "Pretoria", eligibility: ["SA ID required", "Business registration"], primaryForm: { id: "cipc-reg", name: "Company registration (CoR 14.1)", fields: 15, prefill: ["Full Name", "ID Number", "Company Name", "Email Address", "Home Address"] } },
  { id: "sars", name: "SARS", initials: "SARS", category: "Government", description: "Tax number registration, tax clearance certificates", forms: 8, verified: true, serviceTypes: ["Verification", "Applications"], province: "Nationwide", city: "Online", eligibility: ["SA ID required"], primaryForm: { id: "sars-clearance", name: "Tax clearance certificate", fields: 10, prefill: ["Full Name", "ID Number", "Tax Number", "Home Address"] } },
  { id: "nsfas", name: "NSFAS", initials: "NSFAS", category: "Government", description: "Bursary applications, appeals and status checks", forms: 7, verified: true, serviceTypes: ["Applications", "Support & queries"], province: "Nationwide", city: "Online", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "nsfas-apply", name: "Bursary application", fields: 16, prefill: ["First Name", "Last Name", "ID Number", "Monthly Income", "Home Address"] } },
  { id: "sassa", name: "SASSA", initials: "SASSA", category: "Government", description: "Grant applications and status enquiries", forms: 9, verified: true, serviceTypes: ["Applications", "Support & queries"], province: "Nationwide", city: "Soshanguve", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "sassa-grant", name: "Social grant application", fields: 13, prefill: ["Full Name", "ID Number", "Home Address", "Monthly Income"] } },
  { id: "dha", name: "Home Affairs", initials: "DHA", category: "Government", description: "ID, passport and birth certificate applications", forms: 14, verified: true, serviceTypes: ["Applications", "Verification"], province: "Nationwide", city: "Akasia", eligibility: ["SA ID required"], primaryForm: { id: "dha-id", name: "Smart ID application (DHA-9)", fields: 12, prefill: ["First Name", "Last Name", "ID Number", "Home Address", "Mobile Number"] } },
  { id: "labour", name: "Department of Employment & Labour", initials: "DEL", category: "Government", description: "UIF claims and employer registrations", forms: 5, serviceTypes: ["Claims", "Applications"], province: "Nationwide", city: "Pretoria", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "del-uif", name: "UIF claim (UI-2.8)", fields: 11, prefill: ["Full Name", "ID Number", "Employer", "Account Number"] } },

  // Utilities
  { id: "eskom", name: "Eskom Customer Care", initials: "ESK", category: "Utilities", description: "Meter readings, new connections, fault reports", forms: 6, verified: true, serviceTypes: ["Support & queries", "Payments & accounts"], province: "Nationwide", city: "Megawatt Park", eligibility: ["Proof of address"], primaryForm: { id: "esk-connect", name: "New connection request", fields: 9, prefill: ["Full Name", "Home Address", "Meter Number", "Mobile Number"] } },
  { id: "randwater", name: "Rand Water", initials: "RW", category: "Utilities", description: "Bulk supply queries and leak reporting", forms: 3, serviceTypes: ["Support & queries"], province: "Gauteng", city: "Glenvista", eligibility: ["Open to everyone"], primaryForm: { id: "rw-leak", name: "Leak report", fields: 6, prefill: ["Full Name", "Home Address", "Mobile Number"] } },

  // Insurance
  { id: "discovery", name: "Discovery", initials: "DIS", category: "Insurance", description: "Medical aid onboarding, claims submissions", forms: 7, verified: true, serviceTypes: ["Claims", "Applications"], province: "Gauteng", city: "Sandton", eligibility: ["SA ID required", "Proof of income"], primaryForm: { id: "dis-claim", name: "Medical claim submission", fields: 10, prefill: ["Full Name", "ID Number", "Policy Number", "Email Address"] } },
  { id: "oldmutual", name: "Old Mutual", initials: "OM", category: "Insurance", description: "Policy updates and beneficiary changes", forms: 4, serviceTypes: ["Support & queries", "Verification"], province: "Western Cape", city: "Pinelands", eligibility: ["SA ID required"], primaryForm: { id: "om-beneficiary", name: "Beneficiary change", fields: 8, prefill: ["Full Name", "ID Number", "Policy Number"] } },

  // Telecoms
  { id: "vodacom", name: "Vodacom", initials: "VOD", category: "Telecoms", description: "RICA registration, contract upgrades", forms: 5, verified: true, serviceTypes: ["Verification", "Applications"], province: "Gauteng", city: "Midrand", eligibility: ["SA ID required", "Proof of address"], primaryForm: { id: "vod-rica", name: "RICA registration", fields: 7, prefill: ["Full Name", "ID Number", "Home Address", "Mobile Number"] } },
  { id: "mtn", name: "MTN", initials: "MTN", category: "Telecoms", description: "SIM swaps and number porting", forms: 4, serviceTypes: ["Verification", "Support & queries"], province: "Nationwide", city: "Roodepoort", eligibility: ["SA ID required"], primaryForm: { id: "mtn-sim", name: "SIM swap request", fields: 6, prefill: ["Full Name", "ID Number", "Mobile Number"] } },
];

export const getProvider = (id?: string | null) =>
  serviceProviders.find(p => p.id === id);

/* ---------------- Geo / distance ---------------- */

export type LatLng = { lat: number; lng: number };

/** Approximate office coordinates per provider */
export const providerCoords: Record<string, LatLng> = {
  capitec: { lat: -25.7845, lng: 28.2765 },
  fnb: { lat: -26.1076, lng: 28.0567 },
  absa: { lat: -25.7479, lng: 28.2293 },
  standardbank: { lat: -26.1447, lng: 28.0416 },
  tymebank: { lat: -26.2041, lng: 28.0473 },
  tshwane: { lat: -25.7461, lng: 28.1881 },
  joburg: { lat: -26.2041, lng: 28.0473 },
  ekurhuleni: { lat: -26.2178, lng: 28.1672 },
  kgetleng: { lat: -25.8686, lng: 26.8967 },
  capetown: { lat: -33.9249, lng: 18.4241 },
  cipc: { lat: -25.7702, lng: 28.2299 },
  sars: { lat: -25.7566, lng: 28.226 },
  nsfas: { lat: -33.9165, lng: 18.4241 },
  sassa: { lat: -25.5399, lng: 28.1091 },
  dha: { lat: -25.6444, lng: 28.1063 },
  labour: { lat: -25.7482, lng: 28.1878 },
  eskom: { lat: -26.0742, lng: 27.9636 },
  randwater: { lat: -26.2947, lng: 28.0345 },
  discovery: { lat: -26.1052, lng: 28.0567 },
  oldmutual: { lat: -33.9384, lng: 18.5091 },
  vodacom: { lat: -25.9899, lng: 28.1265 },
  mtn: { lat: -26.1625, lng: 27.8725 },
};

/** Province reference points used when the user picks a location */
export const provinceCenters: Record<string, LatLng> = {
  Gauteng: { lat: -26.0, lng: 28.1 },
  "Western Cape": { lat: -33.9249, lng: 18.4241 },
  "North West": { lat: -25.8686, lng: 26.8967 },
  "KwaZulu-Natal": { lat: -29.8587, lng: 31.0218 },
  Nationwide: { lat: -26.0, lng: 28.1 },
};

/** Default "my location" used by the map (Centurion, matches the profile address) */
export const userLocation: LatLng = { lat: -25.8603, lng: 28.1894 };

export const distanceKm = (a: LatLng, b: LatLng) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export const providerDistanceKm = (providerId: string, from: LatLng) => {
  const c = providerCoords[providerId];
  return c ? distanceKm(from, c) : null;
};

/** Build a shareable deep link for a provider's primary form */
export const buildProviderLink = (providerId: string, formId?: string) => {
  const params = new URLSearchParams({ provider: providerId, screen: "form" });
  if (formId) params.set("form", formId);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};

export type Appointment = {
  id: string;
  provider: string;
  initials: string;
  title: string;
  ref: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  location: string;
  status: "Confirmed" | "Pending" | "Rescheduled";
};

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const appointments: Appointment[] = [
  { id: "a1", provider: "Home Affairs", initials: "DHA", title: "Smart ID collection", ref: "#LF-1048", date: iso(0), time: "09:30", location: "Akasia branch", status: "Confirmed" },
  { id: "a2", provider: "CIPC", initials: "CIPC", title: "Company registration review", ref: "#LF-1032", date: iso(2), time: "11:00", location: "Online call", status: "Pending" },
  { id: "a3", provider: "City of Tshwane", initials: "COT", title: "Municipal account renewal", ref: "#LF-0812", date: iso(5), time: "14:15", location: "Centurion office", status: "Confirmed" },
  { id: "a4", provider: "Capitec Bank", initials: "CB", title: "FICA document verification", ref: "#LF-0790", date: iso(9), time: "10:00", location: "Menlyn branch", status: "Rescheduled" },
  { id: "a5", provider: "SASSA", initials: "SASSA", title: "Grant status interview", ref: "#LF-0755", date: iso(14), time: "08:45", location: "Soshanguve office", status: "Confirmed" },
];

/* ---------------- Per-provider form catalogue ---------------- */

/** Extra forms generated per service type so every provider has a full catalogue */
const serviceTypeForms: Record<ServiceType, { suffix: string; fields: number; prefill: string[] }> = {
  Applications: { suffix: "New application", fields: 11, prefill: ["First Name", "Last Name", "ID Number", "Home Address", "Mobile Number"] },
  Verification: { suffix: "Identity verification", fields: 7, prefill: ["Full Name", "ID Number", "Mobile Number"] },
  "Payments & accounts": { suffix: "Account and payment update", fields: 9, prefill: ["Full Name", "ID Number", "Account Number", "Email Address"] },
  "Permits & licences": { suffix: "Permit / licence request", fields: 10, prefill: ["Full Name", "ID Number", "Home Address"] },
  Claims: { suffix: "Claim submission", fields: 12, prefill: ["Full Name", "ID Number", "Policy Number", "Email Address"] },
  "Support & queries": { suffix: "Support query", fields: 5, prefill: ["Full Name", "Mobile Number", "Email Address"] },
};

export type ProviderFormEntry = ProviderForm & {
  category: ServiceType;
  description: string;
  updated: string;
};

const formDates = ["2/19/2026", "3/1/2026", "1/28/2026", "2/6/2026", "3/9/2026", "12/14/2025"];

/** All forms available to fill for a provider (primary form first) */
export const getProviderForms = (providerId: string): ProviderFormEntry[] => {
  const provider = getProvider(providerId);
  if (!provider) return [];

  const primary: ProviderFormEntry = {
    ...provider.primaryForm,
    category: provider.serviceTypes[0] ?? "Applications",
    description: `Most requested ${provider.name} form. lulaFi prefills ${provider.primaryForm.prefill.length} of the ${provider.primaryForm.fields} fields from your profile.`,
    updated: formDates[0],
  };

  const extras = provider.serviceTypes.map((type, i) => {
    const tpl = serviceTypeForms[type];
    return {
      id: `${provider.id}-${type.toLowerCase().replace(/[^a-z]+/g, "-")}`,
      name: `${provider.name} ${tpl.suffix}`,
      fields: tpl.fields,
      prefill: tpl.prefill,
      category: type,
      description: `${type} form handled by ${provider.name}, ${provider.city}.`,
      updated: formDates[(i + 1) % formDates.length],
    } as ProviderFormEntry;
  });

  return [primary, ...extras];
};

export const getProviderForm = (providerId?: string | null, formId?: string | null) => {
  if (!providerId) return undefined;
  const forms = getProviderForms(providerId);
  return forms.find(f => f.id === formId) ?? forms[0];
};
