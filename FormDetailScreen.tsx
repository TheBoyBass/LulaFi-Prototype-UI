import { AppProvider, useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Smartphone, Building2 } from "lucide-react";
import SplashScreen from "@/screens/SplashScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import SignupScreen from "@/screens/SignupScreen";
import OTPScreen from "@/screens/OTPScreen";
import DisplayNameScreen from "@/screens/DisplayNameScreen";
import HomeScreen from "@/screens/HomeScreen";
import ServicesScreen from "@/screens/ServicesScreen";
import OrgDetailScreen from "@/screens/OrgDetailScreen";
import ConsentScreen from "@/screens/ConsentScreen";
import PinAuthScreen from "@/screens/PinAuthScreen";
import FormFillScreen from "@/screens/FormFillScreen";
import MyFormsScreen from "@/screens/MyFormsScreen";
import FormDetailScreen from "@/screens/FormDetailScreen";
import QRScannerScreen from "@/screens/QRScannerScreen";
import ChatConvoScreen from "@/screens/ChatConvoScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import ProviderSearchScreen from "@/screens/ProviderSearchScreen";
import CalendarScreen from "@/screens/CalendarScreen";
import MarketplaceScreen from "@/screens/MarketplaceScreen";
import ActivityScreen from "@/screens/ActivityScreen";
import ProviderDashboardScreen from "@/screens/provider/ProviderDashboardScreen";
import ProviderActivityScreen from "@/screens/provider/ProviderActivityScreen";
import ProviderSemScreen from "@/screens/provider/ProviderSemScreen";
import ProviderConvoScreen from "@/screens/provider/ProviderConvoScreen";
import ProviderNewGroupScreen from "@/screens/provider/ProviderNewGroupScreen";
import ProviderFormsInboxScreen from "@/screens/provider/ProviderFormsInboxScreen";
import ProviderSubmissionScreen from "@/screens/provider/ProviderSubmissionScreen";
import ProviderUpdateStatusScreen from "@/screens/provider/ProviderUpdateStatusScreen";
import ProviderSettingsScreen from "@/screens/provider/ProviderSettingsScreen";
import { ProviderScreenId, ScreenId } from "@/types/screens";
import PhoneNotifications from "@/components/lulafi/PhoneNotifications";

const PROVIDER_SCREEN_LABELS: Record<ProviderScreenId, string> = {
  pdash: "PROVIDER DASHBOARD",
  pactivity: "PROVIDER ACTIVITY",
  psem: "PROVIDER LULASEM",
  pconvo: "FORM LULASEM",
  pgroup: "NEW PROCESSING GROUP",
  pinbox: "FORMS INBOX",
  psubmission: "SUBMISSION DETAIL",
  pupdate: "UPDATE SUBMISSION",
  psettings: "PROVIDER SETTINGS",
};

const PROVIDER_SIDEBAR: { section: string; items: { label: string; screen: ProviderScreenId }[] }[] = [
  {
    section: "Provider App",
    items: [
      { label: "Dashboard", screen: "pdash" },
      { label: "Activity", screen: "pactivity" },
      { label: "Forms Inbox", screen: "pinbox" },
      { label: "Submission", screen: "psubmission" },
      { label: "Update Status", screen: "pupdate" },
    ],
  },
  {
    section: "Provider LulaSEM",
    items: [
      { label: "LulaSEM", screen: "psem" },
      { label: "Form LulaSEM", screen: "pconvo" },
      { label: "New Group", screen: "pgroup" },
      { label: "Settings", screen: "psettings" },
    ],
  },
];

const getProviderScreen = (id: ProviderScreenId): JSX.Element => {
  const screens: Record<ProviderScreenId, JSX.Element> = {
    pdash: <ProviderDashboardScreen />,
    pactivity: <ProviderActivityScreen />,
    psem: <ProviderSemScreen />,
    pconvo: <ProviderConvoScreen />,
    pgroup: <ProviderNewGroupScreen />,
    pinbox: <ProviderFormsInboxScreen />,
    psubmission: <ProviderSubmissionScreen />,
    pupdate: <ProviderUpdateStatusScreen />,
    psettings: <ProviderSettingsScreen />,
  };
  return screens[id] ?? <ProviderDashboardScreen />;
};


const SCREEN_LABELS: Record<ScreenId, string> = {
  splash: "SPLASH", ob1: "ONBOARDING 1", ob2: "ONBOARDING 2", ob3: "ONBOARDING 3",
  signup: "SIGN UP", otp: "OTP VERIFY", name: "DISPLAY NAME",
  home: "HOME (EMPTY)", activity: "RECENT ACTIVITY",
  svc: "LULASEM", org: "ORG DETAIL", consent: "DATA CONSENT", pinauth: "PIN AUTHORISATION",
  form: "FORM FILL", mf: "MY FORMS", fdetail: "FORM DETAILS", qr: "QR SCANNER",
  convo: "CHAT CONVO", settings: "SETTINGS", profile: "MY PROFILE",
  psearch: "DISCOVER", cal: "CALENDAR", market: "MARKETPLACE",
};

const SIDEBAR_ITEMS: { section: string; items: { label: string; screen: ScreenId }[] }[] = [
  {
    section: "Onboarding",
    items: [
      { label: "Splash", screen: "splash" },
      { label: "Onboarding", screen: "ob1" },
      { label: "Sign Up", screen: "signup" },
      { label: "OTP Verify", screen: "otp" },
      { label: "Display Name", screen: "name" },
    ],
  },
  {
    section: "Main App",
    items: [
      { label: "Home", screen: "home" },
      { label: "Recent Activity", screen: "activity" },
      { label: "lulaSEM", screen: "svc" },
      { label: "Org Detail", screen: "org" },
      { label: "Consent", screen: "consent" },
      { label: "PIN Authorisation", screen: "pinauth" },
      { label: "Form Fill", screen: "form" },
      { label: "My Forms", screen: "mf" },
      { label: "Form Details", screen: "fdetail" },
      { label: "QR Scanner", screen: "qr" },
      { label: "Chat Convo", screen: "convo" },
      { label: "Discover", screen: "psearch" },
      { label: "Calendar", screen: "cal" },
      { label: "Marketplace", screen: "market" },
      { label: "Settings", screen: "settings" },
      { label: "My Profile", screen: "profile" },
    ],
  },
];

const screenVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const } },
};

const getScreen = (id: ScreenId): JSX.Element => {
  const screens: Record<ScreenId, JSX.Element> = {
    splash: <SplashScreen />,
    ob1: <OnboardingScreen step={1} icon="🔒" title="Bank-Grade Encryption" description="Your data is encrypted and secure on your device at all times." nextScreen="ob2" />,
    ob2: <OnboardingScreen step={2} icon="📋" title="Smart Form Fill" description="Save time as forms pre-fill with your details automatically." nextScreen="ob3" />,
    ob3: <OnboardingScreen step={3} icon="👆" title="Privacy First" description="Your information stays private and never leaves your phone without your consent." nextScreen="signup" />,
    signup: <SignupScreen />,
    otp: <OTPScreen />,
    name: <DisplayNameScreen />,
    home: <HomeScreen />,
    activity: <ActivityScreen />,
    svc: <ServicesScreen />,
    org: <OrgDetailScreen />,
    consent: <ConsentScreen />,
    pinauth: <PinAuthScreen />,
    form: <FormFillScreen />,
    mf: <MyFormsScreen />,
    fdetail: <FormDetailScreen />,
    qr: <QRScannerScreen />,
    convo: <ChatConvoScreen />,
    settings: <SettingsScreen />,
    profile: <ProfileScreen />,
    psearch: <ProviderSearchScreen />,
    cal: <CalendarScreen />,
    market: <MarketplaceScreen />,
  };
  return screens[id] || <SplashScreen />;
};

const ScreenRenderer = () => {
  const { currentScreen, providerScreen, mode } = useApp();
  const key = mode === "provider" ? `p:${providerScreen}` : `c:${currentScreen}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0"
      >
        {mode === "provider" ? getProviderScreen(providerScreen) : getScreen(currentScreen)}
      </motion.div>
    </AnimatePresence>
  );
};

const ModeSwitch = () => {
  const { mode, setMode } = useApp();
  const options = [
    { key: "client" as const, label: "Client", icon: Smartphone },
    { key: "provider" as const, label: "Provider", icon: Building2 },
  ];

  return (
    <div className="mb-3 pb-3 border-b border-white/[0.08]">
      <div className="text-[9px] font-semibold uppercase tracking-[1px] text-white/[0.28] px-1 pb-1.5">
        View mode
      </div>
      <div className="flex flex-col gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] p-1.5">
        {options.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`w-full flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium cursor-pointer transition-all duration-150 ${
              mode === key ? "bg-brand text-white" : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
            }`}
          >
            <Icon size={14} className="shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { currentScreen, navigate, providerScreen, navigateProvider, mode, isDark, toggleTheme } =
    useApp();
  const isProvider = mode === "provider";
  const groups = isProvider ? PROVIDER_SIDEBAR : SIDEBAR_ITEMS;

  return (
    <div className="hidden lg:flex flex-col gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3.5 w-[190px] self-start mt-9">
      <ModeSwitch />
      <button
        onClick={toggleTheme}
        className="w-full px-2.5 py-2.5 rounded-lg border border-white/[0.1] text-xs text-left cursor-pointer transition-all duration-150 flex items-center gap-2 bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white mb-2"
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />} {isDark ? "Light Mode" : "Dark Mode"}
      </button>
      {groups.map(group => (
        <div key={group.section}>
          <div className="text-[9px] font-semibold uppercase tracking-[1px] text-white/[0.28] px-2 pt-1.5 pb-0.5">{group.section}</div>
          {group.items.map(item => {
            const active = isProvider ? providerScreen === item.screen : currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() =>
                  isProvider
                    ? navigateProvider(item.screen as ProviderScreenId)
                    : navigate(item.screen as ScreenId)
                }
                className={`w-full px-2.5 py-2 rounded-lg border-none text-xs text-left cursor-pointer transition-all duration-150 flex items-center gap-1.5 ${
                  active
                    ? "bg-brand/[0.12] text-brand font-medium"
                    : "bg-transparent text-white/[0.48] font-normal hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                {active && <div className="w-1 h-1 rounded-full bg-brand shrink-0" />}
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const PhoneFrame = () => {
  const { currentScreen, providerScreen, mode } = useApp();

  return (
    <div className="relative w-[390px] h-[812px] shrink-0">
      <div className="absolute -top-6 left-0 text-[10px] font-medium text-white/[0.35] tracking-widest uppercase">
        {mode === "provider"
          ? `PROVIDER · ${PROVIDER_SCREEN_LABELS[providerScreen]}`
          : SCREEN_LABELS[currentScreen]}
      </div>
      <div className="phone-frame">
        <div className="phone-notch" />
        <ScreenRenderer />
        {/* In-device notification banners (instead of browser-side toasts) */}
        <PhoneNotifications />
      </div>
    </div>
  );
};


const LulaFiApp = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex justify-center items-start py-7 px-5 gap-6 flex-wrap" style={{ background: "#0B1C2D" }}>
        <Sidebar />
        <PhoneFrame />
      </div>
    </AppProvider>
  );
};

export default LulaFiApp;
