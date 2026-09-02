
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import {
  SettingsSections,
  useSettingsState,
  type SettingsField,
  type SettingsSectionDef,
} from "@/components/lulafi/SettingsSections";
import { useAppearanceSettings } from "@/components/lulafi/appearanceSettings";
import { useApp } from "@/context/AppContext";
import { providerAccount, providerStaff } from "@/data/provider";
import {
  Building2,
  Users,
  FileText,
  Bell,
  ShieldCheck,
  Database,
  HelpCircle,
  SlidersHorizontal,
  Pencil,
} from "lucide-react";

const buildSections = (appearanceItems: SettingsField[]): SettingsSectionDef[] => [
  {
    id: "account",
    label: "Account & provider",
    icon: Building2,
    items: [
      { kind: "text", id: "orgName", name: "Business name", sub: "Shown to clients on your forms" },
      { kind: "text", id: "orgReg", name: "Registration number", sub: "CIPC / entity number" },
      { kind: "text", id: "orgEmail", name: "Contact email", sub: "Used for form notifications" },
      { kind: "text", id: "orgPhone", name: "Contact number", sub: "Support line for clients" },
    ],
  },
  {
    id: "team",
    label: "Team & access",
    icon: Users,
    items: [
      { kind: "select", id: "defaultAssignee", name: "Default assignee", sub: "Who new submissions go to", options: providerStaff.map(s => s.name) },
      { kind: "select", id: "defaultRole", name: "Default role for invites", sub: "Applied to new staff members", options: ["Reviewer", "Processor", "Administrator", "Read only"] },
      { kind: "toggle", id: "allowSelfAssign", name: "Allow staff self-assign", sub: "Staff can claim unassigned submissions" },
      { kind: "action", id: "invite", name: "Send staff invitation", sub: "Email an invite to join this provider", done: "Invitation sent" },
    ],
  },
  {
    id: "forms",
    label: "Forms & workflow",
    icon: FileText,
    items: [
      { kind: "select", id: "sla", name: "SLA target", sub: "Time to first response", options: ["8 hours", "24 hours", "48 hours", "5 days"] },
      { kind: "toggle", id: "autoRoute", name: "Auto-route submissions", sub: "Route by form type to processing groups" },
      { kind: "toggle", id: "requireNote", name: "Require note on status change", sub: "Staff must explain each update" },
      { kind: "action", id: "publishForm", name: "Publish a new form", sub: "Make a form available to clients", done: "Form builder opened" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    items: [
      { kind: "toggle", id: "notifySubmissions", name: "New submissions", sub: "Alert when a form arrives" },
      { kind: "toggle", id: "notifySem", name: "LulaSEM messages", sub: "Alert on new secure messages" },
      { kind: "toggle", id: "notifySla", name: "SLA breach warnings", sub: "Alert before a deadline is missed" },
      { kind: "select", id: "channel", name: "Delivery channel", sub: "Where alerts are sent", options: ["In-app only", "In-app + email", "In-app + SMS", "All channels"] },
    ],
  },
  {
    id: "devices",
    label: "Devices & security",
    icon: ShieldCheck,
    items: [
      { kind: "toggle", id: "twoFactor", name: "Two-factor authentication", sub: "Require a code at sign-in" },
      { kind: "select", id: "sessionTimeout", name: "Session timeout", sub: "Auto sign-out when idle", options: ["15 minutes", "30 minutes", "1 hour", "Never"] },
      { kind: "action", id: "revoke", name: "Sign out other devices", sub: "End all other active sessions", done: "Other sessions ended" },
    ],
  },
  {
    id: "data",
    label: "Data & storage",
    icon: Database,
    items: [
      { kind: "select", id: "retention", name: "Retention period", sub: "How long submissions are kept", options: ["1 year", "3 years", "5 years", "Indefinite"] },
      { kind: "toggle", id: "autoSync", name: "Background sync", sub: "Keep submissions up to date" },
      { kind: "action", id: "export", name: "Export submissions", sub: "Download a CSV of all submissions", done: "Export queued" },
      { kind: "action", id: "clearCache", name: "Clear local cache", sub: "Remove cached submission data", danger: true, done: "Local cache cleared" },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: SlidersHorizontal,
    items: [
      { kind: "select", id: "language", name: "Language", sub: "App display language", options: ["English", "isiZulu", "Sesotho", "Afrikaans"] },
      ...appearanceItems,
    ],
  },
  {
    id: "help",
    label: "Help & about",
    icon: HelpCircle,
    items: [
      { kind: "action", id: "support", name: "Contact support", sub: "Get help from the lulaFi team", done: "Support request started" },
      { kind: "action", id: "guide", name: "Provider guide", sub: "How to process forms efficiently", done: "Provider guide opened" },
    ],
  },
];

const ProviderSettingsScreen = () => {
  const { navigate, setMode, isDark } = useApp();
  const state = useSettingsState({
    openSection: "account",
    texts: {
      orgName: providerAccount.name,
      orgReg: "2019/447281/07",
      orgEmail: "forms@123examples.co.za",
      orgPhone: "+27 12 358 1000",
    },
    selects: {
      defaultAssignee: providerStaff[0]?.name ?? "Unassigned",
      defaultRole: "Reviewer",
      sla: "24 hours",
      channel: "In-app + email",
      sessionTimeout: "30 minutes",
      retention: "5 years",
      language: "English",
      appearance: isDark ? "Dark" : "Light",
    },
    toggles: {
      allowSelfAssign: true,
      autoRoute: true,
      requireNote: false,
      notifySubmissions: true,
      notifySem: true,
      notifySla: true,
      twoFactor: true,
      autoSync: true,
      darkMode: isDark,
    },
  });

  const appearanceItems = useAppearanceSettings(state);
  const sections = buildSections(appearanceItems);

  return (
    <ProviderLayout activeTab="home" title="Settings">
      <div className="pb-8 pt-2">
        {/* Profile card */}
        <div className="px-6 mt-6">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shrink-0">
              <span className="text-base font-semibold text-primary-foreground">
                {providerAccount.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-text-primary truncate">
                {state.texts.orgName}
              </div>
              <div className="text-xs text-text-muted mt-0.5">{providerAccount.role}</div>
              <LulaBadge variant="success" className="mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> {providerAccount.session}
              </LulaBadge>
            </div>
            <button
              aria-label="Edit provider profile"
              onClick={() => {
                state.setOpen("account");
                state.setEditing("orgName");
              }}
              className="w-9 h-9 rounded-full bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary shrink-0 cursor-pointer"
            >
              <Pencil size={15} />
            </button>
          </div>
        </div>

        <SettingsSections
          sections={sections}
          {...state}
          onSignOut={() => {
            setMode("client");
            navigate("splash");
          }}
        />
      </div>
    </ProviderLayout>
  );
};

export default ProviderSettingsScreen;
