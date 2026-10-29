import LegalPage, { LegalSection } from "@/components/landing/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Agreement and who may use LulaFi",
    paragraphs: [
      "These terms are an agreement between you and LulaFi (Pty) Ltd (LulaFi, we, us or our) for use of the LulaFi app, website and related services. By creating an account or using the service, you agree to these terms and our Privacy Policy.",
      "Personal users must be at least 18, or use LulaFi with the legally valid permission and supervision of a parent or guardian. If you create or use an account for an organisation, you confirm that you have authority to bind that organisation and that the organisation is responsible for its authorised users.",
    ],
  },
  {
    heading: "The LulaFi service",
    paragraphs: [
      "LulaFi lets personal users maintain reusable information in a Data Vault, complete and send forms, attach documents, keep consent records and communicate with providers. It lets providers publish services and forms, receive and process submissions, manage authorised team access and communicate with clients.",
      "LulaFi provides the channel and workflow. The receiving provider decides whether to accept, approve, reject, forward or act on a submission. LulaFi does not guarantee an outcome or provide legal, financial, medical, municipal or other professional advice.",
    ],
  },
  {
    heading: "Accounts and security",
    bullets: [
      "Provide accurate registration information and keep it current.",
      "Use only your own account and do not share one-time passwords, your vault PIN or other authentication credentials.",
      "Take reasonable steps to secure your device. Activity completed after valid authentication may be treated as authorised by you unless you promptly report compromise.",
      "Tell us immediately if you suspect unauthorised access, a lost device or misuse of your account.",
      "A provider must keep its organisation details and staff permissions current and promptly remove access for people who no longer require it.",
    ],
  },
  {
    heading: "Your data vault and ownership",
    paragraphs: [
      "You retain ownership of information and documents you add to your Data Vault or submit through LulaFi. You give us a limited, non-exclusive permission to host, display, secure, copy and process that content only as needed to operate LulaFi, follow your instructions, comply with law and enforce these terms.",
      "You control which available vault fields are used for a submission. Before sending, review the recipient, requested information, pre-filled answers, manually entered answers and attachments. You are responsible for the accuracy and lawfulness of what you submit.",
      "Deleting or changing vault information affects future use. It does not recall or alter a submission already delivered to a provider.",
    ],
  },
  {
    heading: "Consent, submissions and provider decisions",
    paragraphs: [
      "A vault-assisted share occurs only after the personal user completes LulaFi's approval step. We record information about that approval. Withdrawing consent prevents future consent-based processing by LulaFi but cannot undo delivery already completed.",
      "A submission may be delayed, rejected or returned by a provider. Any status shown in LulaFi reflects information available to the platform and is not a guarantee that the provider has completed an external process.",
      "Where a provider forwards a submission to another body, the provider must have lawful authority to do so and must make the destination and purpose clear to the client where required.",
    ],
  },
  {
    heading: "Provider responsibilities",
    bullets: [
      "Request only information reasonably necessary for a clear, lawful and stated purpose.",
      "Give clients any privacy notice, terms, fees, eligibility rules and processing timeframes that apply to the provider's service.",
      "Use received information only for the authorised purpose or another purpose permitted by law, and never sell or unlawfully reuse it.",
      "Restrict access to authorised staff who need it, keep access permissions current and protect submissions after receipt.",
      "Maintain legally required consent, processing, retention and deletion records and respond to requests concerning the provider's copy.",
      "Notify LulaFi promptly of suspected misuse, unauthorised access or a security compromise affecting information received through LulaFi.",
      "Ensure that published forms, services, organisation details and messages are accurate and do not mislead users.",
    ],
  },
  {
    heading: "Messages, files and conduct",
    paragraphs: [
      "LulaSEM is intended for communications connected to services, forms and provider relationships. You are responsible for messages and files you send. A recipient may retain a lawful record after you delete your local copy.",
    ],
    bullets: [
      "Do not submit false information or another person's information without lawful authority.",
      "Do not use LulaFi for fraud, unlawful discrimination, harassment, threats, spam, malware or other unlawful activity.",
      "Do not request or share information that is excessive for the stated purpose.",
      "Do not bypass access controls, probe security, scrape the service, reverse engineer restricted parts, impersonate another person or interfere with operation.",
      "Do not upload content that infringes privacy, confidentiality, intellectual-property or other rights.",
    ],
  },
  {
    heading: "Our intellectual property",
    paragraphs: [
      "LulaFi and its licensors own the app, website, software, visual design, documentation, trade marks and other service materials. We give you a limited, revocable, non-transferable right to use the service for its intended purpose while your account remains in good standing.",
      "These terms do not transfer ownership of your content to LulaFi. If you send feedback or suggestions, we may use them without obligation, provided we continue to protect personal information under our Privacy Policy.",
    ],
  },
  {
    heading: "Third-party and provider services",
    paragraphs: [
      "Providers and external services available through LulaFi are independent from LulaFi unless expressly stated otherwise. Their own terms, privacy notices, prices and service rules may apply. LulaFi is not responsible for a provider's professional decision, service quality, legal duty or downstream use of an authorised submission.",
      "Links to an app store, website, map, payment service or other third-party platform do not amount to an endorsement or a guarantee that it will remain available.",
    ],
  },
  {
    heading: "Availability and changes to the service",
    paragraphs: [
      "We aim to provide a reliable service but do not promise uninterrupted or error-free availability. Maintenance, connectivity, device limitations, security events or matters outside our control may interrupt LulaFi. Keep copies of documents you cannot afford to lose.",
      "We may improve, replace or discontinue features. If a change materially reduces a paid service, any remedy will be governed by the applicable provider agreement and consumer law.",
    ],
  },
  {
    heading: "Suspension and ending your account",
    paragraphs: [
      "You may stop using LulaFi and request account closure. We may restrict or suspend access where reasonably necessary to investigate a security risk, comply with law, protect users or respond to a material breach. We may close an account after notice where practical, or immediately where delay would create serious risk.",
      "On closure, your right to use LulaFi ends. We will handle remaining account and vault information under the Privacy Policy. Submissions already delivered may remain with providers, and terms that by nature should continue — including ownership, lawful records, liability and dispute provisions — survive closure.",
    ],
  },
  {
    heading: "Warranties and liability",
    paragraphs: [
      "LulaFi is supplied with the warranties that cannot lawfully be excluded. To the extent permitted by law, we do not warrant a provider's response or outcome, the accuracy of user-supplied information, uninterrupted availability or compatibility with every device.",
      "LulaFi is not responsible for loss caused by inaccurate or unlawful content you provide, a provider's independent decision or delay, your failure to protect credentials or events outside our reasonable control. Nothing in these terms excludes or limits liability where doing so is prohibited by the Consumer Protection Act, POPIA or other applicable law.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms to reflect service, legal or security changes. We will publish the revised date and give reasonable notice of a material change. If you do not accept a material change, you may stop using LulaFi and close your account before it takes effect. Continued use after the effective date means you accept the revised terms, to the extent permitted by law.",
    ],
  },
  {
    heading: "Disputes, law and contact",
    paragraphs: [
      "Please first raise a complaint through LulaFi's official support channel so we can try to resolve it in good faith. This does not prevent you from using a regulator, ombud, consumer body or court where the law gives you that right.",
      "These terms are governed by the laws of the Republic of South Africa. Subject to any mandatory consumer forum or other legal right, South African courts have jurisdiction. Formal legal notices must be sent using the official contact details published on the LulaFi website or in the app.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      intro="The rules for personal users and business providers, including data ownership, consent, submissions and provider responsibilities."
      updated="17 September 2026"
      sections={sections}
    />
  );
}
