import { ScreenId } from "@/types/screens";

export type ConversationKind = "provider" | "form";
export type ConversationStatus = "PENDING" | "APPROVED" | "UNDER REVIEW";

export type Conversation = {
  id: string;
  kind: ConversationKind;
  title: string;
  ref?: string;
  status?: ConversationStatus;
  preview: string;
  time: string;
  unread: number;
  online?: boolean;
  screen: ScreenId;
};

export type ProviderGroup = {
  id: string;
  initials: string;
  name: string;
  type: string;
  rows: Conversation[];
};

export const providerGroups: ProviderGroup[] = [
  {
    id: "nsfas",
    initials: "NSFAS",
    name: "123_Examples",
    type: "Government portal",
    rows: [
      {
        id: "nsfas-provider",
        kind: "provider",
        title: "Provider conversation",
        preview: "Ask us anything about your account here.",
        time: "11:02",
        unread: 1,
        online: true,
        screen: "convo",
      },
      {
        id: "nsfas-lf1048",
        kind: "form",
        title: "Add New User",
        ref: "#LF-1048",
        status: "PENDING",
        preview: "We will confirm within two working days.",
        time: "09:20",
        unread: 2,
        screen: "mf",
      },
      {
        id: "nsfas-lf0991",
        kind: "form",
        title: "Membership Application",
        ref: "#LF-0991",
        status: "APPROVED",
        preview: "Your membership has been approved.",
        time: "3 Aug",
        unread: 0,
        screen: "mf",
      },
    ],
  },
  {
    id: "kgetleng",
    initials: "KR",
    name: "KgetlengRivier Municipality",
    type: "Municipality",
    rows: [
      {
        id: "kr-provider",
        kind: "provider",
        title: "Provider conversation",
        preview: "Our permit desk is open until 15:30.",
        time: "07 Aug",
        unread: 0,
        screen: "convo",
      },
      {
        id: "kr-lf0873",
        kind: "form",
        title: "Community Permit Validation",
        ref: "#LF-0873",
        status: "UNDER REVIEW",
        preview: "Documents received, review in progress.",
        time: "05 Aug",
        unread: 1,
        screen: "mf",
      },
    ],
  },
  {
    id: "tshwane",
    initials: "COT",
    name: "City of Tshwane",
    type: "Municipality",
    rows: [
      {
        id: "cot-provider",
        kind: "provider",
        title: "Provider conversation",
        preview: "Your municipal account renewal is due.",
        time: "04 Aug",
        unread: 2,
        screen: "convo",
      },
      {
        id: "cot-lf0812",
        kind: "form",
        title: "Municipal Account Renewal",
        ref: "#LF-0812",
        status: "PENDING",
        preview: "Upload your latest proof of residence.",
        time: "02 Aug",
        unread: 0,
        screen: "mf",
      },
    ],
  },
  {
    id: "sassa",
    initials: "SASSA",
    name: "Social Relief Agency",
    type: "Government agency",
    rows: [
      {
        id: "sassa-provider",
        kind: "provider",
        title: "Provider conversation",
        preview: "Grant payment dates for August are out.",
        time: "01 Aug",
        unread: 0,
        screen: "convo",
      },
      {
        id: "sassa-lf0755",
        kind: "form",
        title: "Grant Status Enquiry",
        ref: "#LF-0755",
        status: "UNDER REVIEW",
        preview: "Your enquiry is with the assessment team.",
        time: "29 Jul",
        unread: 3,
        screen: "mf",
      },
    ],
  },
  {
    id: "eskom",
    initials: "ESK",
    name: "Eskom Customer Care",
    type: "Utility",
    rows: [
      {
        id: "eskom-provider",
        kind: "provider",
        title: "Provider conversation",
        preview: "Loadshedding schedule updated for your area.",
        time: "27 Jul",
        unread: 0,
        screen: "convo",
      },
      {
        id: "eskom-lf0701",
        kind: "form",
        title: "Meter Reading Submission",
        ref: "#LF-0701",
        status: "APPROVED",
        preview: "Reading captured, invoice adjusted.",
        time: "24 Jul",
        unread: 0,
        screen: "mf",
      },
    ],
  },
];

export const statusStyles: Record<string, string> = {
  PENDING: "text-warning",
  APPROVED: "text-success",
  "UNDER REVIEW": "text-info",
};

/** Encrypted-messaging contacts on the user's account */
export type SemContact = {
  id: string;
  name: string;
  initials: string;
  role: string;
  online?: boolean;
};

export const semContacts: SemContact[] = [
  { id: "c-thabo", name: "Thabo Mokoena", initials: "TM", role: "Business partner", online: true },
  { id: "c-lerato", name: "Lerato Dlamini", initials: "LD", role: "Accountant" },
  { id: "c-sipho", name: "Sipho Ndlovu", initials: "SN", role: "Broker", online: true },
  { id: "c-naledi", name: "Naledi Khumalo", initials: "NK", role: "Family" },
];
