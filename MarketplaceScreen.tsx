import LegalPage, { LegalSection } from "@/components/landing/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Who this policy applies to",
    paragraphs: [
      "This policy explains how LulaFi (Pty) Ltd (LulaFi, we, us or our) handles personal information when people use the LulaFi app or website and when organisations use LulaFi to publish forms, receive submissions, communicate with clients or process requests.",
      "We process personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable South African law. If this policy conflicts with a right you have under applicable law, that right prevails.",
    ],
  },
  {
    heading: "Our role and a provider's role",
    paragraphs: [
      "LulaFi is responsible for the personal information needed to create and secure your LulaFi account, operate your Data Vault, maintain consent records and provide the platform. When LulaFi processes a submission only on an organisation's instructions, LulaFi may act as that organisation's operator under POPIA.",
      "A provider is separately responsible for deciding which information its form requests, why it needs that information, what it does with a submission after receipt and how long it keeps its copy. A provider must give you its own privacy information where required. LulaFi's policy does not replace a provider's privacy notice.",
    ],
  },
  {
    heading: "Personal information we collect",
    bullets: [
      "Account and identity details, such as your name, mobile number, email address and account-verification information.",
      "Data Vault details you choose to save for reuse, which may include an identity number, address, contact details and other information required by forms you select.",
      "Submission information, including answers, supporting documents, the receiving provider, submission reference, date, status and consent record.",
      "LulaSEM messages, message participants, delivery information and files shared in a conversation.",
      "Provider account information, including organisation details, authorised team members, services, forms, workflow actions and client communications.",
      "Technical and security information, such as device type, app version, approximate network information, sign-in events, failed authentication attempts and diagnostic records.",
      "Support and rights-request information you give us when you contact us, report a problem or exercise a privacy right.",
    ],
  },
  {
    heading: "Why and on what basis we use it",
    bullets: [
      "To perform our agreement with you by creating your account, operating your vault, filling fields on your instruction, delivering approved submissions and providing messages, reminders and status updates.",
      "With your consent, to share the specific vault fields and attachments you approve with the provider you select. You may withdraw consent for future processing, but withdrawal cannot recall information already delivered.",
      "To comply with legal duties, respond to lawful requests and maintain records we are required to keep.",
      "To pursue legitimate interests that do not override your rights, including preventing fraud, securing accounts, diagnosing faults, enforcing our terms and improving service reliability.",
      "For providers, to administer organisation profiles, authorised staff access, forms, submissions and processing histories under the provider agreement.",
    ],
    paragraphs: ["We do not sell or rent personal information. We do not use Data Vault content for targeted advertising or build advertising profiles from it."],
  },
  {
    heading: "Your vault, consent and ownership",
    paragraphs: [
      "You retain ownership of the information and documents you place in your Data Vault. You give LulaFi only the limited permission needed to store, display, protect and process that information so we can provide the service you request.",
      "Before a vault-assisted submission, LulaFi shows the provider, purpose and fields requested. LulaFi uses approved vault values to fill only those fields. You complete any remaining fields and authorise the submission before it is sent. We record the recipient, approved fields, purpose and time as part of your consent history.",
      "Changing or deleting a vault value changes future use of that value. It does not alter a submission already delivered to a provider. Requests concerning a provider's retained copy must also be directed to that provider.",
    ],
  },
  {
    heading: "When we share information",
    bullets: [
      "With the provider you deliberately select, limited to the submission, fields, messages and attachments you authorise or send.",
      "With service suppliers that help us host, secure, communicate, support and operate LulaFi, under confidentiality and data-protection obligations.",
      "With professional advisers, regulators, courts or law-enforcement bodies when lawfully required or reasonably necessary to establish, exercise or defend legal rights.",
      "As part of a genuine corporate transaction, subject to appropriate confidentiality and continued protection of personal information.",
    ],
    paragraphs: ["We do not give one provider access to submissions or conversations belonging to another provider unless you authorise a transfer or applicable law requires it."],
  },
  {
    heading: "Security and account protection",
    bullets: [
      "We use reasonable technical and organisational safeguards designed for the sensitivity of the information and the risks involved.",
      "Authentication and a vault approval step help prevent unauthorised access and sharing.",
      "We limit internal and provider access according to role and operational need, and maintain security and activity records where appropriate.",
      "No digital service can promise absolute security. You must protect your device, one-time passwords and vault PIN, and tell us promptly if you suspect unauthorised access.",
    ],
    paragraphs: ["If we have reasonable grounds to believe personal information has been accessed or acquired by an unauthorised person, we will investigate and notify the Information Regulator and affected people as soon as reasonably possible where POPIA requires it."],
  },
  {
    heading: "Storage, transfers and retention",
    paragraphs: [
      "We may use suppliers that process information in South Africa or other countries. Where personal information is transferred outside South Africa, we use an applicable safeguard under POPIA, such as adequate legal protection, a binding agreement, your consent or another lawful basis.",
      "We keep account and vault information while your account is active and then only for the period reasonably needed to close the account, resolve disputes, prevent fraud and meet legal duties. Submission, consent, security and transaction records may need to be kept longer where law or a legitimate audit requirement applies.",
      "When information is no longer required, we delete it, de-identify it or place it beyond ordinary use. Closing your LulaFi account does not delete copies already received and lawfully retained by a provider.",
    ],
  },
  {
    heading: "Your privacy rights",
    bullets: [
      "Ask whether we hold personal information about you and request access to it.",
      "Ask us to correct, update or delete information that is inaccurate, irrelevant, excessive, out of date, incomplete, misleading or unlawfully obtained.",
      "Object, on reasonable grounds, to processing based on our or another person's legitimate interests.",
      "Withdraw consent for future processing where consent is the basis we rely on.",
      "Ask for a copy of your vault information and consent history in an available export format.",
      "Complain to LulaFi or lodge a complaint with the Information Regulator of South Africa.",
    ],
    paragraphs: ["Some rights are subject to lawful exceptions. We may need to verify your identity before acting on a request, and we will explain if we cannot fulfil all or part of it."],
  },
  {
    heading: "Children and special personal information",
    paragraphs: [
      "LulaFi is intended for people aged 18 or older. A person under 18 may use it only where a competent person has given legally valid permission and the use is otherwise lawful. We do not knowingly collect a child's personal information without the permission or other authority required by law.",
      "A form may request sensitive or special personal information. A provider must request it only where lawful and necessary. LulaFi displays requested fields before you approve a share; your approval does not remove the provider's duty to have a lawful basis for requesting and using the information.",
    ],
  },
  {
    heading: "Your duties and provider duties",
    bullets: [
      "Keep your account details accurate and protect your device and authentication credentials.",
      "Do not upload another person's information unless you have lawful authority to do so.",
      "Providers must request only information reasonably necessary for a stated purpose and must not reuse it for an incompatible purpose without a new lawful basis.",
      "Providers must restrict staff access, secure received information, maintain required records and respond to data-subject requests concerning their copy.",
      "Providers must notify LulaFi promptly of a suspected compromise involving information received through LulaFi.",
    ],
  },
  {
    heading: "Questions, complaints and changes",
    paragraphs: [
      "For privacy questions, rights requests or complaints, contact LulaFi's Information Officer through the official contact details published on the LulaFi website or in the app. We will acknowledge and handle your request within the period required by law.",
      "You may also complain to the Information Regulator of South Africa through its official website at inforegulator.org.za. Please use the Regulator's current published channels because contact and submission methods may change.",
      "We may update this policy when LulaFi, our suppliers or the law changes. We will show the revised date and give reasonable notice of a material change. Where the law requires fresh consent, we will ask for it before the affected processing begins.",
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="How LulaFi handles personal information for people and providers, and how our data-ownership promise works in practice."
      updated="17 September 2026"
      sections={sections}
    />
  );
}
