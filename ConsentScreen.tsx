import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor } from "lucide-react";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import lulafiIcon from "@/assets/lulafi-icon.png";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import qrAppStore from "@/assets/qr-app-store.svg";
import qrGooglePlay from "@/assets/qr-google-play.svg";
import { Button } from "@/components/ui/button";

const mobileOptions = [
  {
    title: "iPhone & iPad",
    description: "Available on the App Store",
    href: "https://apps.apple.com/app/lulafi/id6753874234",
    badge: appStoreBadge,
    alt: "Download on the App Store",
  },
  {
    title: "Android",
    description: "Available on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.luladefi.app",
    badge: googlePlayBadge,
    alt: "Get it on Google Play",
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
          {mobileOptions.map(({ title, description, href, badge, alt }) => (
            <article
              key={title}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border-primary bg-bg-primary p-6 text-center shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]"
            >
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-xs text-text-muted">{description}</p>
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
                className="mt-2 block w-full max-w-[210px] transition-transform group-hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
              >
                <img
                  src={badge}
                  alt={alt}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </a>
            </article>
          ))}
        </div>

        {/* Scan to download — desktop only */}
        <section
          aria-labelledby="scan-heading"
          className="hidden flex-col items-center gap-3 rounded-2xl border border-border-primary bg-bg-primary p-8 text-center shadow-[var(--shadow-sm)] lg:flex"
        >
          <h2 id="scan-heading" className="text-lg font-semibold">
            Scan to download
          </h2>
          <p className="max-w-md text-sm text-text-secondary">
            Point your phone's camera at a code and the app store opens instantly on your device.
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-center gap-10">
            <figure className="flex flex-col items-center gap-3">
              <img
                src={qrAppStore}
                alt="QR code linking to the LulaFi app on the App Store"
                className="h-36 w-36 rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs font-medium text-text-muted">iPhone &amp; iPad</figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <img
                src={qrGooglePlay}
                alt="QR code linking to the LulaFi app on Google Play"
                className="h-36 w-36 rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs font-medium text-text-muted">Android</figcaption>
            </figure>
          </div>
        </section>

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
            <Link to={audience === "business" ? "/provider-signup" : "/?screen=signup"}>Create your account</Link>
          </Button>
          <Link to={audience === "business" ? "/provider-signup?tab=login" : "/?screen=signup"} className="text-sm text-text-muted transition-colors hover:text-text-secondary">
            Back to log in
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
