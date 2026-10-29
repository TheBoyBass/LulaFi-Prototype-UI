import { providerGroups, Conversation, ProviderGroup } from "@/data/lulasem";

export interface ClientMessage {
  id: string;
  author: string;
  side: "in" | "out";
  text: string;
  time: string;
  system?: boolean;
  delivered?: boolean;
}

export interface ClientThread {
  row: Conversation;
  group: ProviderGroup;
  messages: ClientMessage[];
}

/**
 * Extra context messages per conversation so each thread reads like a real
 * transcript. The final incoming message always mirrors the LulaSEM preview.
 */
const leadIns: Record<string, { side: "in" | "out"; text: string }[]> = {
  "nsfas-provider": [
    { side: "out", text: "Hi, I need help updating my account details." },
    { side: "in", text: "Hello TheBoyBass, our support desk is online." },
  ],
  "nsfas-lf1048": [
    { side: "out", text: "I have submitted the Add New User form, ref #LF-1048." },
    { side: "in", text: "Received. The request is queued with our support team." },
  ],
  "nsfas-lf0991": [
    { side: "out", text: "Any feedback on my membership application?" },
    { side: "in", text: "The approval letter is attached to this conversation." },
  ],
  "kr-provider": [
    { side: "out", text: "What time does the permit desk close?" },
  ],
  "kr-lf0873": [
    { side: "out", text: "Uploaded the proof of address for the permit." },
  ],
  "cot-provider": [
    { side: "in", text: "Good day, this is the City of Tshwane service desk." },
  ],
  "cot-lf0812": [
    { side: "out", text: "Submitted the municipal account renewal form." },
  ],
  "sassa-provider": [
    { side: "out", text: "When are the August grant payments released?" },
  ],
  "sassa-lf0755": [
    { side: "out", text: "Following up on my grant status enquiry." },
  ],
  "eskom-provider": [
    { side: "out", text: "Is my area affected by tonight's schedule?" },
  ],
  "eskom-lf0701": [
    { side: "out", text: "Meter reading photo submitted." },
  ],
};

const buildMessages = (row: Conversation, group: ProviderGroup): ClientMessage[] => {
  const opener: ClientMessage = {
    id: "m0",
    author: "System",
    side: "in",
    system: true,
    text:
      row.kind === "form"
        ? `Form conversation linked to ${row.ref} · ${row.title}`
        : `General chat with ${group.name} · end-to-end encrypted`,
    time: row.time,
  };

  const body = (leadIns[row.id] ?? []).map((m, i) => ({
    id: `m${i + 1}`,
    author: m.side === "out" ? "You" : group.name,
    side: m.side,
    text: m.text,
    time: row.time,
    delivered: m.side === "out" ? true : undefined,
  }));

  return [
    opener,
    ...body,
    {
      id: `m${body.length + 1}`,
      author: group.name,
      side: "in",
      text: row.preview,
      time: row.time,
    },
  ];
};

export const clientThreads: ClientThread[] = providerGroups.flatMap(group =>
  group.rows.map(row => ({ row, group, messages: buildMessages(row, group) }))
);

export const findClientThread = (id: string | null): ClientThread =>
  clientThreads.find(t => t.row.id === id) ?? clientThreads[0];
