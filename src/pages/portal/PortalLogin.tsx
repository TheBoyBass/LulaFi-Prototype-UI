import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Building2, CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck, UserRound } from "lucide-react";

import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DEMO_PASSWORD, DEMO_USERS, PortalRole, findDemoUser, writeSession } from "./session";

export default function PortalLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<PortalRole>(params.get("as") === "provider" ? "provider" : "client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findDemoUser(username, password);
    if (!user) return setError("Incorrect username or password. Use one of the demo accounts below.");
    writeSession(user);
    navigate("/portal");
  };

  const fillDemo = (r: PortalRole) => {
    setRole(r);
    setUsername(DEMO_USERS[r].username);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  return (
    <div className="grid min-h-screen bg-bg-primary lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.8fr)]">
      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-md">
        <Link to="/landing" className="mb-10 flex items-center gap-2" aria-label="LulaFi home">
          <img src={lulafiIcon} alt="" className="h-9 w-9" />
          <span className="text-2xl font-bold text-text-primary">lula<span className="text-brand">Fi</span></span>
        </Link>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-brand">Secure web portal</p>
          <h1 className="text-3xl font-bold text-text-primary">Welcome back</h1>
          <p className="mt-2 text-base text-text-secondary">Log in to manage your forms, consents and submissions.</p>

          <div className="mt-8 grid grid-cols-2 gap-1 rounded-lg bg-bg-secondary p-1" aria-label="Choose portal type">
            {(["client", "provider"] as PortalRole[]).map(r => (
              <Button
                key={r}
                type="button"
                variant="ghost"
                onClick={() => fillDemo(r)}
                aria-pressed={role === r}
                className={cn(
                  "h-11 rounded-md text-sm",
                  role === r ? "bg-bg-primary text-text-primary shadow-[var(--shadow-sm)] hover:bg-bg-primary" : "text-text-secondary hover:bg-bg-tertiary",
                )}
              >
                {r === "client" ? <UserRound className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                {r === "client" ? "Personal" : "Business"}
              </Button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" className="h-11 bg-bg-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className="h-11 bg-bg-primary pr-12" />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-11 w-11 text-text-muted" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
            <Button type="submit" className="h-11 w-full">Log in</Button>
          </form>

          <div className="mt-6 rounded-lg border border-border-primary bg-bg-secondary p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <KeyRound className="h-4 w-4 text-brand" /> Demo accounts
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {(["client", "provider"] as PortalRole[]).map(r => (
                <Button
                  key={r}
                  type="button"
                  variant="ghost"
                  onClick={() => fillDemo(r)}
                  className="h-auto min-h-12 w-full justify-between rounded-md bg-bg-primary px-3 py-2 text-left text-sm hover:bg-bg-tertiary"
                >
                  <span>
                    <span className="font-medium text-text-primary">{DEMO_USERS[r].username}</span>
                    <span className="block text-xs text-text-secondary">
                      {r === "client" ? "Client portal" : "Provider portal · City of Tshwane"}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-text-muted">{DEMO_PASSWORD}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-text-secondary">
          New to lulaFi? <Link to="/get-app" className="font-medium text-brand-foreground">Get the app</Link>
        </p>
      </div>
      </main>
      <aside className="relative hidden overflow-hidden bg-portal-sidebar p-12 text-portal-sidebar-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foundation-teal/15 text-foundation-teal"><ShieldCheck className="h-6 w-6" /></div>
          <h2 className="mt-8 max-w-md text-3xl font-bold">Your forms, permissions and submissions in one secure place.</h2>
          <p className="mt-4 max-w-md text-base text-portal-sidebar-foreground/70">The LulaFi portal gives people and providers a clear record of every connection and action.</p>
        </div>
        <ul className="relative z-10 space-y-4 text-sm">
          {["Review data-sharing consent", "Track form activity", "Manage personal or provider details"].map(item => (
            <li key={item} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-foundation-teal" />{item}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
