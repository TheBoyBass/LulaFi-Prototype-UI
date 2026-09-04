export type SubmissionStatus = "New" | "In Progress" | "Overdue" | "Closed";

export interface ProviderSubmission {
  id: string;
  ref: string;
  formName: string;
  submittedBy: string;
  receivedDate: string;
  receivedTime: string;
  status: SubmissionStatus;
  priority: "Normal" | "High";
  assignedTo: string | null;
  slaHours?: number;
  answers: { label: string; value: string }[];
}

export const providerAccount = {
  name: "123 Examples",
  role: "Provider Administrator",
  session: "Active Session",
  initials: "123",
};

export const providerStats = [
  { label: "New submissions", value: 12 },
  { label: "Unassigned", value: 4 },
  { label: "SLA due", value: 3 },
  { label: "Unread LulaSEMs", value: 6 },
];

export const providerSubmissions: ProviderSubmission[] = [
  {
    id: "s1043",
    ref: "REF-1043",
    formName: "Municipal account renewal",
    submittedBy: "Bassie \"The Boy Bass\" Sibeko",
    receivedDate: "14 Aug 2026",
    receivedTime: "11:12",
    status: "New",
    priority: "Normal",
    assignedTo: null,
    answers: [
      { label: "Account holder", value: "Bassie Sibeko" },
      { label: "Municipal account number", value: "3004 887 512" },
      { label: "Service address", value: "148 Rooihuiskraal Rd, Akasia, Pretoria" },
      { label: "Ward", value: "Ward 2, Tshwane" },
      { label: "Services", value: "Water, refuse, electricity" },
      { label: "Meter number", value: "TSH-889021" },
      { label: "Contact number", value: "+27 82 445 9012" },
      { label: "Email", value: "theboybass@lulafi.co.za" },
      { label: "Billing preference", value: "Email statement" },
      { label: "Renewal period", value: "12 months" },
    ],
  },
  {
    id: "s1042",
    ref: "REF-1042",
    formName: "Add New User",
    submittedBy: "Reg Courtenay",
    receivedDate: "14 Aug 2026",
    receivedTime: "10:36",
    status: "New",
    priority: "Normal",
    assignedTo: null,
    answers: [
      { label: "First name", value: "Reg" },
      { label: "Last name", value: "Courtenay" },
      { label: "ID number", value: "8203155719084" },
      { label: "Role requested", value: "Front desk agent" },
      { label: "Department", value: "Client services" },
      { label: "Contact email", value: "reg.courtenay@example.co.za" },
      { label: "Contact number", value: "+27 83 771 2204" },
      { label: "Reason for request", value: "New provider user access for walk-in desk" },
      { label: "Manager approval", value: "Brian Hubnet" },
      { label: "Start date", value: "18 Aug 2026" },
    ],
  },
  {
    id: "s1041",
    ref: "REF-1041",
    formName: "Membership Application",
    submittedBy: "Thato Mokoena",
    receivedDate: "14 Aug 2026",
    receivedTime: "09:22",
    status: "Overdue",
    priority: "High",
    assignedTo: "Support Team",
    slaHours: 2,
    answers: [
      { label: "Full name", value: "Thato Mokoena" },
      { label: "ID number", value: "9107085422086" },
      { label: "Membership type", value: "Individual" },
      { label: "Residential address", value: "27 Bosman St, Pretoria Central" },
      { label: "Employment status", value: "Self-employed" },
      { label: "Monthly contribution", value: "R 320" },
      { label: "Payment method", value: "Debit order" },
      { label: "Bank", value: "Capitec Bank" },
      { label: "Contact number", value: "+27 71 908 4416" },
      { label: "Email", value: "thato.mokoena@example.co.za" },
      { label: "Consent to credit check", value: "Yes" },
    ],
  },
  {
    id: "s1040",
    ref: "REF-1040",
    formName: "Service Request",
    submittedBy: "Lerato Nkosi",
    receivedDate: "13 Aug 2026",
    receivedTime: "16:05",
    status: "In Progress",
    priority: "Normal",
    assignedTo: "Brian Hubnet",
    answers: [
      { label: "Service", value: "Water meter reading dispute" },
      { label: "Account number", value: "3001 442 118" },
      { label: "Address", value: "12 Church St, Pretoria" },
      { label: "Meter number", value: "TSH-441207" },
      { label: "Current reading", value: "04418 kL" },
      { label: "Issue description", value: "Bill shows 3x usual usage, no leak found" },
      { label: "Preferred date", value: "20 Aug 2026" },
      { label: "Preferred time", value: "Morning (08:00 – 12:00)" },
      { label: "Contact number", value: "+27 82 330 1195" },
      { label: "Email", value: "lerato.nkosi@example.co.za" },
    ],
  },
  {
    id: "s1039",
    ref: "REF-1039",
    formName: "Membership Application",
    submittedBy: "Reg Courtenay",
    receivedDate: "3 Aug 2026",
    receivedTime: "11:47",
    status: "Closed",
    priority: "Normal",
    assignedTo: "Mpho Dlamini",
    answers: [
      { label: "Full name", value: "Reg Courtenay" },
      { label: "ID number", value: "8203155719084" },
      { label: "Membership type", value: "Family" },
      { label: "Dependants", value: "2" },
      { label: "Residential address", value: "5 Jasmyn Ave, Centurion" },
      { label: "Monthly contribution", value: "R 610" },
      { label: "Payment method", value: "EFT" },
      { label: "Contact email", value: "reg.courtenay@example.co.za" },
      { label: "Outcome", value: "Approved · letter issued 3 Aug 2026" },
    ],
  },
  {
    id: "s1037",
    ref: "REF-1037",
    formName: "Community Permit Validation",
    submittedBy: "Shieda Naidoo",
    receivedDate: "12 Aug 2026",
    receivedTime: "09:02",
    status: "In Progress",
    priority: "High",
    assignedTo: "Ayanda Sithole",
    answers: [
      { label: "Applicant name", value: "Shieda Naidoo" },
      { label: "Permit type", value: "Community trading permit" },
      { label: "Trading location", value: "Marabastad taxi rank, stall 14" },
      { label: "Trading days", value: "Monday – Saturday" },
      { label: "Business name", value: "Naidoo Fresh Produce" },
      { label: "Proof of address", value: "Municipal bill · Jul 2026" },
      { label: "Health certificate", value: "Valid to 31 Mar 2027" },
      { label: "Contact number", value: "+27 84 220 7781" },
      { label: "Email", value: "shieda.naidoo@example.co.za" },
    ],
  },
  {
    id: "s1038",
    ref: "REF-1038",
    formName: "Account Closure",
    submittedBy: "Nandi Khumalo",
    receivedDate: "12 Aug 2026",
    receivedTime: "08:14",
    status: "Closed",
    priority: "Normal",
    assignedTo: "Support Team",
    answers: [
      { label: "Account holder", value: "Nandi Khumalo" },
      { label: "Account number", value: "883 221 004" },
      { label: "Reason", value: "Relocating out of province" },
      { label: "Final reading", value: "01192 kWh" },
      { label: "Closure date", value: "31 Aug 2026" },
      { label: "Refund method", value: "EFT to Nedbank •••• 8841" },
      { label: "Contact number", value: "+27 76 114 3390" },
      { label: "Email", value: "nandi.khumalo@example.co.za" },
    ],
  },
];


