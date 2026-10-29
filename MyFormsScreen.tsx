import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Building2, Loader2, ShieldCheck } from "lucide-react";

import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader, { LandingAudience } from "@/components/landing/LandingHeader";
import lulafiIcon from "@/assets/lulafi-icon.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

const ACCOUNT_KEY = "lulafi.providerAccount";
const DEMO_CODE = "123456";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^(\+27|0)[1-9]\d{8}$/, "Enter a valid South African number, e.g. 082 445 9012")
  .transform(v => v.replace(/\s/g, ""));

const signupSchema = z.object({
  organisation: z.string().trim().min(2, "Enter your organisation name").max(100),
  contactName: z.string().trim().min(2, "Enter the contact person's name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: phoneSchema,
  password: z.string().min(8, "Use at least 8 characters").max(72),
});

type Mode = "signup" | "login";
type Step = "details" | "verify";
type Errors = Partial<Record<string, string>>;

interface StoredAccount {
  organisation: string;
  contactName: string;
  email: string;
  phone: string;
}

const normalisePhone = (value: string) => value.replace(/\s/g, "");

const readAccount = (): StoredAccount | null => {
  try {
    const raw = window.localStorage.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount) : null;
  } catch {
    return null;
  }
};

const enterDashboardInbox = () => {
  try {
    window.localStorage.setItem("lulafi.mode", "provider");
    window.localStorage.setItem("lulafi.providerScreen", "pinbox");
  } catch { /* storage unavailable */ }
  window.location.assign("/?mode=provider&ptab=inbox");
};

function Field({
  id, label, error, ...props
}: { id: string; label: string; error?: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-invalid={Boolean(error)} className={cn(error && "border-destructive")} {...props} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function ProviderSignup() {
  const [params] = useSearchParams();
  const [audience, setAudience] = useState<LandingAudience>("business");
  const [mode, setMode] = useState<Mode>(params.get("tab") === "login" ? "login" : "signup");
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({ organisation: "", contactName: "", email: "", phone: "", password: "" });
  const [loginPhone, setLoginPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<StoredAccount | null>(null);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn(s => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const switchMode = (next: Mode) => {
    setMode(next);
    setStep("details");
    setErrors({});
    setCode("");
    setCodeError("");
  };

  const sendCode = (account: StoredAccount) => {
    setPending(account);
    setStep("verify");
    setCode("");
    setCodeError("");
    setResendIn(30);
  };

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ ...form, phone: normalisePhone(form.phone) });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0]])));
      return;
    }
    setErrors({});
    const { password: _password, ...account } = parsed.data;
    sendCode(account as StoredAccount);
  };

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = phoneSchema.safeParse(normalisePhone(loginPhone));
    if (!parsed.success) {
      setErrors({ loginPhone: parsed.error.issues[0].message });
      return;
    }
    const existing = readAccount();
    if (!existing || normalisePhone(existing.phone) !== parsed.data) {
      setErrors({ loginPhone: "No provider account uses this number yet. Create one instead." });
      return;
    }
    setErrors({});
    sendCode(existing);
  };

  const verify = (value: string) => {
    if (value.length < 6 || !pending) return;
    if (value !== DEMO_CODE) {
      setCodeError("That code is incorrect. Try again.");
      setCode("");
      return;
    }
    setBusy(true);
    if (mode === "signup") {
      try { window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(pending)); } catch { /* ignore */ }
    }
    window.setTimeout(enterDashboardInbox, 600);
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-primary">
      <LandingHeader audience={audience} onAudienceChange={setAudience} />

      <main className="mx-auto flex max-w-md flex-col gap-8 px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={lulafiIcon} alt="" className="h-10 w-12 object-contain" />
          <h1 className="text-3xl font-bold tracking-tight">
            {step === "verify" ? "Verify your phone" : mode === "signup" ? "Create a provider account" : "Provider log in"}
          </h1>
          <p className="text-sm leading-relaxed text-text-secondary">
            {step === "verify"
              ? `Enter the 6-digit code sent to ${pending?.phone}.`
              : mode === "signup"
                ? "Register your organisation to start receiving client submissions."
                : "Log in with the phone number on your provider account."}
          </p>
        </div>

        <section className="rounded-2xl border border-border-primary bg-bg-primary p-6 shadow-[var(--shadow-sm)]">
          {step === "details" && (
            <div className="mb-6 grid grid-cols-2 rounded-xl bg-bg-tertiary p-1">
              {(["signup", "login"] as Mode[]).map(m => (
                <Button
                  key={m}
                  type="button"
                  variant="ghost"
                  onClick={() => switchMode(m)}
                  aria-pressed={mode === m}
                  className={cn("h-9 rounded-lg", mode === m ? "bg-bg-primary shadow-[var(--shadow-sm)]" : "text-text-muted")}
                >
                  {m === "signup" ? "Sign up" : "Log in"}
                </Button>
              ))}
            </div>
          )}

          {step === "details" && mode === "signup" && (
            <form onSubmit={submitSignup} className="flex flex-col gap-4" noValidate>
              <Field id="organisation" label="Organisation name" placeholder="City of Tshwane" value={form.organisation} onChange={update("organisation")} error={errors.organisation} />
              <Field id="contactName" label="Contact person" placeholder="Full name" value={form.contactName} onChange={update("contactName")} error={errors.contactName} />
              <Field id="email" type="email" label="Work email" placeholder="you@organisation.co.za" value={form.email} onChange={update("email")} error={errors.email} />
              <Field id="phone" type="tel" label="Phone number" placeholder="082 445 9012" value={form.phone} onChange={update("phone")} error={errors.phone} />
              <Field id="password" type="password" label="Password" placeholder="At least 8 characters" value={form.password} onChange={update("password")} error={errors.password} />
              <Button type="submit" className="mt-2 w-full rounded-xl">Send verification code</Button>
              <p className="text-center text-xs text-text-muted">
                By continuing you agree to our <Link to="/terms" className="text-brand">Terms</Link> and <Link to="/privacy" className="text-brand">Privacy policy</Link>.
              </p>
            </form>
          )}

          {step === "details" && mode === "login" && (
            <form onSubmit={submitLogin} className="flex flex-col gap-4" noValidate>
              <Field id="loginPhone" type="tel" label="Phone number" placeholder="082 445 9012" value={loginPhone} onChange={e => setLoginPhone(e.target.value)} error={errors.loginPhone} />
              <Button type="submit" className="w-full rounded-xl">Send code</Button>
            </form>
          )}

          {step === "verify" && (
            <div className="flex flex-col items-center gap-5">
              <InputOTP maxLength={6} value={code} onChange={v => { setCode(v); setCodeError(""); verify(v); }} disabled={busy} autoFocus>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
                </InputOTPGroup>
              </InputOTP>
              {codeError && <p className="text-xs text-destructive">{codeError}</p>}
              {busy ? (
                <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Opening your inbox
                </p>
              ) : (
                <p className="rounded-lg bg-brand/10 px-3 py-2 text-xs text-brand">Demo code: {DEMO_CODE}</p>
              )}
              <div className="flex w-full items-center justify-between text-sm">
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep("details")} disabled={busy}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </Button>
                <Button type="button" variant="ghost" size="sm" disabled={resendIn > 0 || busy} onClick={() => setResendIn(30)}>
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                </Button>
              </div>
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3 text-sm text-text-secondary">
          <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-brand" aria-hidden="true" /> New submissions land straight in your inbox.</p>
          <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" /> Every submission comes with the client's consent record.</p>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
