import { AppProvider, useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import SplashScreen from "@/screens/SplashScreen";
import OnboardingScreen from "@/screens/OnboardingScreen";
import SignupScreen from "@/screens/SignupScreen";
import OTPScreen from "@/screens/OTPScreen";
import DisplayNameScreen from "@/screens/DisplayNameScreen";
import HomeScreen from "@/screens/HomeScreen";
import ServicesScreen from "@/screens/ServicesScreen";
import OrgDetailScreen from "@/screens/OrgDetailScreen";
import ConsentScreen from "@/screens/ConsentScreen";
import FormFillScreen from "@/screens/FormFillScreen";
import MyFormsScreen from "@/screens/MyFormsScreen";
import QRScannerScreen from "@/screens/QRScannerScreen";
import MessagesScreen from "@/screens/MessagesScreen";
import ChatConvoScreen from "@/screens/ChatConvoScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { ScreenId } from "@/types/screens";

const SCREEN_LABELS: Record<ScreenId, string> = {
  splash: "SPLASH", ob1: "ONBOARDING 1", ob2: "ONBOARDING 2", ob3: "ONBOARDING 3",
  signup: "SIGN UP", otp: "OTP VERIFY", name: "DISPLAY NAME",
  home: "HOME (EMPTY)", home2: "HOME + ACTIVITY",
  svc: "SERVICES", org: "ORG DETAIL", consent: "DATA CONSENT",
  form: "FORM FILL", mf: "MY FORMS", qr: "QR SCANNER",
  chat: "MESSAGES", convo: "CHAT CONVO", settings: "SETTINGS",
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
      { label: "Home + Activity", screen: "home2" },
      { label: "Services", screen: "svc" },
      { label: "Org Detail", screen: "org" },
      { label: "Consent", screen: "consent" },
      { label: "Form Fill", screen: "form" },
      { label: "My Forms", screen: "mf" },
      { label: "QR Scanner", screen: "qr" },
      { label: "Messages", screen: "chat" },
      { label: "Chat Convo", screen: "convo" },
      { label: "Settings", screen: "settings" },
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
    home2: <HomeScreen withActivity />,
    svc: <ServicesScreen />,
    org: <OrgDetailScreen />,
    consent: <ConsentScreen />,
    form: <FormFillScreen />,
    mf: <MyFormsScreen />,
    qr: <QRScannerScreen />,
    chat: <MessagesScreen />,
    convo: <ChatConvoScreen />,
    settings: <SettingsScreen />,
  };
  return screens[id] || <SplashScreen />;
};

const ScreenRenderer = () => {
  const { currentScreen } = useApp();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0"
      >
        {getScreen(currentScreen)}
      </motion.div>
    </AnimatePresence>
  );
};

const Sidebar = () => {
  const { currentScreen, navigate, isDark, toggleTheme } = useApp();

  return (
    <div className="hidden lg:flex flex-col gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3.5 w-[152px] self-start mt-9">
      <button
        onClick={toggleTheme}
        className="w-full px-2.5 py-2.5 rounded-lg border border-white/[0.1] text-xs text-left cursor-pointer transition-all duration-150 flex items-center gap-2 bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white mb-2"
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />} {isDark ? "Light Mode" : "Dark Mode"}
      </button>
      {SIDEBAR_ITEMS.map(group => (
        <div key={group.section}>
          <div className="text-[9px] font-semibold uppercase tracking-[1px] text-white/[0.28] px-2 pt-1.5 pb-0.5">{group.section}</div>
          {group.items.map(item => (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className={`w-full px-2.5 py-2 rounded-lg border-none text-xs text-left cursor-pointer transition-all duration-150 flex items-center gap-1.5 ${
                currentScreen === item.screen
                  ? "bg-brand/[0.12] text-brand font-medium"
                  : "bg-transparent text-white/[0.48] font-normal hover:bg-white/[0.06] hover:text-white/80"
              }`}
            >
              {currentScreen === item.screen && <div className="w-1 h-1 rounded-full bg-brand shrink-0" />}
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const PhoneFrame = () => {
  const { currentScreen } = useApp();

  return (
    <div className="relative w-[390px] h-[812px] shrink-0">
      <div className="absolute -top-6 left-0 text-[10px] font-medium text-white/[0.35] tracking-widest uppercase">
        {SCREEN_LABELS[currentScreen]}
      </div>
      <div className="phone-frame">
        <div className="phone-notch" />
        <ScreenRenderer />
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
