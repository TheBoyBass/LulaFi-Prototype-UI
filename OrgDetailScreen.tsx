import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  Activity, AlertTriangle, ArrowRight, ArrowRightLeft, Bell, CalendarDays, CheckCircle2, ChevronRight, CircleHelp,
  CircleUserRound, ClipboardCheck, ExternalLink, FileText, Forward, Home, Inbox, LayoutDashboard, LogOut,
  Menu, Monitor, Share2, Users, type LucideIcon,
} from "lucide-react";

import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { PortalUser, readSession, writeSession } from "./session";

type NavItem = { to: string; label: string; icon: LucideIcon };

const NAV: Record<PortalUser["role"], NavItem[]> = {
  client: [
    { to: "/portal", label: "Home", icon: Home },
    { to: "/portal/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/portal/connections", label: "Connections", icon: Users },
    { to: "/portal/consents", label: "Consents", icon: ClipboardCheck },
    { to: "/portal/activity", label: "Activity", icon: Activity },
    { to: "/portal/profile", label: "Profile", icon: CircleUserRound },
  ],
  provider: [
    { to: "/portal", label: "Home", icon: Home },
    { to: "/portal/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/portal/submissions", label: "Submissions", icon: Inbox },
    { to: "/portal/clients", label: "Clients", icon: Users },
    { to: "/portal/activity", label: "Activity", icon: Activity },
    { to: "/portal/profile", label: "Profile", icon: CircleUserRound },
  ],
};

/* ---------- Demo data ---------- */

type Tone = "success" | "info" | "warning" | "destructive";
const toneText: Record<Tone, string> = {
  success: "text-status-success", info: "text-status-info", warning: "text-status-warning", destructive: "text-status-destructive",
};

const CLIENT_ACTIVITY: { icon: LucideIcon; tone: Tone; title: string; who: string; when: string }[] = [
  { icon: CheckCircle2, tone: "success", title: "Consent approved", who: "City of Tshwane", when: "Today, 09:15" },
  { icon: ArrowRightLeft, tone: "info", title: "Connection updated", who: "Sunrise Clinic", when: "Today, 08:42" },
  { icon: Share2, tone: "info", title: "Data shared", who: "Municipal account renewal", when: "Yesterday, 16:30" },
  { icon: AlertTriangle, tone: "destructive", title: "Consent expired", who: "Metro Insurance", when: "2 days ago" },
];

const CONNECTIONS = [
  { name: "City of Tshwane", type: "Municipality", since: "Mar 2026", status: "Active" },
  { name: "Sunrise Clinic", type: "Healthcare", since: "Jan 2026", status: "Active" },
  { name: "Pretoria Home Affairs", type: "Government", since: "Nov 2025", status: "Active" },
  { name: "Metro Insurance", type: "Insurance", since: "Aug 2025", status: "Paused" },
];

const INITIAL_CONSENTS = [
  { id: "c1", org: "City of Tshwane", fields: "Full name, ID number, Home address, Account number", expires: "23 Dec 2026", active: true },
  { id: "c2", org: "Sunrise Clinic", fields: "Full name, Date of birth, Medical aid", expires: "10 Nov 2026", active: true },
  { id: "c3", org: "Pretoria Home Affairs", fields: "Full name, ID number", expires: "01 Feb 2027", active: true },
  { id: "c4", org: "Metro Insurance", fields: "Full name, Phone, Email", expires: "Expired", active: false },
];

type SubStatus = "New" | "Approved" | "Forwarded";
const INITIAL_SUBMISSIONS: { id: string; client: string; form: string; received: string; status: SubStatus }[] = [
  { id: "REF-1042", client: "Lindo Sibeko", form: "Municipal account renewal", received: "Today, 09:12", status: "New" },
  { id: "REF-1041", client: "The Boy Bass", form: "Water meter query", received: "Today, 07:48", status: "New" },
  { id: "REF-1038", client: "Naledi Khumalo", form: "Rates clearance", received: "Yesterday, 15:20", status: "Approved" },
  { id: "REF-1033", client: "Sipho Dlamini", form: "Municipal account renewal", received: "2 days ago", status: "Forwarded" },
];

