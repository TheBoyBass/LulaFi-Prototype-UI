import { useState } from 'react';
import { LulaCard } from '@/components/lulafi/LulaCard';
import { LulaButton } from '@/components/lulafi/LulaButton';
import { LulaBadge } from '@/components/lulafi/LulaBadge';
import lulaLogo from '@/assets/lulafi-icon.png';
import {
  Palette,
  Type,
  Box,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Moon,
  Sun,
} from 'lucide-react';

type TabId = 'colors' | 'typography' | 'spacing' | 'components' | 'guidelines';

export default function DesignSystem() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('colors');
  const [isDark, setIsDark] = useState(true);

  useState(() => {
    document.documentElement.classList.add('dark');
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const ColorSwatch = ({
    name,
    value,
    textColor = 'text-text-primary',
  }: {
    name: string;
    value: string;
    textColor?: string;
  }) => (
    <div
      className="group cursor-pointer"
      onClick={() => copyToClipboard(value, name)}
    >
      <div
        className="h-24 rounded-[var(--radius-md)] mb-3 relative overflow-hidden border border-border-primary/30 group-hover:scale-105 transition-transform"
        style={{ backgroundColor: value }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary/80">
          {copiedToken === name ? (
            <Check className="w-5 h-5 text-state-success" />
          ) : (
            <Copy className="w-5 h-5 text-text-primary" />
          )}
        </div>
      </div>
      <div className={`text-sm font-medium ${textColor} mb-1`}>{name}</div>
      <div className="text-xs text-text-muted font-mono">{value}</div>
    </div>
  );

  const TypographyExample = ({
    element,
    size,
    weight,
    lineHeight,
    usage,
  }: {
    element: string;
    size: string;
    weight: string;
    lineHeight: string;
    usage: string;
  }) => (
    <div className="border border-border-primary rounded-[var(--radius-md)] p-5">
      <div className="mb-3">
        <span className="text-text-muted text-sm">{element}</span>
        <span className="text-text-muted text-sm ml-4">• {usage}</span>
      </div>
      <div
        className="mb-4"
        style={{ fontSize: size, fontWeight: weight, lineHeight: lineHeight }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div className="flex gap-6 text-xs text-text-muted font-mono">
        <span>Size: {size}</span>
        <span>Weight: {weight}</span>
        <span>Line Height: {lineHeight}</span>
      </div>
    </div>
  );

  const SpacingBlock = ({ size, value }: { size: string; value: string }) => (
    <div className="flex items-center gap-4 p-4 border border-border-primary rounded-[var(--radius-md)]">
      <div
        className="bg-brand rounded-sm flex-shrink-0"
        style={{ width: value, height: value }}
      />
      <div className="flex-1">
        <div className="text-text-primary font-medium">Space {size}</div>
        <div className="text-text-muted text-sm font-mono">{value}</div>
      </div>
    </div>
  );

  const tabs: { id: TabId; label: string; icon: typeof Palette }[] = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Box },
    { id: 'components', label: 'Components', icon: Layers },
    { id: 'guidelines', label: 'Guidelines', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border-primary bg-bg-secondary/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between pr-48">
            <div className="flex items-center gap-3">
              <img src={lulaLogo} alt="LulaFi" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-semibold text-text-primary">LulaFi Design System</h1>
                <p className="text-xs text-text-muted">v1.0.0 • Foundation Tokens & Components</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border-primary bg-bg-secondary hover:bg-bg-tertiary transition-all"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary text-sm">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary text-sm">Dark</span>
                  </>
                )}
              </button>
              <LulaButton variant="primary">Download Assets</LulaButton>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-border-primary bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === id
                    ? 'border-brand text-text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-2">Color Palette</h2>
              <p className="text-text-secondary max-w-3xl">
                LulaFi's color system is built on HSL values for precise control.
                Click any swatch to copy its hex value.
              </p>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Backgrounds</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ColorSwatch name="BG / Primary" value="#0B1C2D" />
                <ColorSwatch name="BG / Secondary" value="#0F172A" />
                <ColorSwatch name="BG / Tertiary" value="#111827" />
              </div>
              <div className="mt-4 p-4 bg-bg-tertiary rounded-[var(--radius-md)] border border-border-primary">
                <p className="text-text-muted text-sm">
                  <strong className="text-text-secondary">Usage:</strong> Primary = app shell,
                  Secondary = cards & panels, Tertiary = modals & elevated surfaces
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Text</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ColorSwatch name="Text / Primary" value="#F8FAFC" />
                <ColorSwatch name="Text / Secondary" value="#CBD5E1" />
                <ColorSwatch name="Text / Muted" value="#94A3B8" />
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Brand</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ColorSwatch name="Brand / Primary" value="#2DD4BF" textColor="text-brand" />
                <ColorSwatch name="Brand / Hover" value="#14B8A6" textColor="text-brand-hover" />
                <ColorSwatch name="Brand / Active" value="#0D9488" textColor="text-brand-active" />
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">States</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ColorSwatch name="State / Success" value="#22C55E" textColor="text-state-success" />
                <ColorSwatch name="State / Warning" value="#F59E0B" textColor="text-state-warning" />
                <ColorSwatch name="State / Error" value="#EF4444" textColor="text-state-error" />
                <ColorSwatch name="State / Info" value="#6366F1" textColor="text-state-info" />
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Gradient</h3>
              <div
                className="h-32 rounded-[var(--radius-lg)] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2DD4BF 0%, #6366F1 100%)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-semibold mb-1">Gradient / Brand Flow</div>
                    <div className="text-white/80 text-sm font-mono">135° • #2DD4BF → #6366F1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-2">Typography</h2>
              <p className="text-text-secondary max-w-3xl mb-6">
                LulaFi uses Inter as the primary typeface with a simplified weight system.
                Headings never exceed Semibold (600).
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-[var(--radius-md)] border border-border-primary">
                <Type className="w-4 h-4 text-brand" />
                <span className="text-text-primary font-medium">Primary Typeface: Inter</span>
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Headings</h3>
              <div className="space-y-4">
                <TypographyExample element="Heading / LG" size="32px" weight="600" lineHeight="40px" usage="Page titles, hero headings" />
                <TypographyExample element="Heading / MD" size="24px" weight="500" lineHeight="32px" usage="Section headers, card titles" />
                <TypographyExample element="Heading / SM" size="18px" weight="500" lineHeight="28px" usage="Subsections, widget titles" />
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Body Text</h3>
              <div className="space-y-4">
                <TypographyExample element="Body / Base" size="16px" weight="400" lineHeight="24px" usage="Primary body text, form inputs" />
                <TypographyExample element="Body / SM" size="14px" weight="400" lineHeight="20px" usage="Labels, helper text, metadata" />
                <TypographyExample element="Body / XS" size="12px" weight="400" lineHeight="16px" usage="Captions, badges, timestamps" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-state-success/10 border border-state-success/20 rounded-[var(--radius-md)]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-state-success mt-0.5" />
                  <div>
                    <div className="text-state-success font-medium mb-2">Do</div>
                    <ul className="text-text-secondary text-sm space-y-1">
                      <li>• Use Medium (500) for most headings</li>
                      <li>• Use Semibold (600) only for h1</li>
                      <li>• Keep line-height proportional</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-state-error/10 border border-state-error/20 rounded-[var(--radius-md)]">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-state-error mt-0.5" />
                  <div>
                    <div className="text-state-error font-medium mb-2">Don't</div>
                    <ul className="text-text-secondary text-sm space-y-1">
                      <li>• No bold (700+) paragraphs</li>
                      <li>• Never exceed Semibold (600)</li>
                      <li>• Avoid mixing font families</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-2">Spacing & Layout</h2>
              <p className="text-text-secondary max-w-3xl mb-6">
                LulaFi uses an 8-point grid system for consistent, predictable spacing.
              </p>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Spacing Scale (8pt Grid)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SpacingBlock size="1" value="4px" />
                <SpacingBlock size="2" value="8px" />
                <SpacingBlock size="3" value="12px" />
                <SpacingBlock size="4" value="16px" />
                <SpacingBlock size="5" value="24px" />
                <SpacingBlock size="6" value="32px" />
                <SpacingBlock size="7" value="48px" />
                <SpacingBlock size="8" value="64px" />
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Usage Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LulaCard>
                  <div className="text-brand mb-3">Cards</div>
                  <div className="text-text-secondary text-sm">
                    Use Space 5 (24px) for card padding to create comfortable reading zones.
                  </div>
                </LulaCard>
                <LulaCard>
                  <div className="text-brand mb-3">Sections</div>
                  <div className="text-text-secondary text-sm">
                    Use Space 7 (48px) between major sections for clear visual hierarchy.
                  </div>
                </LulaCard>
                <LulaCard>
                  <div className="text-brand mb-3">Touch Targets</div>
                  <div className="text-text-secondary text-sm">
                    Minimum 44×44px touch targets for accessibility compliance.
                  </div>
                </LulaCard>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-2">Components</h2>
              <p className="text-text-secondary max-w-3xl">
                LulaFi's component library built on the design system tokens.
              </p>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-text-primary mb-6">Buttons</h3>
              <LulaCard>
                <div className="flex flex-wrap gap-4 items-center">
                  <LulaButton variant="primary">Primary</LulaButton>
                  <LulaButton variant="secondary">Secondary</LulaButton>
                  <LulaButton variant="secondary">Ghost</LulaButton>
                </div>
                <div className="mt-6 pt-4 border-t border-border-primary">
                  <div className="text-text-muted text-sm">
                    Min height: 48px • Border radius: var(--radius-md) • Font: 16px Medium
                  </div>
                </div>
              </LulaCard>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-text-primary mb-6">Badges</h3>
              <LulaCard>
                <div className="flex flex-wrap gap-3 items-center">
                  <LulaBadge variant="info">Info</LulaBadge>
                  <LulaBadge variant="success">Success</LulaBadge>
                  <LulaBadge variant="warning">Warning</LulaBadge>
                  <LulaBadge variant="neutral">Default</LulaBadge>
                </div>
              </LulaCard>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-text-primary mb-6">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LulaCard>
                  <div className="text-text-primary font-medium mb-2">Default Card</div>
                  <div className="text-text-secondary text-sm">
                    Standard card with bg-secondary background, border, and radius-lg.
                  </div>
                </LulaCard>
                <LulaCard className="bg-gradient-to-br from-brand/10 to-state-info/10 border border-brand/20">
                  <div className="text-text-primary font-medium mb-2">Accent Card</div>
                  <div className="text-text-secondary text-sm">
                    Cards can be enhanced with gradient backgrounds for emphasis.
                  </div>
                </LulaCard>
              </div>
            </div>
          </div>
        )}

        {/* Guidelines Tab */}
        {activeTab === 'guidelines' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-text-primary mb-2">Design Guidelines</h2>
              <p className="text-text-secondary max-w-3xl">
                LulaFi's design philosophy is rooted in simplicity and purposeful restraint.
              </p>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Brand Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Invisible Automation', desc: "Technology should work silently in the background. Users shouldn't think about the system." },
                  { title: 'Calm Intelligence', desc: "Intelligence doesn't need to be loud. Smart features should feel natural and predictable." },
                  { title: 'Finance-Grade Trust', desc: 'Every interaction must inspire confidence. Clarity over cleverness. Reliability over novelty.' },
                  { title: 'Flow Over Friction', desc: "Remove every unnecessary step. Optimize for the user's mental model." },
                ].map((p) => (
                  <LulaCard key={p.title} className="bg-gradient-to-br from-brand/10 to-state-info/10 border border-brand/20">
                    <div className="text-brand font-semibold mb-3">{p.title}</div>
                    <p className="text-text-secondary text-sm">{p.desc}</p>
                  </LulaCard>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Motion Principles</h3>
              <LulaCard>
                <div className="mb-6">
                  <div className="text-text-primary font-medium mb-4">
                    "Motion explains state — it never decorates."
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-brand text-sm mb-2">Fast • 150ms</div>
                    <div className="text-text-muted text-sm">Hover states, toggles, micro-interactions</div>
                  </div>
                  <div>
                    <div className="text-brand text-sm mb-2">Base • 250ms</div>
                    <div className="text-text-muted text-sm">Modals, dropdowns, standard transitions</div>
                  </div>
                  <div>
                    <div className="text-brand text-sm mb-2">Slow • 400ms</div>
                    <div className="text-text-muted text-sm">Page transitions, complex animations</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border-primary">
                  <div className="text-text-muted text-xs font-mono">Easing: cubic-bezier(0.4, 0, 0.2, 1)</div>
                </div>
              </LulaCard>
            </div>

            <div>
              <h3 className="text-text-primary mb-6">Logo Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LulaCard>
                  <div className="text-text-secondary mb-4">Approved Usage</div>
                  <div className="flex items-center justify-center bg-bg-primary p-8 rounded-[var(--radius-md)] mb-4">
                    <img src={lulaLogo} alt="LulaFi Logo" className="w-16 h-16" />
                  </div>
                  <div className="space-y-2 text-sm">
                    {['Minimum clear space = logo height', 'Use on BG/Primary or white backgrounds', 'Maintain aspect ratio always'].map((t) => (
                      <div key={t} className="flex items-start gap-2 text-state-success">
                        <CheckCircle2 className="w-4 h-4 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </LulaCard>
                <LulaCard>
                  <div className="text-text-secondary mb-4">Prohibited</div>
                  <div className="space-y-3 text-sm">
                    {['No drop shadows or effects', 'Never recolor individual nodes', 'Avoid busy or patterned backgrounds', "Don't rotate or distort"].map((t) => (
                      <div key={t} className="flex items-start gap-2 text-state-error">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </LulaCard>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-brand/5 to-state-info/5 border border-brand/20 rounded-[var(--radius-lg)] text-center">
              <h3 className="text-text-primary mb-3">Philosophy</h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                This design system is intentionally minimal. If a UI element needs heavy styling
                to feel usable, the problem is the UX — not the colors.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border-primary mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={lulaLogo} alt="LulaFi" className="w-6 h-6" />
              <span className="text-text-muted text-sm">
                LulaFi Design System • Turning data into documents — instantly, intelligently, securely.
              </span>
            </div>
            <div className="text-text-muted text-sm">v1.0.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
