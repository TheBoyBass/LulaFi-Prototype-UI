import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CircleUserRound,
  FileText,
  Fingerprint,
  Inbox,
  LineChart,
  Lock,
  MessageSquareLock,
  QrCode,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import HeroPhones from "@/components/landing/HeroPhones";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";
import SectionHeading from "@/components/landing/SectionHeading";
import { Button } from "@/components/ui/button";



type Audience = "personal" | "business";

const BENEFITS = [
  { icon: ShieldCheck, label: "Secure & Private" },
  { icon: CircleUserRound, label: "You are in control" },
  { icon: Users, label: "Built for Everyone" },
];

const CONTENT: Record<
  Audience,
  {
    eyebrow: string;
    title: string;
    highlight: string;
    blurb: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
    features: { icon: typeof FileText; title: string; body: string }[];
    steps: { title: string; body: string }[];
    proof: string[];
  }
> = {
  personal: {
    eyebrow: "For people",
    title: "Fill any form once.",
    highlight: "Share it safely.",
    blurb:
      "lulaFi keeps your details in an encrypted vault on your phone. Tap a form, approve with your PIN, and it fills itself — nothing leaves your device without your consent.",
    primaryCta: "Get the app",
    secondaryCta: "See how it works",
    stats: [
      { value: "5 sec", label: "to complete a form" },
      { value: "100%", label: "consent-based sharing" },
      { value: "0", label: "details typed twice" },
    ],
    features: [
      { icon: Lock, title: "Your data vault", body: "Bank-grade encryption keeps your ID, address and contact details locked to your device." },
      { icon: FileText, title: "Smart form fill", body: "Applications, registrations and clinic forms pre-fill from your vault in one tap." },
      { icon: MessageSquareLock, title: "lulaSEM messaging", body: "Encrypted conversations with every provider you deal with, all in one inbox." },
      { icon: QrCode, title: "Scan and submit", body: "Point your camera at a provider QR code and send a completed form on the spot." },
      { icon: Fingerprint, title: "You approve everything", body: "Every share needs your PIN or Face ID. See exactly which fields go where." },
      { icon: CalendarDays, title: "Appointments in view", body: "Track bookings, submissions and status updates from a single activity feed." },
    ],
    steps: [
      { title: "Set up your vault", body: "Add your details once, protected by a PIN only you know." },
      { title: "Pick a form", body: "Search verified providers or scan their code to find the right form." },
      { title: "Approve and send", body: "Confirm what's shared, complete the gaps, and submit securely." },
    ],
    proof: ["Consent shown field by field", "Works offline-first on your phone", "Free for individuals"],
  },
  business: {
    eyebrow: "For providers",
    title: "Fewer forms.",
    highlight: "Faster clients.",
    blurb:
      "Receive complete, verified submissions straight into your inbox. Chat securely with clients and teams, update statuses, and keep every record in one auditable place.",
    primaryCta: "Become a provider",
    secondaryCta: "Talk to our team",
    stats: [
      { value: "70%", label: "less capture work" },
      { value: "1 inbox", label: "for every submission" },
      { value: "Audit-ready", label: "consent trail" },
    ],
    features: [
      { icon: Inbox, title: "Forms inbox", body: "Every submission arrives complete, with client answers, attachments and status." },
      { icon: ShieldCheck, title: "Verified identities", body: "Details come from consented client vaults — no re-typing, no guesswork." },
      { icon: Users, title: "Teams and mentions", body: "Route work to processing groups and @mention colleagues inside secure threads." },
      { icon: LineChart, title: "Live dashboard", body: "See open forms, active chats and today's schedule the moment you sign in." },
      { icon: Building2, title: "Your organisation profile", body: "Publish services and forms so clients can find and apply to you instantly." },
      { icon: Sparkles, title: "Status updates", body: "Move a submission forward and the client is notified automatically." },
    ],
    steps: [
      { title: "Publish your forms", body: "Set up your organisation and list the services you offer." },
      { title: "Receive submissions", body: "Clients apply with vault-verified details in seconds." },
      { title: "Process and reply", body: "Update status, request more, and message clients securely." },
    ],
    proof: ["Consent logs on every record", "Encrypted client messaging", "Onboard in a day"],
  },
};

const Landing = () => {
  const [audience, setAudience] = useState<Audience>("personal");
  const c = CONTENT[audience];
  const isPersonal = audience === "personal";

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} activePage="home" />


      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: isPersonal
                ? "radial-gradient(ellipse 60% 60% at 85% 0%, hsla(172,66%,50%,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 0% 100%, hsla(239,84%,67%,0.12) 0%, transparent 60%)"
                : "radial-gradient(ellipse 60% 60% at 85% 0%, hsla(239,84%,67%,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 0% 100%, hsla(172,66%,50%,0.12) 0%, transparent 60%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <motion.div key={audience} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
                {c.eyebrow}
              </span>
              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                {c.title}
                <br />
                <span className="text-brand">{c.highlight}</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary">{c.blurb}</p>

               <div className="mt-7 flex flex-wrap gap-3">
                 <Button asChild size="lg" className="shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
                  <Link to="/get-app">
                    {c.primaryCta} <ArrowRight size={18} />
                  </Link>
                 </Button>
                 <Button asChild variant="outline" size="lg">
                  <a href={isPersonal ? "#how-it-works" : "#contact"}>{c.secondaryCta}</a>
                 </Button>
              </div>
               <ul className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="LulaFi benefits">
                 {BENEFITS.map(({ icon: Icon, label }) => (
                   <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-text-secondary">
                     <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                       <Icon size={16} aria-hidden="true" />
                     </span>
                     {label}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Animated phones + transfer */}
            <HeroPhones key={`${audience}-art`} />

          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border-primary bg-bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 sm:grid-cols-3">
            {c.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border-primary bg-bg-primary p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="text-4xl font-bold tracking-tight text-brand">{s.value}</div>
                <div className="mt-2 text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="guides" className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <SectionHeading
            eyebrow={isPersonal ? "What you get" : "What your team gets"}
            title={
              isPersonal
                ? "Everything you need to deal with paperwork"
                : "Everything your organisation needs to process it"
            }
            body={
              isPersonal
                ? "One secure place for your details, your forms and every provider you deal with."
                : "Complete submissions, secure conversations and a clear trail for every record."
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map(({ icon: Icon, title, body }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 mt-6 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section id="how-it-works" className="border-y border-border-primary bg-bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps, start to finish"
              body={
                isPersonal
                  ? "From setting up your vault to sending a completed form, it takes minutes."
                  : "From publishing your forms to replying to a client, everything stays in one flow."
              }
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {c.steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-border-primary bg-bg-primary p-8 shadow-[var(--shadow-sm)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 mt-6 text-lg font-bold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3" aria-label="Included with lulaFi">
              {c.proof.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-primary bg-bg-primary p-10 text-center shadow-[var(--shadow-md)] lg:p-20">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isPersonal ? "Take the paperwork off your plate" : "Serve more clients with less admin"}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
                {isPersonal
                  ? "Join lulaFi and keep your details private, portable and always ready."
                  : "Join the providers receiving verified, consent-backed submissions every day."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
                  <Link to="/get-app">
                    {c.primaryCta} <ArrowRight size={18} />
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
};

export default Landing;