export const providerActivity = [
  { id: "a1", title: "Add New User", detail: "Reg Courtenay submitted REF-1042", time: "10:36", type: "form" as const },
  { id: "a2", title: "Membership Application", detail: "Thato Mokoena submitted REF-1041", time: "09:22", type: "form" as const },
  { id: "a3", title: "Status updated", detail: "Brian moved REF-1040 to In Progress", time: "08:58", type: "status" as const },
  { id: "a4", title: "Staff sign-in", detail: "Mpho Dlamini signed in on Chrome · Pretoria", time: "08:31", type: "login" as const },
  { id: "a5", title: "New LulaSEM", detail: "Shieda started a provider enquiry", time: "Yesterday", type: "message" as const },
  { id: "a6", title: "Group created", detail: "Service Desk Team · 2 members", time: "Yesterday", type: "group" as const },
];

export type SemKind = "FORM" | "PROVIDER" | "GROUP";

export interface ProviderSemThread {
  id: string;
  kind: SemKind;
  name: string;
  subtitle: string;
  preview: string;
  time: string;
  unread: number;
}

export const providerSemThreads: ProviderSemThread[] = [
  { id: "t1", kind: "FORM", name: "Reg Courtenay", subtitle: "Add New User · REF-1042", preview: "Is this request being processed?", time: "10:41", unread: 2 },
  { id: "t2", kind: "PROVIDER", name: "Shieda", subtitle: "General provider enquiry", preview: "Good morning.", time: "10:40", unread: 0 },
  { id: "t3", kind: "GROUP", name: "Service Desk Team", subtitle: "Internal processing group", preview: "Brian assigned REF-1041", time: "09:22", unread: 0 },
  { id: "t4", kind: "FORM", name: "Lerato Nkosi", subtitle: "Service Request · REF-1040", preview: "Thanks, I'll wait for the technician.", time: "Yesterday", unread: 0 },
];