const CLIENTS = [
  { name: "Lindo Sibeko", forms: 3, last: "Today" },
  { name: "The Boy Bass", forms: 2, last: "Today" },
  { name: "Naledi Khumalo", forms: 5, last: "Yesterday" },
  { name: "Sipho Dlamini", forms: 1, last: "2 days ago" },
];

/* ---------- Shared UI ---------- */

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-lg border border-border-primary bg-bg-primary p-6 shadow-[var(--shadow-sm)]", className)}>{children}</div>;
}

function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase text-brand-foreground">LulaFi web portal</p>
      <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{title}</h1>
      {sub && <p className="mt-2 text-sm text-text-secondary sm:text-base">{sub}</p>}
    </div>
  );
}

function Stat({ label, value, note, tone }: { label: string; value: number; note: string; tone: "brand" | "accent" | "warning" }) {
  const styles = {
    brand: "bg-surface-selected text-content-selected",
    accent: "bg-tone-info-surface text-status-info",
    warning: "bg-tone-warning-surface text-status-warning",
  }[tone];
  return (
    <div className={cn("rounded-lg border border-border-primary bg-bg-primary p-5 shadow-[var(--shadow-sm)]", styles)}>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-3 text-3xl font-bold tabular-nums text-text-primary">{value}</p>
      <p className="mt-2 text-sm font-medium">{note}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: "bg-tone-warning-surface text-status-warning",
    Approved: "bg-tone-info-surface text-status-info",
    Forwarded: "bg-tone-success-surface text-status-success",
    Active: "bg-tone-success-surface text-status-success",
    Paused: "bg-bg-tertiary text-text-secondary",
    Revoked: "bg-tone-danger-surface text-status-destructive",
  };
  return <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", map[status])}>{status}</span>;
}

/* ---------- Screens ---------- */

function ChooseExperience({ user }: { user: PortalUser }) {
  const client = user.role === "client";
  return (
    <>
      <PageTitle title={`Welcome back, ${user.firstName}`} sub="Choose how you want to use lulaFi today." />
      <div className="grid gap-5 md:grid-cols-2">
        <Link to="/desktop-app" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Card className="flex h-full flex-col transition-all duration-200 group-hover:border-brand/50 group-hover:shadow-[var(--shadow-md)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-selected text-content-selected transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
            <Monitor className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-text-primary">LulaFi Desktop App</h2>
          <p className="mt-2 flex-1 text-sm text-text-secondary">
            {client
              ? "A powerful, full-screen experience to fill forms, manage your data vault and review every submission."
              : "A powerful, data-rich workspace to receive, approve and forward client submissions."}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-foreground">Open desktop app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Card>
        </Link>
        <Link to="/portal/overview" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Card className="flex h-full flex-col transition-all duration-200 group-hover:border-brand/50 group-hover:shadow-[var(--shadow-md)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-tone-info-surface text-status-info transition-colors group-hover:bg-info group-hover:text-tone-info-on-solid">
            <FileText className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-text-primary">LulaFi Portal</h2>
          <p className="mt-2 flex-1 text-sm text-text-secondary">
            {client
              ? "A streamlined way to manage consents, connections and account settings from any browser."
              : "A streamlined way to track submissions, clients and your organisation's account."}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-foreground">Go to portal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Card>
        </Link>
      </div>
      <div className="mt-6 flex items-start gap-4 rounded-lg border border-border-primary bg-bg-primary p-5">
        <CircleHelp className="h-10 w-10 shrink-0 text-status-info" strokeWidth={1.5} />
        <div>
          <p className="font-semibold text-text-primary">Not sure which to use?</p>
          <p className="mt-1 text-sm text-text-secondary">
            The <strong>Desktop App</strong> is ideal for {client ? "filling and reviewing forms" : "processing high volumes of submissions"}.
            The <strong>Portal</strong> is great for {client ? "managing consents and sharing" : "quick checks and approvals on the go"}.
          </p>
        </div>
      </div>
    </>
  );
}

function ActivityList({ items }: { items: typeof CLIENT_ACTIVITY }) {
  return (
    <ul className="divide-y divide-border-primary">
      {items.map(a => (
        <li key={a.title + a.when} className="flex items-start gap-3 py-3">
          <a.icon className={cn("mt-0.5 h-5 w-5", toneText[a.tone])} />
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{a.title}</p>
            <p className="text-sm text-text-secondary">{a.who}</p>
          </div>
          <span className="text-xs text-text-muted">{a.when}</span>
        </li>
      ))}
    </ul>
  );
}

