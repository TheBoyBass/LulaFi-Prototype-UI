import { useState } from "react";
import { Link } from "react-router-dom";
import { Apple, Bot, Monitor } from "lucide-react";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";

const mobileOptions = [
  {
    icon: Apple,
    title: "iPhone & iPad",
    description: "Available on the App Store",
    href: "https://apps.apple.com/app/lulafi/id6753874234",
    action: "Download",
  },
  {
    icon: Bot,
    title: "Android",
    description: "Available on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.luladefi.app",
    action: "Download",
  },
];

const steps = [
  "Download the app",
  "Create your account",
  "Set up your data vault",
  "Return here to log in",
];

export default function GetApp() {
  const [audience, setAudience] = useState<LandingAudience>("personal");

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} />

      <main className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <img src={lulafiIcon} alt="" className="h-10 w-12 object-contain" />
            <span className="text-2xl font-bold tracking-tight">
              lula<span className="text-brand">Fi</span>
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get started</h1>
          <p className="max-w-md leading-relaxed text-text-secondary">
            {audience === "personal"
              ? "Secure your data vault and start sharing forms with confidence in the LulaFi mobile app."
              : "Register as a provider and start receiving client forms in the LulaFi mobile app."}
          </p>
        </div>

        {/* Device selection */}
        <div className="grid gap-4 sm:grid-cols-2">
          {mobileOptions.map(({ icon: Icon, title, description, href, action }) => (
            <article
              key={title}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border-primary bg-bg-primary p-6 text-center shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-tertiary text-text-secondary transition-colors group-hover:bg-brand/10 group-hover:text-brand">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-xs text-text-muted">{description}</p>
              </div>
              <Button asChild className="mt-2 w-full rounded-xl font-medium">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {action}
                </a>
              </Button>
            </article>
          ))}
        </div>

        {/* Desktop secondary */}
        <Link
          to="/desktop-app"
          className="flex items-center justify-between gap-4 rounded-2xl border border-border-primary bg-bg-primary p-4 shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-tertiary text-text-muted">
              <Monitor className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-sm font-medium">Windows or Mac</h2>
              <p className="text-xs text-text-muted">Get the LulaFi desktop app for your computer</p>
            </div>
          </div>
          <span className="shrink-0 text-sm font-semibold text-brand transition-colors hover:text-brand-hover">
            Get the desktop app &rarr;
          </span>
        </Link>

        {/* Steps */}
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-center text-lg font-semibold">
            How it works
          </h2>
          <ol className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand shadow-[var(--shadow-sm)] ring-4 ring-bg-secondary">
                  {index + 1}
                </span>
                <p className="px-2 text-xs font-medium text-text-secondary">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Footer CTA */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-[var(--shadow-md)] active:scale-95">
            <Link to="/?screen=signup">Create your account</Link>
          </Button>
          <Link to="/?screen=signup" className="text-sm text-text-muted transition-colors hover:text-text-secondary">
            Back to log in
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
