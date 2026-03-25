import { motion } from "framer-motion";

const WaveDecoration = () => (
  <div className="w-full pointer-events-none select-none overflow-hidden">
    <motion.svg
      viewBox="0 0 390 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      animate={{ y: [0, -4, 0, 3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path
        d="M0 60 C60 30, 120 50, 180 35 C240 20, 300 45, 390 25 L390 80 L0 80Z"
        fill="hsl(var(--brand) / 0.12)"
        animate={{ d: [
          "M0 60 C60 30, 120 50, 180 35 C240 20, 300 45, 390 25 L390 80 L0 80Z",
          "M0 58 C70 35, 130 45, 190 32 C250 22, 310 40, 390 28 L390 80 L0 80Z",
          "M0 60 C60 30, 120 50, 180 35 C240 20, 300 45, 390 25 L390 80 L0 80Z",
        ]}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0 65 C80 40, 140 55, 200 42 C260 29, 320 50, 390 32 L390 80 L0 80Z"
        fill="hsl(var(--brand) / 0.2)"
        animate={{ d: [
          "M0 65 C80 40, 140 55, 200 42 C260 29, 320 50, 390 32 L390 80 L0 80Z",
          "M0 63 C90 44, 150 50, 210 38 C270 26, 330 48, 390 35 L390 80 L0 80Z",
          "M0 65 C80 40, 140 55, 200 42 C260 29, 320 50, 390 32 L390 80 L0 80Z",
        ]}}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M0 70 C70 50, 150 60, 220 48 C290 36, 340 55, 390 40"
        stroke="hsl(174 90% 55%)"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        animate={{ d: [
          "M0 70 C70 50, 150 60, 220 48 C290 36, 340 55, 390 40",
          "M0 68 C80 54, 160 56, 230 45 C300 33, 350 52, 390 43",
          "M0 70 C70 50, 150 60, 220 48 C290 36, 340 55, 390 40",
        ]}}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M0 72 C90 52, 160 65, 230 50 C300 35, 350 58, 390 44"
        stroke="hsl(190 95% 60%)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        animate={{ d: [
          "M0 72 C90 52, 160 65, 230 50 C300 35, 350 58, 390 44",
          "M0 70 C100 56, 170 60, 240 47 C310 32, 360 55, 390 46",
          "M0 72 C90 52, 160 65, 230 50 C300 35, 350 58, 390 44",
        ]}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      />
      <motion.path
        d="M0 68 C60 55, 130 58, 210 46 C280 34, 330 52, 390 38"
        stroke="hsl(180 100% 65%)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
        animate={{ d: [
          "M0 68 C60 55, 130 58, 210 46 C280 34, 330 52, 390 38",
          "M0 66 C70 58, 140 54, 220 43 C290 31, 340 49, 390 41",
          "M0 68 C60 55, 130 58, 210 46 C280 34, 330 52, 390 38",
        ]}}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>
  </div>
);

export default WaveDecoration;
