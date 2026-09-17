import { Link } from "react-router-dom";

import lulafiIcon from "@/assets/lulafi-icon.png";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/landing" },
      { label: "About", to: "/about" },
      { label: "Get the app", to: "/get-app" },
      { label: "Desktop app", to: "/desktop-app" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Your data ownership", to: "/data-ownership" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", to: "/?screen=signup" },
      { label: "Create an account", to: "/?screen=signup" },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border-primary bg-bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/landing" className="flex items-center gap-2" aria-label="LulaFi home">
              <img src={lulafiIcon} alt="" className="h-8 w-10 object-contain" />
              <span className="text-xl font-bold tracking-tight">
                lula<span className="text-brand">Fi</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Fill a form once, share it only with your consent, and keep every record in one place.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link to={link.to} className="transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-primary pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} lulaFi (Pty) Ltd. All rights reserved.</span>
          <span>Smart and secure forms · South Africa</span>
        </div>
      </div>
    </footer>
  );
}
