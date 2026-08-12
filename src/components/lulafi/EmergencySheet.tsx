import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, MapPin, Phone, Radio, UserRound } from "lucide-react";
import { toast } from "sonner";

interface EmergencySheetProps {
  open: boolean;
  onClose: () => void;
}

const EmergencySheet = ({ open, onClose }: EmergencySheetProps) => {
  const act = (message: string) => {
    onClose();
    toast(message);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-[300] flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45"
          />
          <motion.div
            role="dialog"
            aria-label="Emergency assistance"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-bg-primary rounded-t-[24px] px-5 pt-3 pb-7 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-text-muted/40" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertTriangle size={30} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Emergency assistance</h3>
              <p className="text-sm text-text-secondary mt-2 max-w-[280px]">
                Choose what you need. No call or location is shared until you confirm.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => act("Emergency dialler would open here")}
                className="flex items-center gap-4 w-full text-left rounded-lg bg-destructive text-destructive-foreground px-4 py-4 cursor-pointer transition-opacity hover:opacity-90"
              >
                <span className="w-9 h-9 rounded-full bg-destructive-foreground/20 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Call emergency services</span>
                  <span className="block text-xs opacity-80">Opens the phone's emergency dialler</span>
                </span>
              </button>

              <button
                onClick={() => act("Select a trusted contact to share your location")}
                className="flex items-center gap-4 w-full text-left rounded-lg bg-bg-primary border border-destructive/30 px-4 py-4 cursor-pointer transition-colors hover:border-destructive"
              >
                <span className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-destructive" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Share my location</span>
                  <span className="block text-xs text-text-muted">Select a trusted contact first</span>
                </span>
              </button>

              <button
                onClick={() => act("Live location sharing started with your emergency contact")}
                className="flex items-center gap-4 w-full text-left rounded-lg bg-bg-primary border border-destructive/30 px-4 py-4 cursor-pointer transition-colors hover:border-destructive"
              >
                <span className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <Radio size={18} className="text-destructive" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Share live location</span>
                  <span className="block text-xs text-text-muted">Stream your location to your emergency contact</span>
                </span>
              </button>

              <button
                onClick={() => act("Emergency contacts would open here")}
                className="flex items-center gap-4 w-full text-left rounded-lg bg-bg-primary border border-destructive/30 px-4 py-4 cursor-pointer transition-colors hover:border-destructive"
              >
                <span className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <UserRound size={18} className="text-destructive" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text-primary">Emergency contacts</span>
                  <span className="block text-xs text-text-muted">View or update trusted contacts</span>
                </span>
              </button>

              <button
                onClick={onClose}
                className="w-full rounded-lg border border-border-primary px-4 py-4 text-sm font-semibold text-text-primary cursor-pointer transition-colors hover:bg-bg-secondary mt-1"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmergencySheet;
