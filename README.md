# LulaFi Prototype

[![Vite](https://img.shields.io/badge/Vite-5.4.19-green)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue)](https://tailwindcss.com/)

<div align=\"center\">
  <img src=\"https://via.placeholder.com/390x812/0B1C2D/FFFFFF?text=LulaFi+Prototype\" alt=\"LulaFi Phone Preview\" width=\"195\">
  <p><em>Interactive prototype preview (run <code>bun dev</code>)</em></p>
</div>

LulaFi is a **privacy-first mobile app prototype** for secure data sharing and intelligent form filling. Users control their data vault locally (bank-grade encryption, no external servers), consent to share only what's needed, and auto-fill forms via QR scanning or service discovery.

## ✨ Features

- **Local Data Vault**: End-to-end encryption, data stays on-device until explicit consent.
- **Smart Form Filling**: Pre-fill forms with your details automatically.
- **Consent Flows**: Granular control over data sharing with organizations.
- **QR Provider Discovery**: Scan QR codes to access forms securely.
- **Full Onboarding**: Splash → Encryption → Form Fill → Privacy education.
- **Core Screens Implemented** (17 total):
  | Flow | Screens |
  |------|---------|
  | Onboarding | Splash, 3-step onboarding, Signup, OTP, Display Name |
  | Main App | Home (empty/feed), Services → Org Detail → Consent → Form Fill → My Forms, QR Scanner, Messages/Chat, Settings |
- **Mobile-Responsive Prototype**: Phone frame preview (390x812px) with sidebar navigation.
- **Dark/Light Theme**: Automatic system toggle.
- **Polish**: Framer Motion animations, gradients, StatusBar simulation.

## 🛠 Tech Stack

| Category | Tech |
|----------|------|
| Framework | Vite + React 18 + TypeScript |
| UI | Tailwind CSS + shadcn/ui + Custom LulaFi components (LulaButton, LulaCard, etc.) |
| State | React Context + TanStack Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | Sonner |
| Testing | Vitest + Playwright + Testing Library |
| Utils | Class Variance Authority, Tailwind Merge |

## 🚀 Getting Started

1. **Clone & Install**
   ```bash
   git clone <repo> Lula-Proto
   cd Lula-Proto
   bun install  # or npm install
   ```

2. **Development**
   ```bash
   bun dev  # http://localhost:5173
   ```

3. **Build & Preview**
   ```bash
   bun build
   bun preview
   ```

4. **Test**
   ```bash
   bun test     # Vitest
   bun test:e2e # Playwright
   ```

5. **Lint**
   ```bash
   bun lint
   ```

**Switch Views**:
- `/` → **Prototype** (phone frame + sidebar)
- `/design-system` → **Design Tokens/Components** showcase

## 📱 Prototype Navigation

Use the left sidebar to jump between screens. Starts at Splash → Onboarding → Home.

**Key Flows**:
1. Home → Services → Org → Consent → Form Fill
2. Home → QR Scanner
3. Messages → Chat Convo

## 🎨 Design System

- **Tokens**: HSL colors (brand teal), Inter font (up to Semibold 600), 8pt spacing.
- **Philosophy**: Simplicity, restraint, purposeful gradients.
- **Components**: 30+ shadcn/ui + LulaFi custom (gradients, shadows).
- Extend via `src/components/lulafi/`.

**View**: `/design-system`

## 🗂 Project Structure

```
Lula-Proto/
├── src/
│   ├── components/lulafi/     # Custom branded UI
│   ├── components/ui/         # shadcn/ui
│   ├── screens/               # 17 prototype screens
│   ├── context/               # App state (screens/theme)
│   └── pages/                 # Index (prototype), DesignSystem
├── public/                    # Assets (logo, icons)
├── tests/                     # Vitest/Playwright
└── package.json               # Bun-compatible
```

## 🔮 Next Steps

- [ ] Backend API (vault sync, orgs/forms)
- [ ] Real QR scanner (ZXing/ZBar)
- [ ] Native mobile (Capacitor/Tauri)
- [ ] PWA install
- [ ] i18n
- [ ] Accessibility audit

## 📄 License

MIT License - see [LICENSE](LICENSE) (add if missing).

Made with ❤️ using [Lovable.dev](https://lovable.dev) template.

<div align=\"center\">
  <img src=\"https://assets.lovable.dev/badges/lovable-beta.svg\" alt=\"Lovable\" width=\"150\">
</div>
