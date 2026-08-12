import { useApp } from "@/context/AppContext";
import lulafiIcon from "@/assets/lulafi-icon.png";
import loadingRing from "@/assets/loading-ring.png";
import { motion } from "framer-motion";
import StatusBar from "@/components/lulafi/StatusBar";

const SplashScreen = () => {
  const { navigate } = useApp();

  return (
    <div className="absolute inset-0 flex flex-col screen-enter overflow-hidden" onClick={() => navigate("ob1")}>
      {/* Base background - dark in dark mode, white in light mode */}
      <div className="absolute inset-0 bg-bg-primary" />
      {/* Radial teal glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsla(175,70%,40%,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 hidden dark:block" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsla(175,70%,40%,0.25) 0%, hsl(210,61%,11%) 50%, hsl(210,61%,11%) 100%)' }} />
      <div className="relative flex flex-col flex-1">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center pt-12">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={lulafiIcon} alt="LulaFi" className="w-80 h-64 object-contain" />
            <div className="text-7xl font-semibold text-text-primary tracking-tight">
              lula<span className="text-brand">Fi</span>
            </div>
          </motion.div>
        </div>
        <div className="pb-12 flex justify-center">
          <motion.img
            src={loadingRing}
            alt="Loading"
            className="w-28 h-28 object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
