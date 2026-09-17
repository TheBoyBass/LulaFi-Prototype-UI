import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";

import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LandingAudience = "personal" | "business";

interface LandingHeaderProps {
  audience: LandingAudience;
  onAudienceChange: (audience: LandingAudience) => void;
  activePage?: "home" | "about";
}

interface LandingNavItem {
  label: string;
  to: string;
  key?: "home" | "about";
}

const navigation: LandingNavItem[] = [
  { label: "Home", to: "/landing", key: "home" },
  { label: "About", to: "/about", key: "about" },
  { label: "How it Works", to: "/landing#how-it-works" },
  { label: "Guides", to: "/landing#guides" },
  { label: "Resources", to: "/landing#resources" },
  { label: "Contact", to: "/landing#contact" },
];

export default function LandingHeader({ audience, onAudienceChange, activePage }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary/95 backdrop-blur">
      <div className="border-b border-border-primary bg-bg-secondary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center" aria-label="Choose your LulaFi experience">
            {(["personal", "business"] as LandingAudience[]).map((key) => (
              <Button
                key={key}
                type="button"
                variant="ghost"
                onClick={() => onAudienceChange(key)}
                aria-pressed={audience === key}
                className={cn(
                  "relative h-10 rounded-none px-3 text-sm capitalize hover:bg-transparent",
                  audience === key
                    ? "text-text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                {key}
              </Button>
            ))}
          </div>
          <div className="hidden items-center gap-4 text-sm text-text-muted sm:flex">
            <Link to="/landing#help" className="transition-colors hover:text-text-primary">Help</Link>
            <Link to="/landing#search" className="inline-flex items-center gap-1.5 transition-colors hover:text-text-primary">
              <Search aria-hidden="true" className="h-4 w-4" /> Search
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/landing" className="flex shrink-0 items-center gap-2" aria-label="LulaFi home">
          <img src={lulafiIcon} alt="" className="h-8 w-10 object-contain" />
          <span className="text-2xl font-semibold">
            lula<span className="text-brand">Fi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-current={activePage === item.key ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                activePage === item.key ? "text-brand" : "text-text-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/?screen=signup">Log in</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/get-app">{audience === "personal" ? "Get the app" : "Become a provider"}</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
            <Menu aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}