function QuickActions({ items }: { items: NavItem[] }) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-text-primary">Quick actions</h2>
      <ul className="mt-3">
        {items.map(q => (
          <li key={q.label}>
            <Link to={q.to} className="flex items-center gap-3 rounded-lg py-2.5 text-sm text-text-primary hover:text-brand-foreground">
              <q.icon className="h-4 w-4 text-text-secondary" />
              <span className="flex-1">{q.label}</span>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HelpCard() {
  return (
    <div className="rounded-lg border border-border-primary bg-bg-primary p-6 shadow-[var(--shadow-sm)]">
      <p className="font-semibold text-text-primary">Need help?</p>
      <Link to="/contact" className="mt-2 flex items-center justify-between text-sm font-medium text-status-info">
        Visit our Help Centre <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ClientOverview({ consents }: { consents: typeof INITIAL_CONSENTS }) {
  return (
    <>
      <PageTitle title="Overview" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Connections" value={CONNECTIONS.filter(c => c.status === "Active").length} note="Active" tone="brand" />
        <Stat label="Consents" value={consents.filter(c => c.active).length} note="Active" tone="accent" />
        <Stat label="Requests" value={2} note="Pending" tone="warning" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text-primary">Recent activity</h2>
            <Link to="/portal/activity" className="text-sm font-medium text-brand-foreground">View all</Link>
          </div>
          <ActivityList items={CLIENT_ACTIVITY} />
        </Card>
        <div className="flex flex-col gap-6">
          <QuickActions items={[
            { to: "/portal/connections", label: "Add connection", icon: Users },
            { to: "/portal/consents", label: "View consents", icon: ClipboardCheck },
            { to: "/portal/profile", label: "Manage profile", icon: CircleUserRound },
          ]} />
          <HelpCard />
        </div>
      </div>
    </>
  );
}

function ProviderOverview({ subs }: { subs: typeof INITIAL_SUBMISSIONS }) {
  const count = (s: SubStatus) => subs.filter(x => x.status === s).length;
  return (
    <>
      <PageTitle title="Overview" sub="City of Tshwane · Municipal services" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="New submissions" value={count("New")} note="Awaiting approval" tone="warning" />
        <Stat label="Approved" value={count("Approved")} note="Ready to forward" tone="accent" />
        <Stat label="Forwarded" value={count("Forwarded")} note="Sent to departments" tone="brand" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text-primary">Latest submissions</h2>
            <Link to="/portal/submissions" className="text-sm font-medium text-brand-foreground">View all</Link>
          </div>
          <ul className="divide-y divide-border-primary">
            {subs.map(s => (
              <li key={s.id} className="flex items-center gap-3 py-3">
                <FileText className="h-5 w-5 text-text-secondary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{s.form}</p>
                  <p className="text-sm text-text-secondary">{s.client} · {s.id}</p>
                </div>
                <StatusPill status={s.status} />
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="flex items-center gap-2 text-base font-semibold text-text-primary"><CalendarDays className="h-4 w-4 text-brand-foreground" /> Today's schedule</h2>
            <ul className="mt-3 space-y-3 text-sm">
              <li><span className="font-medium text-text-primary">10:00</span> <span className="text-text-secondary">· Account review, Lindo Sibeko</span></li>
              <li><span className="font-medium text-text-primary">13:30</span> <span className="text-text-secondary">· Rates team stand-up</span></li>
            </ul>
          </Card>
          <QuickActions items={[
            { to: "/portal/submissions", label: "Review submissions", icon: Inbox },
            { to: "/portal/clients", label: "View clients", icon: Users },
            { to: "/portal/profile", label: "Organisation profile", icon: CircleUserRound },
          ]} />
          <HelpCard />
        </div>
      </div>
    </>
  );
}

function Connections() {
  return (
    <>
      <PageTitle title="Connections" sub="Organisations you've connected with through lulaFi." />
      <div className="grid gap-4 md:grid-cols-2">
        {CONNECTIONS.map(c => (
          <Card key={c.name} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 font-bold text-brand-foreground">{c.name[0]}</div>
            <div className="flex-1">
              <p className="font-semibold text-text-primary">{c.name}</p>
              <p className="text-sm text-text-secondary">{c.type} · since {c.since}</p>
            </div>
            <StatusPill status={c.status} />
          </Card>
        ))}
      </div>
    </>
  );
}

function Consents({ consents, onRevoke }: { consents: typeof INITIAL_CONSENTS; onRevoke: (id: string) => void }) {
  return (
    <>
      <PageTitle title="Consents" sub="See exactly which details each organisation can use, and withdraw access at any time." />
      <div className="flex flex-col gap-4">
        {consents.map(c => (
          <Card key={c.id} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-text-primary">{c.org}</p>
                <StatusPill status={c.active ? "Active" : "Revoked"} />
              </div>
              <p className="mt-1 text-sm text-text-secondary">{c.fields}</p>
              <p className="mt-1 text-xs text-text-muted">Expires: {c.expires}</p>
            </div>
            {c.active && <Button variant="outline" onClick={() => onRevoke(c.id)}>Withdraw consent</Button>}
          </Card>
        ))}
      </div>
    </>
  );
}

function Submissions({ subs, onAdvance }: { subs: typeof INITIAL_SUBMISSIONS; onAdvance: (id: string) => void }) {
  return (
    <>
      <PageTitle title="Submissions" sub="Approve client submissions, then forward them to the right department." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-primary text-text-secondary">
            <tr>{["Reference", "Client", "Form", "Received", "Status", ""].map(h => <th key={h} className="px-6 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border-primary">
            {subs.map(s => (
              <tr key={s.id}>
                <td className="px-6 py-4 font-mono text-text-primary">{s.id}</td>
                <td className="px-6 py-4 text-text-primary">{s.client}</td>
                <td className="px-6 py-4 text-text-secondary">{s.form}</td>
                <td className="px-6 py-4 text-text-secondary">{s.received}</td>
                <td className="px-6 py-4"><StatusPill status={s.status} /></td>
                <td className="px-6 py-4 text-right">
                  {s.status === "New" && <Button size="sm" onClick={() => onAdvance(s.id)}><CheckCircle2 /> Approve</Button>}
                  {s.status === "Approved" && <Button size="sm" variant="outline" onClick={() => onAdvance(s.id)}><Forward /> Forward</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function Clients() {
  return (
    <>
      <PageTitle title="Clients" sub="People who have shared forms with City of Tshwane." />
      <div className="grid gap-4 md:grid-cols-2">
        {CLIENTS.map(c => (
          <Card key={c.name} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-identity-1 font-bold text-media-foreground">{c.name[0]}</div>
            <div className="flex-1">
              <p className="font-semibold text-text-primary">{c.name}</p>
              <p className="text-sm text-text-secondary">{c.forms} submissions · last {c.last}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ActivityPage({ user, subs }: { user: PortalUser; subs: typeof INITIAL_SUBMISSIONS }) {
  const items = user.role === "client"
    ? CLIENT_ACTIVITY
    : subs.map(s => ({
        icon: s.status === "Forwarded" ? Forward : s.status === "Approved" ? CheckCircle2 : Inbox,
        tone: (s.status === "New" ? "warning" : "success") as Tone,
        title: `${s.form} ${s.status === "New" ? "received" : s.status.toLowerCase()}`,
        who: `${s.client} · ${s.id}`,
        when: s.received,
      }));
  return (
    <>
      <PageTitle title="Activity" sub="A full record of everything that's happened on your account." />
      <Card><ActivityList items={items} /></Card>
    </>
  );
}

function Profile({ user, onSave }: { user: PortalUser; onSave: (u: PortalUser) => void }) {
  const [form, setForm] = useState({ displayName: user.displayName, email: user.email, phone: user.phone });
  return (
    <>
      <PageTitle title="Profile" sub={user.role === "provider" ? `${user.organisation} · provider account` : "Your personal lulaFi account"} />
      <Card className="max-w-xl">
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            onSave({ ...user, ...form });
            toast({ title: "Profile saved" });
          }}
        >
          <div className="flex flex-col gap-2"><Label>Username</Label><Input value={user.username} disabled /></div>
          {(["displayName", "email", "phone"] as const).map(k => (
            <div key={k} className="flex flex-col gap-2">
              <Label htmlFor={k}>{{ displayName: "Display name", email: "Email", phone: "Phone" }[k]}</Label>
              <Input id={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <Button type="submit" className="self-start">Save changes</Button>
        </form>
      </Card>
    </>
  );
}

/* ---------- Layout ---------- */

export default function Portal() {
  const navigate = useNavigate();
  const [user, setUser] = useState<PortalUser | null>(() => readSession());
  const [open, setOpen] = useState(false);
  const [consents, setConsents] = useState(INITIAL_CONSENTS);
  const [subs, setSubs] = useState(INITIAL_SUBMISSIONS);

  useEffect(() => { if (user) writeSession(user); }, [user]);

  if (!user) return <Navigate to="/portal/login" replace />;

  const logout = () => { writeSession(null); setUser(null); navigate("/portal/login"); };

  const advance = (id: string) => {
    setSubs(prev => prev.map(s => {
      if (s.id !== id) return s;
      const next: SubStatus = s.status === "New" ? "Approved" : "Forwarded";
      toast({ title: next === "Approved" ? `${id} approved` : `${id} forwarded to City of Tshwane` });
      return { ...s, status: next };
    }));
  };

  const revoke = (id: string) => {
    setConsents(prev => prev.map(c => (c.id === id ? { ...c, active: false, expires: "Withdrawn today" } : c)));
    toast({ title: "Consent withdrawn" });
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-bg-primary text-text-secondary">
      <div className="flex h-16 items-center justify-between border-b border-border-primary px-6">
        <Link to="/landing" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <img src={lulafiIcon} alt="" className="h-8 w-8" />
          <span className="text-xl font-bold text-text-primary">lula<span className="text-brand">Fi</span></span>
        </Link>

      </div>
      <div className="px-6 pb-2 pt-6">
        <p className="text-xs font-semibold uppercase text-text-muted">{user.role === "provider" ? "Business" : "Personal"}</p>
        <p className="mt-1 truncate text-sm font-semibold text-text-primary">{user.organisation ?? user.displayName}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-4 py-3" aria-label="Portal navigation">
        {NAV[user.role].map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) => cn(
              "flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "bg-surface-selected text-content-selected" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
            )}
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </NavLink>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary">
          <CircleHelp className="h-4 w-4" /> Help
        </Link>
      </nav>
      <div className="border-t border-border-primary p-4">
        <Link to="/portal/profile" onClick={() => setOpen(false)} className="mb-2 flex items-center gap-3 rounded-md p-2 hover:bg-bg-secondary">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-foreground">{user.displayName.charAt(0)}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-text-primary">{user.displayName}</p><p className="truncate text-xs text-text-muted">{user.email}</p></div>
        </Link>
        <Button variant="ghost" onClick={logout} className="h-11 w-full justify-start px-2 text-text-secondary hover:text-status-destructive">
          <LogOut className="h-4 w-4" /> Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh w-full bg-bg-secondary">
      <aside className="hidden w-64 shrink-0 border-r border-border-primary lg:block">{sidebar}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border-primary bg-bg-primary px-4 sm:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label="Open menu"><Menu aria-hidden="true" className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 overflow-y-auto p-0" aria-describedby={undefined}>
              <SheetTitle className="sr-only">Portal navigation menu</SheetTitle>
              {sidebar}
            </SheetContent>
          </Sheet>
          <p className="hidden text-base font-semibold text-text-primary lg:block">
            {user.role === "provider" ? "Provider portal" : "Personal portal"}
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Link to="/portal/profile" className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <CircleUserRound className="h-6 w-6 text-text-secondary" />
              <span className="hidden sm:inline">{user.displayName}</span>
            </Link>
          </div>
        </header>
        <main id="portal-main" className="flex-1 p-4 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <Routes>
              <Route index element={<ChooseExperience user={user} />} />
              <Route path="overview" element={user.role === "client" ? <ClientOverview consents={consents} /> : <ProviderOverview subs={subs} />} />
              <Route path="activity" element={<ActivityPage user={user} subs={subs} />} />
              <Route path="profile" element={<Profile user={user} onSave={setUser} />} />
              {user.role === "client" ? (
                <>
                  <Route path="connections" element={<Connections />} />
                  <Route path="consents" element={<Consents consents={consents} onRevoke={revoke} />} />
                </>
              ) : (
                <>
                  <Route path="submissions" element={<Submissions subs={subs} onAdvance={advance} />} />
                  <Route path="clients" element={<Clients />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/portal" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
