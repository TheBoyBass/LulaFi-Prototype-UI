import { Toaster } from "sonner";

/**
 * On-device notification banners. Rendered inside the phone frame so alerts
 * appear like real iOS/Android notifications instead of browser-side toasts.
 */
const PhoneNotifications = () => (
  <Toaster
    position="top-center"
    offset={54}
    visibleToasts={3}
    className="phone-toaster"
    toastOptions={{
      classNames: {
        toast:
          "rounded-2xl border border-border-primary bg-bg-secondary/95 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] px-4 py-3",
        title: "text-sm font-semibold text-text-primary",
        description: "text-xs text-text-secondary",
        actionButton: "rounded-full bg-brand text-bg-primary text-[11px] font-medium px-3 py-1.5",
        cancelButton: "rounded-full bg-bg-tertiary text-text-secondary text-[11px] px-3 py-1.5",
      },
    }}
  />
);

export default PhoneNotifications;
