import { useState } from "react";
import { Clock, ExternalLink, Headset, Mail, MapPin, Phone } from "lucide-react";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import SectionHeading from "@/components/landing/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const officeAddress = "Unit 5 Tuscan Gardens Office Park, 14th Road Noordwyk, Midrand 1687";
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`;
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`;

const contactCards = [
  {
    icon: Headset,
    title: "lulaFi Helpdesk",
    lines: [
      { icon: Phone, label: "(+27) 010 221 1341", href: "tel:+270102211341" },
      { icon: Mail, label: "support@lulafi.co", href: "mailto:support@lulafi.co" },
    ],
  },
  {
    icon: MapPin,
    title: "lulaFi Office",
    lines: [
      { icon: Phone, label: "(+27) 010 221 1341", href: "tel:+270102211341" },
      { icon: Mail, label: "admin@lulafi.co", href: "mailto:admin@lulafi.co" },
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: [
      { icon: undefined, label: "Monday - Friday: 08:00 - 16:30" },
      { icon: undefined, label: "Saturday & Sunday: Closed" },
    ],
  },
  {
    icon: MapPin,
    title: "Physical & Postal Address",
    lines: [
      { icon: undefined, label: "Unit 5 Tuscan Gardens Office Park," },
      { icon: undefined, label: "14th Road Noordwyk," },
      { icon: undefined, label: "Midrand 1687" },
    ],
  },
];

const faqs = [
  {
    question: "How do I get help with my lulaFi account?",
    answer: "Call the lulaFi Helpdesk on (+27) 010 221 1341 or email support@lulafi.co. Include the phone number linked to your account, but never send your PIN or one-time code.",
  },
  {
    question: "Who should providers contact?",
    answer: "Providers can email admin@lulafi.co for onboarding, organisation access, forms, submissions, or account administration support.",
  },
  {
    question: "When is the support team available?",
    answer: "The office is open Monday to Friday from 08:00 to 16:30. It is closed on Saturdays and Sundays.",
  },
  {
    question: "Can I visit the lulaFi office?",
    answer: "The office is at Unit 5 Tuscan Gardens Office Park, 14th Road, Noordwyk, Midrand 1687. Please contact the team before visiting.",
  },
  {
    question: "What information should I include in a support request?",
    answer: "Describe what you were trying to do, the screen or form involved, and any message you saw. Do not share your vault PIN, password, or one-time code.",
  },
];

export default function Contact() {
  const [audience, setAudience] = useState<LandingAudience>("personal");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} activePage="contact" />

      <main>
        <section className="border-b border-border-primary bg-bg-secondary">
          <div className="mx-auto max-w-3xl px-6 py-14 text-center lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Contact us</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Contact lulaFi
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Need help with your account, forms, messages, or provider access? Contact the lulaFi
              support team and we will help route your request to the right place.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            {contactCards.map((card) => (
              <section
                key={card.title}
                aria-labelledby={`${card.title.replace(/\s+/g, "-").toLowerCase()}-heading`}
                className="rounded-lg border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center gap-4 border-b border-border-primary pb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 id={`${card.title.replace(/\s+/g, "-").toLowerCase()}-heading`} className="text-lg font-bold">
                    {card.title}
                  </h2>
                </div>
                <ul className="mt-5 space-y-4">
                  {card.lines.map((line) => {
                    const content = (
                      <span className="flex items-center gap-3">
                        {line.icon && (
                          <line.icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        )}
                        {line.label}
                      </span>
                    );
                    return (
                      <li key={line.label} className="text-text-secondary">
                        {line.href ? (
                          <a
                            href={line.href}
                            className="transition-colors hover:text-brand"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <section aria-labelledby="location-heading" className="mt-20">
            <SectionHeading
              eyebrow="Visit us"
              id="location-heading"
              title="Find the lulaFi office"
              body="We are based in Noordwyk, Midrand. Open the location in Google Maps for directions."
            />
            <div className="mt-8 grid overflow-hidden rounded-lg border border-border-primary bg-bg-primary shadow-[var(--shadow-sm)] lg:grid-cols-[1.55fr_0.75fr]">
              <iframe
                title="Map showing the lulaFi office in Noordwyk, Midrand"
                src={mapUrl}
                className="h-[360px] w-full border-0 lg:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col justify-center border-t border-border-primary p-8 lg:border-l lg:border-t-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold">lulaFi Office</h2>
                <address className="mt-3 not-italic leading-relaxed text-text-secondary">
                  Unit 5 Tuscan Gardens Office Park<br />
                  14th Road, Noordwyk<br />
                  Midrand 1687
                </address>
                <Button asChild className="mt-6 w-full sm:w-fit">
                  <a href={directionsUrl} target="_blank" rel="noreferrer">
                    Get directions <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section aria-labelledby="faq-heading" className="mx-auto mt-20 max-w-3xl">
            <SectionHeading
              eyebrow="Frequently asked questions"
              id="faq-heading"
              title="Before you contact us"
              body="Quick answers for clients and providers looking for help."
              align="center"
            />
            <Accordion type="single" collapsible className="mt-8 rounded-lg border border-border-primary bg-bg-primary px-6 shadow-[var(--shadow-sm)]">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="min-h-14 text-left text-base font-semibold hover:text-brand">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-8 text-base leading-relaxed text-text-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
