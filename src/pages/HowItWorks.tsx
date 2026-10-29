import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import SectionHeading from "@/components/landing/SectionHeading";
import { Button } from "@/components/ui/button";

type Audience = LandingAudience;

const HOW_IT_WORKS: Record<
  Audience,
  {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    steps: { title: string; body: string; details: string[] }[];
    proof: string[];
    ctaTitle: string;
    ctaBody: string;
    primaryCta: string;
    primaryTo: string;
  }
> = {
  personal: {
    eyebrow: "How lulaFi works",
    title: "Three steps,",
    highlight: "start to finish",
    intro:
      "From setting up your vault to sending a completed form, it takes minutes — and your details only ever move when you approve it.",
    steps: [
      {
        title: "Set up your vault",
        body: "Add your details once, protected by a PIN only you know.",
        details: [
          "Add your ID, address and contact details once",
          "Protected by a PIN or Face ID only you know",
          "Everything stays encrypted on your device",
        ],
      },
      {
        title: "Pick a form",
        body: "Search verified providers or scan their code to find the right form.",
        details: [
          "Search verified providers by name or service",
          "Scan a provider's QR code on the spot",
          "Open any form from your saved favourites",
        ],
      },
      {
        title: "Approve and send",
        body: "Confirm what's shared, complete the gaps, and submit securely.",
        details: [
          "Review each field before anything leaves your vault",
          "Fill in anything extra the form needs",
          "Track the status from submission to reply",
        ],
      },
    ],
    proof: ["Consent shown field by field", "Works offline-first on your phone", "Free for individuals"],
    ctaTitle: "Take the paperwork off your plate",
    ctaBody: "Join lulaFi and keep your details private, portable and always ready.",
    primaryCta: "Get the app",
    primaryTo: "/get-app",
  },
  business: {
    eyebrow: "How lulaFi works for providers",
    title: "From publishing",
    highlight: "to processing",
    intro:
      "Publish your forms once, receive complete consent-backed submissions, and keep every record in one auditable flow.",
    steps: [
      {
        title: "Publish your forms",
        body: "Set up your organisation and list the services you offer.",
        details: [
          "Create your organisation profile",
          "List services and the forms clients can complete",
          "Keep every published form up to date in one place",
        ],
      },
      {
        title: "Receive submissions",
        body: "Clients apply with vault-verified details in seconds.",
        details: [
          "Submissions arrive complete — no re-typing",
          "A consent record is attached to every submission",
          "Route work to the right team with mentions",
        ],
      },
      {
        title: "Process and reply",
        body: "Update status, request more, and message clients securely.",
        details: [
          "Update a status and the client is notified automatically",
          "Request more information in a secure thread",
          "Keep an auditable trail from intake to reply",
        ],
      },
    ],
    proof: ["Consent logs on every record", "Encrypted client messaging", "Onboard in a day"],
    ctaTitle: "Serve more clients with less admin",
    ctaBody: "Join the providers receiving verified, consent-backed submissions every day.",
    primaryCta: "Become a provider",
    primaryTo: "/provider-signup",
  },
};

export default function HowItWorks() {
  const [audience, setAudience] = useState<Audience>("personal");
  const content = HOW_IT_WORKS[audience];

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} activePage="how-it-works" />

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-16 lg:space-y-32 lg:py-24">
        {/* Hero */}
        <motion.section
          key={audience}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionHeading
            eyebrow={content.eyebrow}
            title={
              <>
                {content.title}{" "}
                <span className="text-brand">{content.highlight}</span>
              </>
            }
            body={content.intro}
            align="center"
          />
        </motion.section>

        {/* Steps */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col rounded-2xl border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  {i < content.steps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-border-primary md:block" aria-hidden="true" />
                  )}
                </div>
                <h2 className="mb-2 mt-6 text-xl font-bold">{step.title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{step.body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-border-primary pt-5">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Included with lulaFi">
            {content.proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-primary bg-bg-primary p-10 text-center shadow-[var(--shadow-md)] lg:p-16">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">{content.ctaBody}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
                  <Link to={content.primaryTo}>
                    {content.primaryCta} <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Read about your data</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