export const providerStaff = [
  { id: "st1", name: "Brian Hubnet", role: "Support Agent", initials: "BH" },
  { id: "st2", name: "Mpho Dlamini", role: "Provider Administrator", initials: "MD" },
  { id: "st3", name: "Lerato Nkosi", role: "Support Agent", initials: "LN" },
  { id: "st4", name: "Ayanda Sithole", role: "Forms Reviewer", initials: "AS" },
];

export const getSubmission = (id: string | null) =>
  providerSubmissions.find(s => s.id === id) ?? providerSubmissions[0];

/** Grouped LulaSEM view: conversations grouped by the client (or internal team) */
export type SemStatus = "PENDING" | "APPROVED" | "UNDER REVIEW" | "IN PROGRESS";

export interface ProviderSemRow extends ProviderSemThread {
  ref?: string;
  status?: SemStatus;
  online?: boolean;
}

export interface ProviderSemGroup {
  id: string;
  initials: string;
  name: string;
  type: string;
  rows: ProviderSemRow[];
}

export const providerSemGroups: ProviderSemGroup[] = [
  {
    id: "g-reg",
    initials: "RC",
    name: "Reg Courtenay",
    type: "Client",
    rows: [
      { id: "t2b", kind: "PROVIDER", name: "General chat", subtitle: "Account and service enquiries", preview: "Morning, can you assist with my profile?", time: "11:04", unread: 1, online: true },
      { id: "t1", kind: "FORM", name: "Add New User", subtitle: "Form conversation", ref: "REF-1042", status: "PENDING", preview: "Is this request being processed?", time: "10:41", unread: 2 },
      { id: "t1b", kind: "FORM", name: "Membership Application", subtitle: "Form conversation", ref: "REF-1039", status: "APPROVED", preview: "Thanks, received the approval letter.", time: "3 Aug", unread: 0 },
    ],
  },
  {
    id: "g-shieda",
    initials: "SH",
    name: "Shieda Naidoo",
    type: "Client",
    rows: [
      { id: "t2", kind: "PROVIDER", name: "General chat", subtitle: "General provider enquiry", preview: "Good morning.", time: "10:40", unread: 0, online: true },
      { id: "t2c", kind: "FORM", name: "Community Permit Validation", subtitle: "Form conversation", ref: "REF-1037", status: "UNDER REVIEW", preview: "Documents uploaded for review.", time: "09:15", unread: 1 },
    ],
  },
  {
    id: "g-lerato",
    initials: "LN",
    name: "Lerato Nkosi",
    type: "Client",
    rows: [
      { id: "t4", kind: "FORM", name: "Service Request", subtitle: "Form conversation", ref: "REF-1040", status: "IN PROGRESS", preview: "Thanks, I'll wait for the technician.", time: "Yesterday", unread: 0 },
      { id: "t4b", kind: "PROVIDER", name: "General chat", subtitle: "Account and service enquiries", preview: "Is the technician still coming today?", time: "Yesterday", unread: 2 },
    ],
  },
  {
    id: "g-thato",
    initials: "TM",
    name: "Thato Mokoena",
    type: "Client",
    rows: [
      { id: "t5", kind: "FORM", name: "Membership Application", subtitle: "Form conversation", ref: "REF-1041", status: "PENDING", preview: "Submitted, awaiting confirmation.", time: "09:22", unread: 0 },
    ],
  },
  {
    id: "g-team",
    initials: "SDT",
    name: "Service Desk Team",
    type: "Internal group",
    rows: [
      { id: "t3", kind: "GROUP", name: "Service Desk Team", subtitle: "Internal processing group", preview: "Brian assigned REF-1041", time: "09:22", unread: 0 },
      { id: "t3b", kind: "GROUP", name: "Forms Reviewers", subtitle: "Internal review group", preview: "Ayanda: 3 submissions left in queue.", time: "08:40", unread: 1 },
    ],
  },
];

export const semStatusStyles: Record<string, string> = {
  PENDING: "text-warning",
  APPROVED: "text-success",
  "UNDER REVIEW": "text-info",
  "IN PROGRESS": "text-info",
};

export const getSubmissionByRef = (ref?: string) =>
  ref ? providerSubmissions.find(s => s.ref === ref) ?? null : null;
