import ScreenLayout from "@/components/lulafi/ScreenLayout";
import Logo from "@/components/lulafi/Logo";
import { useApp } from "@/context/AppContext";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { LulaInput } from "@/components/lulafi/LulaInput";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import { ChevronRight, Link, Globe, Database, Trash2, HelpCircle, ClipboardList, Lock, Info, Shield, Key, User, Phone } from "lucide-react";
import { ReactNode } from "react";

interface IconConfig {
  icon: ReactNode;
  bg: string;
}

const ICONS: Record<string, IconConfig> = {
  link: { icon: <Link size={18} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-50 dark:bg-blue-900/20" },
  globe: { icon: <Globe size={18} className="text-emerald-600 dark:text-emerald-400" />, bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  database: { icon: <Database size={18} className="text-indigo-600 dark:text-indigo-400" />, bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  trash: { icon: <Trash2 size={18} className="text-red-600 dark:text-red-400" />, bg: "bg-red-50 dark:bg-red-900/20" },
  help: { icon: <HelpCircle size={18} className="text-amber-600 dark:text-amber-400" />, bg: "bg-amber-50 dark:bg-amber-900/20" },
  clipboard: { icon: <ClipboardList size={18} className="text-sky-600 dark:text-sky-400" />, bg: "bg-sky-50 dark:bg-sky-900/20" },
  lock: { icon: <Lock size={18} className="text-violet-600 dark:text-violet-400" />, bg: "bg-violet-50 dark:bg-violet-900/20" },
  info: { icon: <Info size={18} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-50 dark:bg-blue-900/20" },
  shield: { icon: <Shield size={18} className="text-teal-600 dark:text-teal-400" />, bg: "bg-teal-50 dark:bg-teal-900/20" },
  key: { icon: <Key size={18} className="text-orange-600 dark:text-orange-400" />, bg: "bg-orange-50 dark:bg-orange-900/20" },
};

const SettingsScreen = () => {
  const { navigate, displayName, setDisplayName } = useApp();

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <div className="text-sm font-semibold text-text-primary mb-3">{label}</div>
      <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden shadow-sm">{children}</div>
    </div>
  );

  const Row = ({ iconKey, name, sub, onClick, danger, toggle }: { iconKey: string; name: string; sub: string; onClick?: () => void; danger?: boolean; toggle?: boolean }) => {
    const cfg = ICONS[iconKey] || ICONS.info;
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/10 transition-colors border-t border-border-primary first:border-t-0 ${!onClick ? "cursor-default" : ""}`}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>{cfg.icon}</div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium ${danger ? "text-destructive" : "text-text-primary"}`}>{name}</div>
          <div className="text-xs text-text-muted mt-0.5">{sub}</div>
        </div>
        {toggle ? (
          <div className="w-10 h-[22px] bg-brand rounded-full relative cursor-pointer shrink-0">
            <div className="absolute top-0.5 right-0.5 w-[18px] h-[18px] bg-bg-primary rounded-full shadow-sm" />
          </div>
        ) : onClick ? (
          <ChevronRight size={16} className="text-brand shrink-0" />
        ) : null}
      </div>
    );
  };

  return (
    <ScreenLayout activeTab="home">
      <div className="px-6 pb-6">
        <div className="flex flex-col items-center mb-4">
          <Logo />
          <div className="text-xl font-semibold text-text-primary mt-2">Settings</div>
        </div>

        <div className="h-px bg-border-primary mb-6" />

        <Section label="Account">
          <div className="px-5 py-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shrink-0">
                <User size={28} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-base font-semibold text-text-primary">Active Session</div>
                <LulaBadge variant="success" className="mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" /> Active Session
                </LulaBadge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
              <Phone size={14} className="text-brand" />
              Phone Number: +27784588458
            </div>
            <div className="h-px bg-border-primary mb-4" />
            <div className="mb-4">
              <LulaInput
                label="Display name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </div>
            <LulaButton onClick={() => {}} className="w-full rounded-lg gradient-brand text-white shadow-sm mb-3">
              Save display name
            </LulaButton>
            <LulaButton variant="secondary" onClick={() => navigate("splash")} className="w-full rounded-lg border-brand text-brand">
              Sign Out
            </LulaButton>
          </div>
        </Section>

        <Section label="Device">
          <Row iconKey="link" name="Link device" sub="Scan a QR code to link this device" onClick={() => {}} />
        </Section>

        <Section label="Preferences">
          <Row iconKey="globe" name="Language & Preferences" sub="Current selection: English" onClick={() => {}} />
        </Section>

        <Section label="Data & Storage">
          <Row iconKey="database" name="Data Safe" sub="Review and update details saved on device" onClick={() => {}} />
          <Row iconKey="trash" name="Clear Data Safe" sub="Remove your local Data Safe contents" onClick={() => {}} danger />
        </Section>

        <Section label="About">
          <Row iconKey="help" name="Help & Support" sub="Get help or contact support" onClick={() => {}} />
          <Row iconKey="clipboard" name="Terms & Privacy" sub="Read our terms and privacy policy" onClick={() => {}} />
          <Row iconKey="lock" name="Privacy & Security" sub="Control your data and security settings" onClick={() => {}} />
          <Row iconKey="info" name="App Version" sub="1.0.40 (40)" />
        </Section>

        <div className="mb-8">
          <div className="text-sm font-semibold text-text-primary mb-3">Vault Security</div>
          <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden shadow-sm">
            <Row iconKey="shield" name="Use biometrics" sub="Face ID / Touch ID currently enabled" toggle />
            <Row iconKey="key" name="Change vault PIN" sub="Update PIN used when biometrics unavailable" onClick={() => {}} />
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default SettingsScreen;