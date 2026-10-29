import { providerSemGroups, ProviderSemGroup, ProviderSemRow, providerStaff } from "@/data/provider";

export interface SemMember {
  id: string;
  name: string;
  handle: string;
  role: string;
  initials: string;
}

export interface SemMessage {
  id: string;
  author: string;
  authorInitials: string;
  side: "in" | "out";
  text: string;
  time: string;
  system?: boolean;
  delivered?: boolean;
}

export interface SemThreadContext {
  row: ProviderSemRow;
  group: ProviderSemGroup;
  /** Mentionable people: internal staff for group threads, staff + client for 1:1 threads */
  members: SemMember[];
  messages: SemMessage[];
  /** Linked submission for FORM conversations */
  submissionRef?: string;
}

const handleFor = (name: string) => name.split(" ")[0].toLowerCase();

export const staffMembers: SemMember[] = providerStaff.map(s => ({
  id: s.id,
  name: s.name,
  handle: handleFor(s.name),
  role: s.role,
  initials: s.initials,
}));

/** Seeded transcripts so the dev team can see the expected structure per chat type */
const transcripts: Record<string, SemMessage[]> = {
  // General (client <-> provider) chats
  t2b: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "General chat · end-to-end encrypted", time: "10:58" },
    { id: "m2", author: "Reg Courtenay", authorInitials: "RC", side: "in", text: "Morning, can you assist with my profile?", time: "11:04" },
    { id: "m3", author: "You", authorInitials: "MD", side: "out", text: "Morning Reg, happy to help. What needs updating?", time: "11:06", delivered: true },
  ],
  t2: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "General chat · end-to-end encrypted", time: "10:39" },
    { id: "m2", author: "Shieda Naidoo", authorInitials: "SH", side: "in", text: "Good morning.", time: "10:40" },
  ],
  t4b: [
    { id: "m1", author: "Lerato Nkosi", authorInitials: "LN", side: "in", text: "Is the technician still coming today?", time: "16:22" },
  ],
  // Form conversations
  t1: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Form conversation linked to REF-1042 · Add New User", time: "10:36" },
    { id: "m2", author: "Reg Courtenay", authorInitials: "RC", side: "in", text: "Is this request being processed?", time: "10:41" },
    { id: "m3", author: "You", authorInitials: "MD", side: "out", text: "Yes, the request has been assigned to our Support Team.", time: "10:42", delivered: true },
  ],
  t1b: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Form conversation linked to REF-1039 · Membership Application", time: "3 Aug" },
    { id: "m2", author: "You", authorInitials: "MD", side: "out", text: "Your application has been approved, the letter is attached.", time: "3 Aug", delivered: true },
    { id: "m3", author: "Reg Courtenay", authorInitials: "RC", side: "in", text: "Thanks, received the approval letter.", time: "3 Aug" },
  ],
  t2c: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Form conversation linked to REF-1037 · Community Permit Validation", time: "09:02" },
    { id: "m2", author: "Shieda Naidoo", authorInitials: "SH", side: "in", text: "Documents uploaded for review.", time: "09:15" },
  ],
  t4: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Form conversation linked to REF-1040 · Service Request", time: "Yesterday" },
    { id: "m2", author: "You", authorInitials: "MD", side: "out", text: "A technician has been scheduled for 20 Aug.", time: "Yesterday", delivered: true },
    { id: "m3", author: "Lerato Nkosi", authorInitials: "LN", side: "in", text: "Thanks, I'll wait for the technician.", time: "Yesterday" },
  ],
  t5: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Form conversation linked to REF-1041 · Membership Application", time: "09:20" },
    { id: "m2", author: "Thato Mokoena", authorInitials: "TM", side: "in", text: "Submitted, awaiting confirmation.", time: "09:22" },
  ],
  // Internal group / team threads (mentions)
  t3: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Internal group · visible to provider staff only", time: "08:55" },
    { id: "m2", author: "Brian Hubnet", authorInitials: "BH", side: "in", text: "@mpho assigned REF-1041 to the Support Team.", time: "09:22" },
    { id: "m3", author: "You", authorInitials: "MD", side: "out", text: "Thanks @brian, I'll review the SLA today.", time: "09:24", delivered: true },
  ],
  t3b: [
    { id: "m1", author: "System", authorInitials: "", side: "in", system: true, text: "Internal group · visible to provider staff only", time: "08:30" },
    { id: "m2", author: "Ayanda Sithole", authorInitials: "AS", side: "in", text: "@team 3 submissions left in queue.", time: "08:40" },
  ],
};

const clientMember = (group: ProviderSemGroup): SemMember => ({
  id: `client-${group.id}`,
  name: group.name,
  handle: handleFor(group.name),
  role: "Client",
  initials: group.initials,
});

const teamMember: SemMember = {
  id: "team",
  name: "Everyone",
  handle: "team",
  role: "Notify the whole group",
  initials: "@",
};

export const findSemThread = (id: string | null): SemThreadContext => {
  const fallbackGroup = providerSemGroups[0];
  let group = fallbackGroup;
  let row = fallbackGroup.rows[0];

  for (const g of providerSemGroups) {
    const match = g.rows.find(r => r.id === id);
    if (match) {
      group = g;
      row = match;
      break;
    }
  }

  const members =
    row.kind === "GROUP"
      ? [teamMember, ...staffMembers]
      : [...staffMembers, clientMember(group)];

  return {
    row,
    group,
    members,
    messages: transcripts[row.id] ?? [],
    submissionRef: row.ref,
  };
};

export const kindLabel = (kind: ProviderSemRow["kind"]) =>
  kind === "FORM" ? "FORM" : kind === "GROUP" ? "INTERNAL GROUP" : "GENERAL";
