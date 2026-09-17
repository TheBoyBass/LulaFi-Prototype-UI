import { useState } from "react";
import { Link } from "react-router-dom";
import { AppWindow, AppWindowMac, Download, ShieldCheck } from "lucide-react";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";

const desktopOptions = [
  {
    icon: AppWindow,
    title: "Windows",
    description: "Windows 10 and later",
    href: "https://api.lulafi.co.za/app/desktop/download/windows",
    action: "Download for Windows",
  },
  {
    icon: AppWindowMac,
    title: "Mac",
    description: "macOS 12 and later",
    href: "https://api.lulafi.co.za/app/desktop/download/mac",
    action: "Download for Mac",
  },
];

const steps = [
  "Download the installer",
  "Run the installer",
  "Sign in or create your account",
  "Your data vault syncs automatically",
];

export default function DesktopApp() {
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get the desktop app</h1>
          <p className="max-w-md leading-relaxed text-text-secondary">
            {audience === "personal"
              ? "Manage your forms and data vault from your Windows PC or Mac, with everything synced to your phone."
              : "Receive, approve and forward client submissions from your Windows PC or Mac."}
          </p>
        </div>

        {/* Download options */}
        <div className="grid gap-4 sm:grid-cols-2">
          {desktopOptions.map(({ icon: Icon, title, description, href, action }) => (
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
                <a href={href} download>
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  {action}
                </a>
              </Button>
            </article>
          ))}
        </div>

        {/* Trust note */}
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
          <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
          <span>Installers are downloaded directly from LulaFi's secure servers.</span>
        </div>

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
          <Link
            to="/get-app"
            className="text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            Looking for the mobile app instead?
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
