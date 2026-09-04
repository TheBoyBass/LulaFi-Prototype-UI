import { useEffect } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import SponsoredBanner from "@/components/lulafi/SponsoredBanner";
import { useApp } from "@/context/AppContext";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import {
  SettingsSections,
  useSettingsState,
  type SettingsSectionDef,
} from "@/components/lulafi/SettingsSections";
import { useAppearanceSettings } from "@/components/lulafi/appearanceSettings";
import {
  UserRound,
  ShieldCheck,
  SlidersHorizontal,
  Briefcase,
  Database,
  Pencil,
} from "lucide-react";

const SettingsScreen = () => {
  const { navigate, displayName, phone, email, isDark } = useApp();

  const state = useSettingsState({
    openSection: "account",
    texts: {
      fullName: displayName,
      idNumber: "9•••••••••••3",
      phone,
      email,
      address: "12 Church St, Pretoria, 0002",
    },
    selects: {
      language: "English",
      appearance: isDark ? "Dark" : "Light",
      pinTimeout: "5 minutes",
      alerts: "In-app + push",
    },
    toggles: {
      biometrics: true,
      darkMode: isDark,
      notifyForms: true,
      notifyMessages: true,
      notifyEmergency: true,
      providerMode: false,
    },
  });

  // Keep the account rows in sync with edits saved on the profile screen
  useEffect(() => {
    state.onTextChange("fullName", displayName);
    state.onTextChange("phone", phone);
    state.onTextChange("email", email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayName, phone, email]);

  const appearanceItems = useAppearanceSettings(state);


  const sections: SettingsSectionDef[] = [
    {
      id: "account",
      label: "Account & profile",
      icon: UserRound,
      items: [
        { kind: "text", id: "fullName", name: "Full name", sub: "Shown on forms you submit" },
        { kind: "text", id: "idNumber", name: "ID number", sub: "Used to verify your identity" },
        { kind: "text", id: "phone", name: "Phone number", sub: "Used for OTP sign-in" },
        { kind: "text", id: "email", name: "Email address", sub: "Form updates and receipts" },
        { kind: "text", id: "address", name: "Address", sub: "Residential and postal address" },
      ],
    },
    {
      id: "security",
      label: "Security & devices",
      icon: ShieldCheck,
      items: [
        { kind: "action", id: "vaultPin", name: "Vault PIN", sub: "Update the PIN used to unlock lulaFi", done: "Vault PIN updated" },
        { kind: "toggle", id: "biometrics", name: "Biometrics", sub: "Face ID / Touch ID" },
        { kind: "select", id: "pinTimeout", name: "Auto-lock", sub: "Lock lulaFi when idle", options: ["1 minute", "5 minutes", "15 minutes", "Never"] },
        { kind: "action", id: "devices", name: "Linked devices", sub: "Scan a QR code to link a device", done: "Device linking started" },
      ],
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: SlidersHorizontal,
      items: [
        { kind: "select", id: "language", name: "Language", sub: "App display language", options: ["English", "isiZulu", "Sesotho", "Afrikaans"] },
        ...appearanceItems,

        { kind: "toggle", id: "notifyForms", name: "Form updates", sub: "Alert when a form status changes" },
        { kind: "toggle", id: "notifyMessages", name: "lulaSEM messages", sub: "Alert on new secure messages" },
        { kind: "toggle", id: "notifyEmergency", name: "Emergency alerts", sub: "Critical alerts from providers" },
        { kind: "select", id: "alerts", name: "Delivery channel", sub: "Where alerts are sent", options: ["In-app only", "In-app + push", "In-app + SMS", "All channels"] },
      ],
    },
    {
      id: "provider",
      label: "Provider tools",
      icon: Briefcase,
      items: [
        { kind: "toggle", id: "providerMode", name: "Register as a provider", sub: "Receive forms from lulaFi users" },
        { kind: "action", id: "providerForms", name: "Provider forms", sub: "Manage forms you publish", done: "Provider forms opened" },
      ],
    },
    {
      id: "data",
      label: "Data & privacy",
      icon: Database,
      items: [
        { kind: "action", id: "dataSafe", name: "Data Safe", sub: "Review details saved on this device", done: "Data Safe opened" },
        { kind: "action", id: "export", name: "Export my data", sub: "Download a copy of your information", done: "Export queued" },
        { kind: "action", id: "terms", name: "Terms & privacy", sub: "Read our terms and privacy policy", done: "Terms & privacy opened" },
        { kind: "action", id: "clear", name: "Clear local data", sub: "Remove your Data Safe contents", danger: true, done: "Local data cleared" },
      ],
    },
  ];

  const initials = state.texts.fullName.slice(0, 2).toUpperCase();

  return (
    <ScreenLayout activeTab="home" header={<AppHeader title="Settings" />}>
      <div className="pb-8 pt-2">
        <div className="px-6">
          <SponsoredBanner onClick={() => navigate("org")} />
        </div>

        {/* Profile card */}
        <div className="px-6 mt-6">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shrink-0">
              <span className="text-base font-semibold text-primary-foreground">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-text-primary truncate">
                {state.texts.fullName}
              </div>
              <div className="text-xs text-text-muted mt-0.5">{state.texts.phone}</div>
              <LulaBadge variant="success" className="mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Active session
              </LulaBadge>
            </div>
            <button
              aria-label="Edit profile"
              onClick={() => navigate("profile")}
              className="w-9 h-9 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary shrink-0 cursor-pointer"
            >
              <Pencil size={15} />
            </button>
          </div>
        </div>

        <SettingsSections
          sections={sections}
          {...state}
          onSignOut={() => navigate("splash")}
        />
      </div>
    </ScreenLayout>
  );
};

export default SettingsScreen;
