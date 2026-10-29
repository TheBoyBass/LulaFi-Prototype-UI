import { useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Check,
  CheckCircle2,
  Eye,
  FileText,
  KeyRound,
  LockKeyhole,
  MapPin,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";

const ABOUT_CONTENT = {
  personal: {
    eyebrow: "About LulaFi for people",
    title: "Your data.",
    highlight: "Your choice.",
    intro: "Complete and share important forms without giving up control of your personal information. Your details stay in your vault until you choose what to send, who receives it and why.",
    primaryCta: "Get the app",
    primaryTo: "/get-app",
    sectionLabel: "Meaningful consent",
    sectionTitle: "You decide what leaves your vault",
    sectionBody: "A clear approval step sits between your saved information and every organisation requesting it. No silent sharing, ever.",
    requestLabel: "Data request",
    requestTitle: "City of Tshwane — Municipal account renewal",
    footer: "Protected by LulaFi's consent controls",
    principles: [
      { icon: LockKeyhole, title: "Protected by design", description: "Security controls protect your account, vault and authorised submissions." },
      { icon: Banknote, title: "Reusable information", description: "Save key details once, then use them in forms you deliberately choose." },
      { icon: Eye, title: "Transparent consent", description: "Review every requested field, recipient and purpose before approving a share." },
      { icon: MapPin, title: "Built for South Africa", description: "Designed around local services and the privacy rights protected by POPIA." },
    ],
    controls: [
      { title: "Review every request", detail: "See the exact fields a provider asks for before anything is shared." },
      { title: "Approve the submission", detail: "Use your vault PIN to confirm the fields you want LulaFi to fill." },
      { title: "Keep a consent record", detail: "See what was shared, with whom, for which purpose and when." },
    ],
  },
  business: {
    eyebrow: "About LulaFi for providers",
    title: "Their data.",
    highlight: "Your responsibility.",
    intro: "Receive complete, consent-backed submissions while giving clients a clear view of what you request and why. Process every form in one accountable workflow.",
    primaryCta: "Become a provider",
    primaryTo: "/get-app",
    sectionLabel: "Responsible processing",
    sectionTitle: "Request only what your service needs",
    sectionBody: "LulaFi helps your organisation collect necessary information transparently, maintain an audit trail and keep client access limited to the right team.",
    requestLabel: "Incoming submission",
    requestTitle: "Lindo — Municipal account renewal",
    footer: "Consent record attached to the submission",
    principles: [
      { icon: LockKeyhole, title: "Controlled access", description: "Keep submissions within authorised teams and remove access when roles change." },
      { icon: Banknote, title: "Less recapture", description: "Receive structured information without asking clients to type the same details again." },
      { icon: Eye, title: "Purpose made clear", description: "Show clients which fields you need and the purpose before they submit." },
      { icon: MapPin, title: "POPIA-aware workflows", description: "Support accountable processing for South African organisations and communities." },
    ],
    controls: [
      { title: "Make each request necessary", detail: "Ask only for fields required to deliver the stated service." },
      { title: "Protect received information", detail: "Limit staff access and process submissions for the authorised purpose." },
      { title: "Keep an accountable trail", detail: "Record consent, status changes, assignments and onward forwarding." },
    ],
  },
} satisfies Record<LandingAudience, object>;

const requestedFields = ["Full name", "ID number", "Home address", "Account number"];

const legalPages = [
  {
    icon: FileText,
    title: "Privacy policy",
    description: "What we collect, why we need it, how long we keep it and who may see it.",
    to: "/privacy",
  },
  {
    icon: Scale,
    title: "Terms of service",
    description: "The rules for using LulaFi as a client or a provider, and what we are responsible for.",
    to: "/terms",
  },
  {
    icon: KeyRound,
    title: "Your data ownership",
    description: "Your rights over your vault: consent, withdrawal, export and deletion.",
    to: "/data-ownership",
  },
];

export default function About() {
  const [audience, setAudience] = useState<LandingAudience>("personal");
  const content = ABOUT_CONTENT[audience];

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} activePage="about" />

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-16 lg:space-y-32 lg:py-24">
        {/* Hero */}
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                 {content.eyebrow}
              </span>
              <h1 className="max-w-xl text-5xl font-bold leading-[1.1] sm:text-6xl">
                 {content.title}
                <br />
                 <span className="text-brand">{content.highlight}</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
                 {content.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl font-semibold shadow-[var(--shadow-md)] active:scale-95">
                 <Link to={content.primaryTo}>{content.primaryCta}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl font-semibold active:scale-95"
              >
                <Link to="/privacy">View privacy policy</Link>
              </Button>
            </div>
          </motion.div>

          {/* Shield graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center"
            aria-hidden="true"
          >
            <div className="absolute h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
            <div className="absolute inset-0 rounded-full border border-border-primary opacity-50" />
            <div className="absolute inset-16 rounded-full border border-border-primary opacity-70" />

            <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-3xl border border-border-primary bg-bg-primary shadow-[var(--shadow-md)]">
              <ShieldCheck className="h-16 w-16 text-brand" strokeWidth={1.5} />
            </div>

            <div className="absolute left-10 top-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border-primary bg-bg-primary shadow-[var(--shadow-md)]">
              <LockKeyhole className="h-6 w-6 text-brand/80" />
            </div>
            <div className="absolute bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border-primary bg-bg-primary shadow-[var(--shadow-md)]">
              <CheckCircle2 className="h-6 w-6 text-brand/80" />
            </div>
            <div className="absolute right-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-border-primary bg-bg-primary shadow-[var(--shadow-md)]">
              <Zap className="h-6 w-6 text-brand/80" />
            </div>
          </motion.div>
        </section>

        {/* Principles */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="trust-heading">
          <h2 id="trust-heading" className="sr-only">
            Privacy principles
          </h2>
           {content.principles.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 mt-6 text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{description}</p>
            </motion.article>
          ))}
        </section>

        {/* Meaningful consent */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border-primary bg-bg-primary p-10 shadow-[var(--shadow-md)] lg:p-20">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-6">
               <p className="text-sm font-semibold uppercase tracking-wider text-brand">{content.sectionLabel}</p>
               <h2 className="text-4xl font-bold">{content.sectionTitle}</h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                 {content.sectionBody}
              </p>
              <div className="h-px bg-border-primary" aria-hidden="true" />
              <ul className="space-y-5">
                 {content.controls.map(({ title, detail }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block font-semibold">{title}</span>
                      <span className="text-sm text-text-muted">{detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border-primary bg-bg-secondary p-8">
              <div className="space-y-6 rounded-2xl border border-border-primary bg-bg-primary p-6 shadow-[var(--shadow-sm)]">
                <div className="flex items-center justify-between">
                   <div className="text-xs font-bold uppercase tracking-widest text-text-muted">{content.requestLabel}</div>
                  <div className="rounded bg-brand/10 px-2 py-1 text-xs font-bold text-brand">Active</div>
                </div>
                 <p className="font-semibold">{content.requestTitle}</p>
                <div className="space-y-4">
                  {requestedFields.map((field) => (
                    <div key={field} className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {field}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <div className="h-10 flex-1 rounded-lg bg-bg-tertiary" aria-hidden="true" />
                  <div className="h-10 flex-1 rounded-lg bg-brand" aria-hidden="true" />
                </div>
              </div>
               <p className="mt-6 text-center text-xs text-text-muted">{content.footer}</p>
            </div>
          </div>
        </section>

        {/* Legal pages */}
        <section aria-labelledby="legal-heading">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">The detail</p>
            <h2 id="legal-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              Read the commitments in full
            </h2>
            <p className="mt-4 text-text-secondary">
              Everything above is written down. These pages explain exactly what we collect, what you own, and the
              rules we all work by.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {legalPages.map(({ icon: Icon, title, description, to }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 mt-6 text-lg font-bold group-hover:text-brand">{title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
