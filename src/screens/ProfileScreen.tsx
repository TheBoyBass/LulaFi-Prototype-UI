import { useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaInput } from "@/components/lulafi/LulaInput";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { useApp } from "@/context/AppContext";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const ProfileScreen = () => {
  const { navigate, displayName, setDisplayName, phone, setPhone, email, setEmail } = useApp();
  const [name, setName] = useState(displayName);
  const [phoneValue, setPhoneValue] = useState(phone);
  const [emailValue, setEmailValue] = useState(email);

  const trimmedName = name.trim();
  const trimmedPhone = phoneValue.trim();
  const trimmedEmail = emailValue.trim();

  const nameError = trimmedName.length === 0 ? "Enter your name" : trimmedName.length > 60 ? "Name is too long" : "";
  const phoneError = /^\+?[0-9 ()-]{8,20}$/.test(trimmedPhone) ? "" : "Enter a valid phone number";
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail) && trimmedEmail.length <= 255
    ? ""
    : "Enter a valid email address";

  const dirty = trimmedName !== displayName || trimmedPhone !== phone || trimmedEmail !== email;
  const valid = !nameError && !phoneError && !emailError;

  const save = () => {
    if (!valid) return;
    setDisplayName(trimmedName);
    setPhone(trimmedPhone);
    setEmail(trimmedEmail);
    toast("Profile updated", { description: "Your details will be used on new forms." });
  };

  const initials = (trimmedName || displayName).slice(0, 2).toUpperCase();

  return (
    <ScreenLayout activeTab="home" header={<AppHeader title="My profile" />}>
      <div className="px-6 pb-8 pt-2">
        <button
          onClick={() => navigate("settings")}
          aria-label="Back to settings"
          className="w-[34px] h-[34px] rounded-lg bg-bg-tertiary border border-border-primary flex items-center justify-center cursor-pointer text-text-primary"
        >
          <ChevronLeft size={18} />
        </button>

        <h1 className="mt-3 text-2xl font-semibold text-text-primary">My profile</h1>
        <p className="text-sm text-text-secondary mt-1.5">
          These details prefill the forms you send to providers.
        </p>

        <div className="mt-4 bg-bg-secondary border border-border-primary rounded-xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shrink-0">
            <span className="text-base font-semibold text-primary-foreground">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold text-text-primary truncate">
              {trimmedName || displayName}
            </div>
            <div className="text-xs text-text-muted mt-0.5 truncate">{trimmedPhone}</div>
            <LulaBadge variant="success" className="mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" /> Verified account
            </LulaBadge>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div>
            <LulaInput label="Name" value={name} maxLength={60} error={nameError} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <LulaInput
              label="Phone number"
              value={phoneValue}
              maxLength={20}
              inputMode="tel"
              error={phoneError}
              onChange={e => setPhoneValue(e.target.value)}
            />
          </div>
          <div>
            <LulaInput
              label="Email address"
              value={emailValue}
              maxLength={255}
              inputMode="email"
              error={emailError}
              onChange={e => setEmailValue(e.target.value)}
            />
          </div>
        </div>

        <LulaButton
          onClick={save}
          disabled={!valid || !dirty}
          className="w-full mt-6 rounded-full gradient-brand text-white shadow-md disabled:opacity-50"
        >
          Save changes
        </LulaButton>
      </div>
    </ScreenLayout>
  );
};

export default ProfileScreen;
