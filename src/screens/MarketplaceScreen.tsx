import { useRef, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useApp } from "@/context/AppContext";
import { z } from "zod";
import { Store, Hammer, Check, Bell, Plug, ShoppingBag, Sparkles, MailCheck, RefreshCw } from "lucide-react";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Enter your email address" })
  .email({ message: "Enter a valid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

const roadmap = [
  {
    phase: "Phase 1",
    title: "Connector SDK preview",
    window: "Q4 2026",
    status: "In progress" as const,
    detail: "Providers build and test connectors against the lulaFi form engine.",
  },
  {
    phase: "Phase 2",
    title: "Private beta",
    window: "Q1 2027",
    status: "Next" as const,
    detail: "Invited banks and municipalities publish their first connector apps.",
  },
  {
    phase: "Phase 3",
    title: "Public marketplace",
    window: "Q2 2027",
    status: "Planned" as const,
    detail: "Browse, install and manage connector apps straight from lulaFi.",
  },
];

const highlights = [
  { icon: Plug, label: "One-tap provider connections" },
  { icon: ShoppingBag, label: "Verified connector app listings" },
  { icon: Sparkles, label: "Forms that prefill themselves" },
];

type SubscribeStage = "form" | "verify" | "done";

const MarketplaceScreen = () => {
  const { navigate } = useApp();
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<SubscribeStage>("form");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const sentCode = useRef("");

  const generateCode = () => {
    sentCode.current = String(Math.floor(100000 + Math.random() * 900000));
    return sentCode.current;
  };

  const subscribe = () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setEmail(parsed.data);
    generateCode();
    setCode("");
    setCodeError("");
    setStage("verify");
  };

  const verify = () => {
    if (code.trim() !== sentCode.current) {
      setCodeError("That code doesn't match. Check your inbox and try again.");
      return;
    }
    setCodeError("");
    setStage("done");
  };

  const resend = () => {
    generateCode();
    setCode("");
    setCodeError("");
  };


  return (
    <ScreenLayout
      activeTab="home"
      header={
        <div className="px-6 pt-2 pb-3 flex items-center gap-3">
          <BackButton to="home" />
          <div>
            <h1 className="text-base font-semibold text-text-primary leading-tight">Marketplace</h1>
            <p className="text-[11px] text-text-muted">Connector apps</p>
          </div>
        </div>
      }
    >
      <div className="px-6 pb-10 flex flex-col gap-6">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-4 pt-4">
          <div className="w-20 h-20 rounded-2xl bg-brand/10 flex items-center justify-center">
            <Store size={34} className="text-brand" />
          </div>
          <LulaBadge variant="neutral">Coming soon</LulaBadge>
          <div>
            <div className="text-xl font-semibold text-text-primary">Connector apps are on the way</div>
            <p className="text-sm text-text-secondary mt-2">
              Our developers are working hard on developing the Connector apps. Be on the lookout for updates.
            </p>
          </div>
        </div>

        {/* What's coming */}
        <div className="flex flex-col gap-2">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3.5 bg-bg-secondary border border-border-primary rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand" />
              </div>
              <span className="text-sm text-text-primary">{label}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <div className="text-sm font-semibold text-text-primary mb-3">Estimated timeline</div>
          <div className="flex flex-col">
            {roadmap.map((r, i) => (
              <div key={r.phase} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                      r.status === "In progress" ? "bg-brand" : "bg-border-primary"
                    }`}
                  />
                  {i < roadmap.length - 1 && <div className="w-px flex-1 bg-border-primary my-1" />}
                </div>
                <div className={`flex-1 ${i < roadmap.length - 1 ? "pb-5" : ""}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-medium text-text-muted uppercase tracking-wide">
                      {r.phase}
                    </span>
                    <span className="text-[11px] text-text-secondary">· {r.window}</span>
                    <LulaBadge variant={r.status === "In progress" ? "success" : "neutral"}>
                      {r.status}
                    </LulaBadge>
                  </div>
                  <div className="text-sm font-medium text-text-primary mt-1">{r.title}</div>
                  <div className="text-xs text-text-muted mt-0.5">{r.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-text-muted mt-1">
            Dates are estimates and may shift as development continues.
          </p>
        </div>

        {/* Subscribe */}
        <div className="p-4 bg-bg-secondary border border-border-primary rounded-xl flex flex-col gap-3">
          {stage === "done" && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Check size={17} className="text-brand" />
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">Email verified — you're on the list</div>
                <div className="text-xs text-text-muted mt-0.5">
                  We'll email {email} the moment each phase ships.
                </div>
                <button
                  onClick={() => {
                    setStage("form");
                    setCode("");
                  }}
                  className="text-xs text-brand mt-2 underline"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}

          {stage === "verify" && (
            <>
              <div className="flex items-center gap-2">
                <MailCheck size={15} className="text-brand" />
                <span className="text-sm font-medium text-text-primary">Verify your email</span>
              </div>
              <p className="text-xs text-text-muted">
                We sent a 6-digit code to {email}. Enter it below to confirm your subscription.
              </p>
              <div className="px-3 py-2 rounded-lg bg-bg-primary border border-dashed border-border-primary text-[11px] text-text-muted">
                Demo code: <span className="font-semibold text-text-primary">{sentCode.current}</span>
              </div>
              <div>
                <label htmlFor="market-code" className="block text-xs text-text-secondary mb-1.5">
                  Verification code
                </label>
                <input
                  id="market-code"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-sm tracking-[0.3em] text-text-primary placeholder:text-text-muted placeholder:tracking-[0.3em] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                {codeError && <p className="text-xs text-destructive mt-1.5">{codeError}</p>}
              </div>
              <LulaButton onClick={verify} className="w-full rounded-full">
                Confirm subscription
              </LulaButton>
              <div className="flex items-center justify-between">
                <button onClick={resend} className="flex items-center gap-1.5 text-xs text-brand">
                  <RefreshCw size={12} /> Resend code
                </button>
                <button onClick={() => setStage("form")} className="text-xs text-text-muted underline">
                  Change email
                </button>
              </div>
            </>
          )}

          {stage === "form" && (
            <>
              <div className="flex items-center gap-2">
                <Bell size={15} className="text-brand" />
                <span className="text-sm font-medium text-text-primary">Get launch updates</span>
              </div>
              <p className="text-xs text-text-muted">
                Subscribe and we'll notify you when each phase ships.
              </p>
              <div>
                <label htmlFor="market-email" className="block text-xs text-text-secondary mb-1.5">
                  Email address
                </label>
                <input
                  id="market-email"
                  type="email"
                  inputMode="email"
                  maxLength={255}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
              </div>
              <LulaButton onClick={subscribe} className="w-full rounded-full">
                Notify me
              </LulaButton>
            </>
          )}

        </div>

        <div className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-primary rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center shrink-0">
            <Hammer size={17} className="text-text-muted" />
          </div>
          <div className="text-xs text-text-muted">
            Connector apps will let providers plug their services straight into lulaFi.
          </div>
        </div>

        <LulaButton variant="secondary" onClick={() => navigate("home")} className="w-full rounded-full">
          Back to home
        </LulaButton>
      </div>
    </ScreenLayout>
  );
};

export default MarketplaceScreen;
