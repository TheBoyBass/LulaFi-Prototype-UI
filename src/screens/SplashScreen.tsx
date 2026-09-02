import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import lulafiIcon from "@/assets/lulafi-icon.png";
import { motion } from "framer-motion";
import StatusBar from "@/components/lulafi/StatusBar";

const DOT_COLORS = ["hsl(var(--brand))", "hsl(239 84% 67%)", "hsl(172 66% 70%)", "hsl(239 60% 75%)"];

const SplashScreen = () => {
  const { navigate } = useApp();
  const [progress, setProgress] = useState(0);

  const dots = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: ((i * 37) % 92) + 4,
        top: ((i * 61) % 88) + 6,
        size: 4 + ((i * 5) % 5),
        color: DOT_COLORS[i % DOT_COLORS.length],
        delay: (i % 7) * 0.35,
        duration: 4 + (i % 5),
      })),
    [],
  );

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / 3200) * 100));
      setProgress(pct);
      if (pct >= 100) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col screen-enter overflow-hidden" onClick={() => navigate("ob1")}>
      {/* Base background */}
      <div className="absolute inset-0 bg-bg-primary" />
      {/* Soft corner tints */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 100% 0%, hsla(239,84%,67%,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 40% at 0% 100%, hsla(172,66%,50%,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Floating dots */}
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: 0.55,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div className="relative mt-[290px]">
          {[420, 300, 190].map((size, i) => (
            <motion.div
              key={size}
              className="absolute left-1/3 top-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderColor: "hsla(172,66%,50%,0.22)",
              }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-col flex-1">
        <StatusBar />

        <div className="flex-1 flex flex-col items-center justify-center pb-16">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Logo with glow */}
            <div className="relative flex items-center justify-center w-[220px] h-[220px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsla(172,66%,60%,0.22) 0%, transparent 65%)",
                }}
              />
              <motion.img
                src={lulafiIcon}
                alt="lulaFi"
                className="relative w-[150px] h-[130px] object-contain"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              className="text-[2.75rem] leading-none font-semibold text-text-primary tracking-tight mt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              lula<span className="text-brand">Fi</span>
            </motion.div>

            <motion.p
              className="text-sm text-text-muted mt-3 text-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              smart and secure forms for your convenience
            </motion.p>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="pb-14 px-12 flex flex-col items-center gap-2">
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full gradient-brand"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="text-xs font-medium text-brand">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
