import { useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import SponsoredBanner from "@/components/lulafi/SponsoredBanner";
import { useApp } from "@/context/AppContext";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import {
  ChevronDown,
  UserRound,
  ShieldCheck,
  SlidersHorizontal,
  Briefcase,
  Database,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react";

type Item = { name: string; sub?: string; value?: string; danger?: boolean };
type SectionDef = { id: string; label: string; icon: typeof UserRound; items: Item[] };

const sections: SectionDef[] = [
  {
    id: "account",
    label: "Account & profile",
    icon: UserRound,
    items: [
      { name: "Personal details", sub: "Name, ID number, date of birth" },
      { name: "Contact information", sub: "Phone number and email" },
      { name: "Address", sub: "Residential and postal address" },
    ],
  },
  {
    id: "security",
    label: "Security & devices",
    icon: ShieldCheck,
    items: [
      { name: "Vault PIN", sub: "Update the PIN used to unlock lulaFi" },
      { name: "Biometrics", sub: "Face ID / Touch ID", value: "On" },
      { name: "Linked devices", sub: "Scan a QR code to link a device" },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: SlidersHorizontal,
    items: [
      { name: "Language", value: "English" },
      { name: "Notifications", sub: "Forms, messages and emergency alerts" },
      { name: "Appearance", sub: "Light or dark theme" },
    ],
  },
  {
    id: "provider",
    label: "Provider tools",
    icon: Briefcase,
    items: [
      { name: "Register as a provider", sub: "Receive forms from lulaFi users" },
      { name: "Provider forms", sub: "Manage forms you publish" },
    ],
  },
  {
    id: "data",
    label: "Data & privacy",
    icon: Database,
    items: [
      { name: "Data Safe", sub: "Review details saved on this device" },
      { name: "Export my data", sub: "Download a copy of your information" },
      { name: "Terms & privacy", sub: "Read our terms and privacy policy" },
      { name: "Clear local data", sub: "Remove your Data Safe contents", danger: true },
    ],
  },
];

const SettingsScreen = () => {
  const { navigate, displayName } = useApp();
  const [open, setOpen] = useState<string | null>("account");

  const initials = displayName.slice(0, 2).toUpperCase();

  const toggle = (id: string) => setOpen(prev => (prev === id ? null : id));

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
              <div className="text-base font-semibold text-text-primary truncate">{displayName}</div>
              <div className="text-xs text-text-muted mt-0.5">+27 78 458 8458</div>
              <LulaBadge variant="success" className="mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Active session
              </LulaBadge>
            </div>
            <button
              aria-label="Edit profile"
              className="w-9 h-9 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary shrink-0 cursor-pointer"
            >
              <Pencil size={15} />
            </button>
          </div>
        </div>

        {/* Accordions */}
        <div className="px-6 mt-6 flex flex-col gap-3">
          {sections.map(({ id, label, icon: Icon, items }) => {
            const expanded = open === id;
            return (
              <div
                key={id}
                className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(id)}
                  aria-expanded={expanded}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-brand" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-text-primary">{label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-text-muted transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expanded && (
                  <div className="border-t border-border-primary">
                    {items.map(item => (
                      <button
                        key={item.name}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-border-primary last:border-b-0 hover:bg-brand/[0.04] transition-colors cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium ${
                              item.danger ? "text-destructive" : "text-text-primary"
                            }`}
                          >
                            {item.name}
                          </div>
                          {item.sub && (
                            <div className="text-[11px] text-text-muted mt-0.5">{item.sub}</div>
                          )}
                        </div>
                        {item.value && (
                          <span className="text-xs text-text-secondary shrink-0">{item.value}</span>
                        )}
                        <ChevronRight size={15} className="text-text-muted shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Sign out */}
          <div className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden">
            <button
              onClick={() => toggle("signout")}
              aria-expanded={open === "signout"}
              className="w-full flex items-center gap-3 px-4 py-4 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <LogOut size={17} className="text-destructive" />
              </div>
              <span className="flex-1 text-sm font-medium text-text-primary">Sign out</span>
              <ChevronDown
                size={16}
                className={`text-text-muted transition-transform duration-200 ${
                  open === "signout" ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === "signout" && (
              <div className="border-t border-border-primary p-4">
                <button
                  onClick={() => navigate("splash")}
                  className="w-full rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold py-3 cursor-pointer"
                >
                  Sign out of lulaFi
                </button>
                <div className="text-[11px] text-text-muted text-center mt-3">
                  App version 1.0.40 (40)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default SettingsScreen;
