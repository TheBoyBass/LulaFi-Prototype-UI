import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const HOLD_MS = 5000;

interface EmergencyButtonProps {
  onActivate: () => void;
  variant?: "nav" | "header";
}

const EmergencyButton = ({ onActivate, variant = "nav" }: EmergencyButtonProps) => {
  const [holding, setHolding] = useState(false);
  const [hint, setHint] = useState(false);
  const timerRef = useRef<number | null>(null);
  const pulseRef = useRef<number | null>(null);
  const hintRef = useRef<number | null>(null);
  const isHeader = variant === "header";

  const clearTimers = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pulseRef.current !== null) {
      window.clearInterval(pulseRef.current);
      pulseRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        /* ignore */
      }
    }
  };

  const start = () => {
    if (holding) return;
    setHolding(true);
    vibrate(30);
    pulseRef.current = window.setInterval(() => vibrate(20), 700);
    timerRef.current = window.setTimeout(() => {
      clearTimers();
      setHolding(false);
      vibrate([60, 40, 60]);
      onActivate();
    }, HOLD_MS);
  };

  const cancel = () => {
    if (!holding) return;
    clearTimers();
    setHolding(false);
    setHint(true);
    if (hintRef.current !== null) window.clearTimeout(hintRef.current);
    hintRef.current = window.setTimeout(() => setHint(false), 2200);
  };

  const base = isHeader ? 36 : 64;
  const grown = isHeader ? 60 : 92;

  return (
    <div
      className={
        isHeader
          ? "relative w-9 h-9 flex items-center justify-center"
          : "relative flex-1 flex items-start justify-center"
      }
    >
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: isHeader ? -8 : 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isHeader ? -8 : 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-[250] w-max max-w-[200px] rounded-lg bg-text-primary px-4 py-2.5 text-center text-xs font-medium text-bg-primary shadow-lg ${
              isHeader ? "top-12 right-0" : "-top-24"
            }`}
          >
            Hold for 5 seconds to activate emergency
          </motion.div>
        )}
      </AnimatePresence>
      <button
        aria-label="Emergency — hold for 5 seconds"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onContextMenu={e => e.preventDefault()}
        className={`absolute flex flex-col items-center justify-center gap-0.5 rounded-full bg-destructive text-destructive-foreground select-none touch-none cursor-pointer transition-all duration-[400ms] ease-out ${
          isHeader ? "" : "-top-7 border-4 border-bg-secondary"
        }`}
        style={{
          width: holding ? grown : base,
          height: holding ? grown : base,
          boxShadow: holding
            ? "0 0 0 12px hsl(var(--destructive) / 0.18), 0 12px 32px hsl(var(--destructive) / 0.45)"
            : "0 6px 18px hsl(var(--destructive) / 0.35)",
        }}
      >
        {holding && <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />}
        <AlertTriangle size={holding ? (isHeader ? 26 : 32) : isHeader ? 18 : 24} className="relative" />
        {!isHeader && (
          <span className="relative text-[9px] font-semibold uppercase tracking-wide leading-none">SOS</span>
        )}
      </button>
    </div>
  );
};

export default EmergencyButton;
