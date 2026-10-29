@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Accessible keyboard focus: a clear ring on anything focusable that
     doesn't already manage its own focus-visible styling. */
  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  summary:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-radius: 4px;
  }
}

@layer base {
  :root {
    /* LulaFi Design System — Light Mode */
    --background: 210.000 40.000% 96.078%;
    --foreground: 222.222 47.368% 11.176%;

    --card: 0.000 0.000% 100.000%;
    --card-foreground: 222.222 47.368% 11.176%;

    --popover: 0.000 0.000% 100.000%;
    --popover-foreground: 222.222 47.368% 11.176%;

    --primary: 174.808 82.540% 24.706%;
    --primary-foreground: 0.000 0.000% 100.000%;

    --secondary: 210.000 40.000% 98.039%;
    --secondary-foreground: 222.222 47.368% 11.176%;

    --muted: 210.000 40.000% 96.078%;
    --muted-foreground: 215.385 16.318% 46.863%;

    --accent: 180.000 54.839% 93.922%;
    --accent-foreground: 174.808 82.540% 24.706%;

    --destructive: 346.837 77.165% 49.804%;
    --destructive-foreground: 0.000 0.000% 100.000%;

    --success: 161.379 93.548% 30.392%;
    --warning: 32.133 94.619% 43.725%;
    --info: 228.000 78.378% 36.275%;

    --border: 211.579 37.255% 90.000%;
    --input: 212.727 26.829% 83.922%;
    --input-background: 210.000 40.000% 98.039%;
    --ring: 174.808 82.540% 24.706%;

    --radius: 10px;

    /* Brand */
    --brand: 174.808 82.540% 24.706%;
    --brand-hover: 175.059 82.524% 20.196%;
    --brand-active: 174.808 82.540% 24.706%;
    /* Text roles retain the bright brand fills while meeting AA on light surfaces. */
    --brand-foreground: 174.808 82.540% 24.706%;
    --status-success-foreground: 162.931 93.548% 24.314%;
    --status-warning-foreground: 25.965 90.476% 37.059%;
    --status-info-foreground: 228.000 78.378% 36.275%;
    --status-destructive-foreground: 346.837 77.165% 49.804%;
    --portal-sidebar: 230.182 53.398% 20.196%;
    --portal-sidebar-foreground: 217.500 57.143% 97.255%;
    --portal-accent: 228.000 78.378% 36.275%;

    /* Partner brand: City of Tshwane */
    --tshwane-green: 104 61% 40%;
    --tshwane-green-dark: 116 63% 25%;
    --tshwane-yellow: 51 100% 55%;
    --tshwane-orange: 30 92% 55%;
    --gradient-tshwane: linear-gradient(135deg, hsl(104 61% 40%) 0%, hsl(116 63% 25%) 100%);

    /* Backgrounds */
    --bg-primary: 0.000 0.000% 100.000%;
    --bg-secondary: 210.000 40.000% 96.078%;
    --bg-tertiary: 210.000 40.000% 96.078%;
    --bg-page: 210.000 40.000% 96.078%;

    /* Text */
    --text-primary: 222.222 47.368% 11.176%;
    --text-secondary: 215.294 19.318% 34.510%;
    --text-muted: 215.385 16.318% 46.863%;

    /* Border */
    --border-primary: 211.579 37.255% 90.000%;

    /* Gradient */
    --gradient-brand: linear-gradient(135deg, hsl(var(--brand-main)), hsl(var(--foundation-navy)));

    /* Shadows */
    --shadow-sm: 0 1px 2px hsl(var(--shadow-color) / 0.06);
    --shadow-md: 0 8px 24px hsl(var(--shadow-color) / 0.12);
    --shadow-glow: 0 20px 48px hsl(var(--brand-main) / 0.18);

    /* Spacing (8pt Grid) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;
    --space-8: 64px;

    /* Radius */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    /* Charts */
    --chart-1: 174.808 82.540% 24.706%;
    --chart-2: 228.000 78.378% 36.275%;
    --chart-3: 161.379 93.548% 30.392%;
    --chart-4: 32.133 94.619% 43.725%;
    --chart-5: 346.837 77.165% 49.804%;

    /* Attached semantic colour roles; legacy tokens above are aliases. */
    --surface-screen: 210.000 40.000% 96.078%;
    --surface-elevated: 0.000 0.000% 100.000%;
    --surface-list: 0.000 0.000% 100.000%;
    --surface-muted: 210.000 40.000% 98.039%;
    --surface-strong: 210.000 40.000% 96.078%;
    --surface-interactive: 180.000 54.839% 93.922%;
    --surface-interactive-strong: 174.808 82.540% 24.706%;
    --surface-selected: 180.000 54.839% 93.922%;
    --surface-accent: 174.808 82.540% 24.706%;
    --surface-icon: 180.000 54.839% 93.922%;
    --surface-overlay: rgba(15, 23, 42, 0.45);
    --surface-scrim: rgba(0, 0, 0, 0.6);
    --content-primary: 222.222 47.368% 11.176%;
    --content-secondary: 215.294 19.318% 34.510%;
    --content-muted: 215.385 16.318% 46.863%;
    --content-subtle: 215.000 20.225% 65.098%;
    --content-inverse: 0.000 0.000% 100.000%;
    --content-interactive: 174.808 82.540% 24.706%;
    --content-on-interactive: 0.000 0.000% 100.000%;
    --content-selected: 174.808 82.540% 24.706%;
    --content-accent: 174.808 82.540% 24.706%;
    --content-link: 174.808 82.540% 24.706%;
    --stroke-default: 211.579 37.255% 90.000%;
    --stroke-subtle: 214.286 31.818% 91.373%;
    --stroke-control: 212.727 26.829% 83.922%;
    --stroke-selected: 174.808 82.540% 24.706%;
    --stroke-accent: 174.808 82.540% 24.706%;
    --stroke-focus: 174.808 82.540% 24.706%;
    --status-danger-surface: 355.714 100.000% 97.255%;
    --status-danger-content: 346.837 77.165% 49.804%;
    --status-danger-stroke: 352.653 96.078% 90.000%;
    --status-danger-solid: 346.837 77.165% 49.804%;
    --status-danger-on-solid: 0.000 0.000% 100.000%;
    --status-success-surface: 151.765 80.952% 95.882%;
    --status-success-content: 162.931 93.548% 24.314%;
    --status-success-stroke: 152.368 76.000% 80.392%;
    --status-success-solid: 161.379 93.548% 30.392%;
    --status-success-on-solid: 0.000 0.000% 100.000%;
    --status-warning-surface: 48.000 100.000% 96.078%;
    --status-warning-content: 25.965 90.476% 37.059%;
    --status-warning-stroke: 48.000 96.639% 76.667%;
    --status-warning-solid: 32.133 94.619% 43.725%;
    --status-warning-on-solid: 0.000 0.000% 100.000%;
    --status-info-surface: 224.000 48.387% 93.922%;
    --status-info-content: 228.000 78.378% 36.275%;
    --status-info-stroke: 226.500 52.632% 85.098%;
    --status-info-solid: 228.000 78.378% 36.275%;
    --status-info-on-solid: 0.000 0.000% 100.000%;
    --brand-main: 228.000 78.378% 36.275%;
    --brand-pressed: 228.571 78.947% 26.078%;
    --chat-sent: 169.655 50.877% 88.824%;
    --chat-received: 0.000 0.000% 100.000%;
    --chat-sent-text: 222.222 47.368% 11.176%;
    --chat-received-text: 222.222 47.368% 11.176%;
    --chat-shadow: 222.222 47.368% 11.176%;
    --identity-1: 228.000 78.378% 36.275%;
    --identity-2: 230.182 53.398% 20.196%;
    --identity-3: 160.118 84.080% 39.412%;
    --identity-4: 37.692 92.126% 50.196%;
    --identity-5: 349.724 89.163% 60.196%;
    --shadow-color: 222.222 47.368% 11.176%;
    --foundation-blue: 228.000 78.378% 36.275%;
    --foundation-teal: 178.922 78.404% 41.765%;
    --foundation-navy: 230.182 53.398% 20.196%;
    --media-background: 0.000 0.000% 0.000%;
    --media-foreground: 0.000 0.000% 100.000%;
    --gradient-hero: radial-gradient(ellipse at top right, hsl(var(--foundation-teal) / 0.15), transparent 65%);
    --gradient-hero-business: radial-gradient(ellipse at top right, hsl(var(--brand-main) / 0.15), transparent 65%);
    --gradient-phone-glow: radial-gradient(ellipse at center, hsl(var(--brand-main) / 0.16), transparent 70%);
    --gradient-splash: radial-gradient(ellipse at top right, hsl(var(--brand-main) / 0.1), transparent 60%);
    --gradient-logo-glow: radial-gradient(circle, hsl(var(--foundation-teal) / 0.18), transparent 65%);
  }

  .dark {
    /* LulaFi Design System — Dark Mode */
    --background: 220.000 48.837% 8.431%;
    --foreground: 217.500 57.143% 97.255%;

    --card: 217.778 39.130% 13.529%;
    --card-foreground: 217.500 57.143% 97.255%;

    --popover: 217.778 39.130% 13.529%;
    --popover-foreground: 217.500 57.143% 97.255%;

    --primary: 170.897 70.048% 59.412%;
    --primary-foreground: 174.286 63.636% 6.471%;

    --secondary: 216.923 43.333% 11.765%;
    --secondary-foreground: 217.500 57.143% 97.255%;

    --muted: 216.000 32.609% 18.039%;
    --muted-foreground: 213.529 25.000% 73.333%;

    --accent: 178.537 53.247% 15.098%;
    --accent-foreground: 170.897 70.048% 59.412%;

    --destructive: 350.704 100.000% 72.157%;
    --destructive-foreground: 345.000 61.538% 10.196%;

    --success: 158.113 64.372% 51.569%;
    --warning: 43.256 96.413% 56.275%;
    --info: 229.189 100.000% 78.235%;

    --border: 215.385 28.467% 26.863%;
    --input: 215.122 23.699% 33.922%;
    --input-background: 216.923 43.333% 11.765%;
    --ring: 170.897 70.048% 59.412%;

    /* Brand */
    --brand: 170.897 70.048% 59.412%;
    --brand-hover: 170.847 70.238% 67.059%;
    --brand-active: 170.897 70.048% 59.412%;
    --brand-foreground: 170.897 70.048% 59.412%;
    --status-success-foreground: 154.576 70.238% 67.059%;
    --status-warning-foreground: 45.943 96.685% 64.510%;
    --status-info-foreground: 228.791 100.000% 82.157%;
    --status-destructive-foreground: 349.901 100.000% 80.196%;
    --portal-sidebar: 230.182 53.398% 20.196%;
    --portal-sidebar-foreground: 217.500 57.143% 97.255%;
    --portal-accent: 229.189 100.000% 78.235%;

    /* Partner brand: City of Tshwane */
    --tshwane-green: 104 55% 46%;
    --tshwane-green-dark: 116 50% 30%;
    --tshwane-yellow: 51 100% 60%;
    --tshwane-orange: 30 92% 60%;
    --gradient-tshwane: linear-gradient(135deg, hsl(104 55% 40%) 0%, hsl(116 50% 22%) 100%);

    /* Backgrounds */
    --bg-primary: 217.778 39.130% 13.529%;
    --bg-secondary: 220.000 48.837% 8.431%;
    --bg-tertiary: 216.000 32.609% 18.039%;
    --bg-page: 220.000 48.837% 8.431%;

    /* Text */
    --text-primary: 217.500 57.143% 97.255%;
    --text-secondary: 212.727 26.829% 83.922%;
    --text-muted: 213.529 25.000% 73.333%;

    /* Border */
    --border-primary: 215.385 28.467% 26.863%;

    /* Gradient */
    --gradient-brand: linear-gradient(135deg, hsl(var(--brand-main)), hsl(var(--foundation-navy)));

    /* Shadows */
    --shadow-sm: 0 1px 2px hsl(var(--shadow-color) / 0.06);
    --shadow-md: 0 8px 24px hsl(var(--shadow-color) / 0.12);
    --shadow-glow: 0 20px 48px hsl(var(--brand-main) / 0.18);

    /* Attached semantic colour roles; legacy tokens above are aliases. */
    --surface-screen: 220.000 48.837% 8.431%;
    --surface-elevated: 217.778 39.130% 13.529%;
    --surface-list: 220.000 48.837% 8.431%;
    --surface-muted: 216.923 43.333% 11.765%;
    --surface-strong: 216.000 32.609% 18.039%;
    --surface-interactive: 178.537 53.247% 15.098%;
    --surface-interactive-strong: 170.897 70.048% 59.412%;
    --surface-selected: 178.537 53.247% 15.098%;
    --surface-accent: 170.897 70.048% 59.412%;
    --surface-icon: 173.333 47.368% 14.902%;
    --surface-overlay: rgba(0, 0, 0, 0.65);
    --surface-scrim: rgba(0, 0, 0, 0.72);
    --content-primary: 217.500 57.143% 97.255%;
    --content-secondary: 212.727 26.829% 83.922%;
    --content-muted: 213.529 25.000% 73.333%;
    --content-subtle: 213.158 20.879% 64.314%;
    --content-inverse: 174.286 63.636% 6.471%;
    --content-interactive: 170.897 70.048% 59.412%;
    --content-on-interactive: 174.286 63.636% 6.471%;
    --content-selected: 170.897 70.048% 59.412%;
    --content-accent: 170.897 70.048% 59.412%;
    --content-link: 170.897 70.048% 59.412%;
    --stroke-default: 215.385 28.467% 26.863%;
    --stroke-subtle: 214.054 32.743% 22.157%;
    --stroke-control: 215.122 23.699% 33.922%;
    --stroke-selected: 170.897 70.048% 59.412%;
    --stroke-accent: 170.897 70.048% 59.412%;
    --stroke-focus: 170.897 70.048% 59.412%;
    --status-danger-surface: 338.182 34.737% 18.627%;
    --status-danger-content: 349.901 100.000% 80.196%;
    --status-danger-stroke: 345.833 34.951% 40.392%;
    --status-danger-solid: 350.704 100.000% 72.157%;
    --status-danger-on-solid: 345.000 61.538% 10.196%;
    --status-success-surface: 167.442 57.333% 14.706%;
    --status-success-content: 154.576 70.238% 67.059%;
    --status-success-stroke: 159.718 43.558% 31.961%;
    --status-success-solid: 158.113 64.372% 51.569%;
    --status-success-on-solid: 162.439 80.392% 10.000%;
    --status-warning-surface: 39.130 65.714% 13.725%;
    --status-warning-content: 45.943 96.685% 64.510%;
    --status-warning-stroke: 41.176 71.831% 27.843%;
    --status-warning-solid: 43.256 96.413% 56.275%;
    --status-warning-on-solid: 36.000 90.909% 8.627%;
    --status-info-surface: 228.235 52.577% 19.020%;
    --status-info-content: 228.791 100.000% 82.157%;
    --status-info-stroke: 228.000 40.816% 38.431%;
    --status-info-solid: 229.189 100.000% 78.235%;
    --status-info-on-solid: 230.526 65.517% 11.373%;
    --brand-main: 229.189 100.000% 78.235%;
    --brand-pressed: 229.014 100.000% 86.078%;
    --chat-sent: 174.808 82.540% 24.706%;
    --chat-received: 216.000 32.609% 18.039%;
    --chat-sent-text: 0.000 0.000% 100.000%;
    --chat-received-text: 217.500 57.143% 97.255%;
    --chat-shadow: 0.000 0.000% 0.000%;
    --identity-1: 229.048 54.783% 54.902%;
    --identity-2: 231.304 30.942% 43.725%;
    --identity-3: 161.379 93.548% 30.392%;
    --identity-4: 32.133 94.619% 43.725%;
    --identity-5: 346.837 77.165% 49.804%;
    --shadow-color: 0.000 0.000% 0.000%;
    --foundation-blue: 228.000 78.378% 36.275%;
    --foundation-teal: 178.922 78.404% 41.765%;
    --foundation-navy: 230.182 53.398% 20.196%;
    --media-background: 0.000 0.000% 0.000%;
    --media-foreground: 0.000 0.000% 100.000%;
    --gradient-hero: radial-gradient(ellipse at top right, hsl(var(--foundation-teal) / 0.15), transparent 65%);
    --gradient-hero-business: radial-gradient(ellipse at top right, hsl(var(--brand-main) / 0.15), transparent 65%);
    --gradient-phone-glow: radial-gradient(ellipse at center, hsl(var(--brand-main) / 0.16), transparent 70%);
    --gradient-splash: radial-gradient(ellipse at top right, hsl(var(--brand-main) / 0.1), transparent 60%);
    --gradient-logo-glow: radial-gradient(circle, hsl(var(--foundation-teal) / 0.18), transparent 65%);
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro', system-ui, sans-serif;
  }

  /* LulaFi Typography System */
  html {
    font-size: 16px;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }

  h1 {
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  h2 {
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
  }

  h3 {
    font-size: 18px;
    line-height: 28px;
    font-weight: 500;
  }

  h4 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }

  label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }

  button {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }

  input, textarea {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
}

/* Phone frame */
.phone-frame {
  width: 390px;
  height: 812px;
  background: hsl(var(--bg-primary));
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 48px 96px hsla(0, 0%, 0%, 0.7), inset 0 0 0 1px hsla(0, 0%, 100%, 0.06);
  border: 8px solid #1a1a1a;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 30px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  z-index: 1000;
}

/* Screen transitions */
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scanPulse {
  0%, 100% { top: 15%; }
  50% { top: 75%; }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.screen-enter {
  animation: fadeIn 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up {
  animation: slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar hide */
.hide-scrollbar {
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Gradient background */
.gradient-brand {
  background: var(--gradient-brand);
}

.gradient-brand-animated {
  background: var(--gradient-brand);
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

/* Scanner line */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, hsl(var(--brand)), transparent);
  animation: scanPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 8px hsl(var(--brand));
}

/* On-device notifications: keep sonner banners inside the phone frame */

.phone-frame [data-sonner-toaster] {
  position: absolute !important;
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 16px;
  --width: 340px;
  z-index: 300;
}
