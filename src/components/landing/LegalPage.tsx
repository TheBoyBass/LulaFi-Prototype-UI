import { useState } from "react";
import { Link } from "react-router-dom";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

const related = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Terms of service", to: "/terms" },
  { label: "Your data ownership", to: "/data-ownership" },
];

export default function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  const [audience, setAudience] = useState<LandingAudience>("personal");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} />

      <main>
        <section className="border-b border-border-primary bg-bg-secondary">
          <div className="mx-auto max-w-3xl px-6 py-14 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">{intro}</p>
            <p className="mt-6 text-sm text-text-muted">Last updated {updated}</p>
          </div>
        </section>


        <div className="mx-auto max-w-3xl px-6 py-14 lg:py-16">
          <nav aria-label="On this page" className="mb-12 rounded-2xl border border-border-primary bg-bg-secondary p-6 shadow-[var(--shadow-sm)]">
            <p className="text-sm font-semibold">On this page</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${slug(section.heading)}`} className="transition-colors hover:text-brand">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading} id={slug(section.heading)} aria-labelledby={`${slug(section.heading)}-heading`}>
                <h2 id={`${slug(section.heading)}-heading`} className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-text-secondary">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="mt-16 rounded-2xl border border-border-primary bg-bg-secondary p-6 shadow-[var(--shadow-sm)]">
            <p className="font-semibold">Related pages</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {related
                .filter((item) => item.label.toLowerCase() !== title.toLowerCase())
                .map((item) => (
                  <Link key={item.to} to={item.to} className="text-brand transition-colors hover:underline">
                    {item.label}
                  </Link>
                ))}
              <Link to="/about" className="text-brand transition-colors hover:underline">
                About LulaFi
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
