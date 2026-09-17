import LegalPage, { LegalSection } from "@/components/landing/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "The information is yours",
    paragraphs: [
      "Everything you save in your LulaFi Data Vault belongs to you. We hold it on your behalf so you can reuse it, and we act only on the instructions you give inside the app.",
      "We never sell your details, rent them out, or share them with a provider you have not chosen.",
    ],
  },
  {
    heading: "How consent works",
    bullets: [
      "Before a share, LulaFi lists the exact fields the provider has requested and which of them will be autofilled from your vault.",
      "Fields your vault cannot fill stay empty for you to complete yourself.",
      "The share only happens after you approve it with your vault PIN or biometrics.",
      "Each approval is recorded with the provider, the form, the fields and the date, so you always have a trail.",
    ],
  },
  {
    heading: "Withdrawing consent",
    paragraphs: [
      "You can withdraw a consent at any time from your activity history. Withdrawal stops any further sharing with that provider, and we notify them of your decision.",
      "A withdrawal cannot un-send a submission a provider has already received. Ask that provider to delete their copy, and we will support your request.",
    ],
  },
  {
    heading: "Getting a copy of your data",
    bullets: [
      "Download any submitted form as a PDF, with your answers, submission date and status.",
      "Export your vault details and consent history from Settings.",
      "Request a full copy of the personal information we hold, at no charge.",
    ],
  },
  {
    heading: "Deleting your data",
    paragraphs: [
      "Delete individual vault fields at any time, or close your account to remove your vault entirely. Deletion is permanent, so download anything you still need first.",
      "We keep only the minimum records the law requires, such as proof that a consent was given and later withdrawn.",
    ],
  },
  {
    heading: "What providers can and cannot do",
    bullets: [
      "They receive only the fields included in the submission you approved.",
      "They may not reuse your details for a different purpose without asking you again.",
      "They are separately responsible under POPIA for the information they hold.",
      "You can see every provider you have shared with, and what each one received.",
    ],
  },
];

export default function DataOwnership() {
  return (
    <LegalPage
      eyebrow="Your data. Your choice."
      title="Your data ownership"
      intro="What you own, how consent is recorded, and how to export or delete your information whenever you want."
      updated="16 September 2026"
      sections={sections}
    />
  );
}
