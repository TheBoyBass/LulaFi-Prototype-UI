export type FilledFormStatus = "Submitted" | "In review" | "Approved" | "Action needed" | "Draft";

export type FilledForm = {
  id: string;
  providerId: string;
  provider: string;
  formName: string;
  ref: string;
  status: FilledFormStatus;
  submittedAt: string; // ISO yyyy-mm-dd
  fields: number;
  attachments: number;
  note: string;
  attachmentNames: string[];
  answers: { label: string; value: string }[];
};

const today = new Date();
const iso = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

export const filledForms: FilledForm[] = [
  {
    id: "f1",
    providerId: "dha",
    provider: "Home Affairs",
    formName: "Smart ID application (DHA-9)",
    ref: "#LF-1048",
    status: "Approved",
    submittedAt: iso(2),
    fields: 12,
    attachments: 3,
    note: "Collection booked at Akasia branch",
    attachmentNames: ["ID photo.jpg", "Birth certificate.pdf", "Proof of address.pdf"],
    answers: [
      { label: "Full name", value: "Bassie \"The Boy Bass\" Sibeko" },
      { label: "ID number", value: "9604125800081" },
      { label: "Date of birth", value: "12 April 1996" },
      { label: "Mobile number", value: "+27 82 445 9012" },
      { label: "Email", value: "theboybass@lulafi.co.za" },
      { label: "Residential address", value: "148 Rooihuiskraal Rd, Akasia, Pretoria" },
      { label: "Province", value: "Gauteng" },
      { label: "Application type", value: "First issue smart ID" },
      { label: "Collection branch", value: "DHA Akasia" },
      { label: "Marital status", value: "Single" },
      { label: "Preferred contact", value: "WhatsApp" },
      { label: "Consent to share ID data", value: "Yes" },
    ],
  },
  {
    id: "f2",
    providerId: "cipc",
    provider: "CIPC",
    formName: "Company registration (CoR 14.1)",
    ref: "#LF-1032",
    status: "In review",
    submittedAt: iso(5),
    fields: 15,
    attachments: 4,
    note: "Name reservation under assessment",
    attachmentNames: ["CoR 14.1 signed.pdf", "Name reservation.pdf", "Director ID.jpg", "Address proof.pdf"],
    answers: [
      { label: "Proposed company name", value: "Bass Digital Studio (Pty) Ltd" },
      { label: "Alternative name", value: "BassWorks Media" },
      { label: "Company type", value: "Private company (Pty) Ltd" },
      { label: "Financial year end", value: "February" },
      { label: "Registered address", value: "148 Rooihuiskraal Rd, Akasia, Pretoria" },
      { label: "Director full name", value: "Bassie Sibeko" },
      { label: "Director ID number", value: "9604125800081" },
      { label: "Director email", value: "theboybass@lulafi.co.za" },
      { label: "Contact number", value: "+27 82 445 9012" },
      { label: "Number of directors", value: "1" },
      { label: "Authorised shares", value: "1 000" },
      { label: "Main business activity", value: "Media production" },
      { label: "SIC code", value: "5911" },
      { label: "Auditor appointed", value: "No" },
      { label: "Consent to CIPC verification", value: "Yes" },
    ],
  },
  {
    id: "f3",
    providerId: "capitec",
    provider: "Capitec Bank",
    formName: "FICA document verification",
    ref: "#LF-0790",
    status: "Action needed",
    submittedAt: iso(9),
    fields: 9,
    attachments: 1,
    note: "Proof of address older than 3 months",
    attachmentNames: ["Bank statement Jul.pdf"],
    answers: [
      { label: "Account holder", value: "Bassie Sibeko" },
      { label: "Account number", value: "•••• 4471" },
      { label: "ID number", value: "9604125800081" },
      { label: "Mobile number", value: "+27 82 445 9012" },
      { label: "Email", value: "theboybass@lulafi.co.za" },
      { label: "Residential address", value: "148 Rooihuiskraal Rd, Akasia, Pretoria" },
      { label: "Source of income", value: "Freelance media work" },
      { label: "Monthly income", value: "R 28 500" },
      { label: "Proof of address type", value: "Bank statement" },
    ],
  },
  {
    id: "f4",
    providerId: "tshwane",
    provider: "City of Tshwane",
    formName: "Municipal account renewal",
    ref: "#LF-0812",
    status: "Submitted",
    submittedAt: iso(12),
    fields: 10,
    attachments: 2,
    note: "Awaiting municipal reference number",
    attachmentNames: ["Municipal bill.pdf", "Lease agreement.pdf"],
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
    id: "f5",
    providerId: "sars",
    provider: "SARS",
    formName: "Tax clearance certificate",
    ref: "#LF-0741",
    status: "Approved",
    submittedAt: iso(21),
    fields: 10,
    attachments: 2,
    note: "Certificate valid for 12 months",
    attachmentNames: ["IRP5 2025.pdf", "Bank confirmation.pdf"],
    answers: [
      { label: "Taxpayer name", value: "Bassie Sibeko" },
      { label: "Tax reference number", value: "0148 552 913" },
      { label: "ID number", value: "9604125800081" },
      { label: "Tax year", value: "2025/2026" },
      { label: "Purpose of certificate", value: "Tender application" },
      { label: "Annual income declared", value: "R 342 000" },
      { label: "Outstanding returns", value: "None" },
      { label: "Banking details verified", value: "Yes" },
      { label: "Email", value: "theboybass@lulafi.co.za" },
      { label: "Contact number", value: "+27 82 445 9012" },
    ],
  },
  {
    id: "f6",
    providerId: "labour",
    provider: "Department of Employment & Labour",
    formName: "UIF claim (UI-2.8)",
    ref: "#LF-0688",
    status: "Draft",
    submittedAt: iso(28),
    fields: 11,
    attachments: 0,
    note: "4 fields left to complete",
    attachmentNames: [],
    answers: [
      { label: "Claimant name", value: "Bassie Sibeko" },
      { label: "ID number", value: "9604125800081" },
      { label: "Last employer", value: "Kaleo Media (Pty) Ltd" },
      { label: "Employment end date", value: "Not completed" },
      { label: "Reason for claim", value: "Contract ended" },
      { label: "Bank account for payout", value: "Not completed" },
      { label: "Contact number", value: "+27 82 445 9012" },
      { label: "Email", value: "theboybass@lulafi.co.za" },
      { label: "UIF reference", value: "Not completed" },
      { label: "Declaration signed", value: "Not completed" },
      { label: "Supporting documents", value: "Not uploaded" },
    ],
  },
];

export const formStatuses: FilledFormStatus[] = [
  "Submitted",
  "In review",
  "Approved",
  "Action needed",
  "Draft",
];

export const statusVariant: Record<
  FilledFormStatus,
  "success" | "warning" | "error" | "info" | "neutral"
> = {
  Approved: "success",
  "In review": "info",
  Submitted: "info",
  "Action needed": "warning",
  Draft: "neutral",
};

export const formatFormDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
