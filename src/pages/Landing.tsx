import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
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
import lulafiIcon from "@/assets/lulafi-icon.png";
import HeroPhones from "@/components/landing/HeroPhones";


type Audience = "personal" | "business";

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
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary/90 backdrop-blur">
        {/* Audience switch bar */}
        <div className="border-b border-border-primary bg-bg-secondary">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <div className="flex items-center">
              {(["personal", "business"] as Audience[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setAudience(key)}
                  className={`relative px-3 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    audience === key
                      ? "text-text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="hidden items-center gap-4 text-sm text-text-muted sm:flex">
              <a href="#help" className="hover:text-text-primary">Help</a>
              <a href="#search" className="hover:text-text-primary">Search</a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <a href="/landing" className="flex items-center gap-2">
            <img src={lulafiIcon} alt="lulaFi logo" className="h-8 w-10 object-contain" />
            <span className="text-2xl font-semibold tracking-tight">
              lula<span className="text-brand">Fi</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {["Home", "About", "How it Works", "Guides", "Resources", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-brand"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button className="rounded-lg border border-border-primary px-4 py-2 text-sm font-medium hover:bg-bg-secondary">
              Log in
            </button>
            <button className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              {isPersonal ? "Get the app" : "Become a provider"}
            </button>
          </div>
        </div>
      </header>


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
              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                {c.title}
                <br />
                <span className="text-brand">{c.highlight}</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-text-secondary">{c.blurb}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
                  {c.primaryCta} <ArrowRight size={18} />
                </button>
                <button className="rounded-xl border border-border-primary px-6 py-3 text-base font-semibold hover:bg-bg-secondary">
                  {c.secondaryCta}
                </button>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {c.proof.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle2 size={16} className="text-brand" /> {p}
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
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
            {c.stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-semibold text-brand">{s.value}</div>
                <div className="mt-1 text-sm text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {isPersonal ? "Everything you need to deal with paperwork" : "Everything your organisation needs to process it"}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border-primary bg-bg-secondary p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/12 text-brand">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="border-y border-border-primary bg-bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Three steps, start to finish</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {c.steps.map((s, i) => (
                <div key={s.title} className="rounded-2xl bg-bg-primary p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="gradient-brand rounded-3xl px-8 py-14 text-center text-primary-foreground">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {isPersonal ? "Take the paperwork off your plate" : "Serve more clients with less admin"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">
              {isPersonal
                ? "Join lulaFi and keep your details private, portable and always ready."
                : "Join the providers receiving verified, consent-backed submissions every day."}
            </p>
            <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-foreground px-7 py-3 font-semibold text-background">
              {c.primaryCta} <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-primary">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} lulaFi (Pty) Ltd. All rights reserved.</span>
          <span>Smart and secure forms · South Africa</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
