import { useEffect, useState } from 'react';
import { LulaCard } from '@/components/lulafi/LulaCard';
import { LulaButton } from '@/components/lulafi/LulaButton';
import { LulaBadge } from '@/components/lulafi/LulaBadge';
import lulaLogo from '@/assets/lulafi-icon.png';
import { semanticColors, type ColorRoles } from '@/lib/colorRoles';
import { Button } from '@/components/ui/button';
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

/** Wordmark parts and the colour role each one takes, read straight from the spec
 *  so the guidelines show real values in both appearances at once. */
const WORDMARK_ROWS: { part: string; role: string; pick: (roles: ColorRoles) => string }[] = [
  { part: 'lula', role: 'content.primary', pick: (r) => r.content.primary },
  { part: 'Fi', role: 'content.interactive (text-brand)', pick: (r) => r.content.interactive },
  { part: 'Logo icon', role: 'brand.main', pick: (r) => r.brand.main },
  { part: 'Brand pressed', role: 'brand.pressed', pick: (r) => r.brand.pressed },
];

type TabId = 'colors' | 'typography' | 'spacing' | 'components' | 'guidelines';

export default function DesignSystem() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('colors');
  const [isDark, setIsDark] = useState(false);
  const roles = semanticColors[isDark ? "dark" : "light"];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    return () => document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
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
    <Button variant="ghost"
      className="group h-auto flex-col items-stretch p-0 text-left hover:bg-transparent"
      onClick={() => copyToClipboard(value, name)}
    >
      <div
        className="w-full h-24 rounded-[var(--radius-md)] mb-3 relative overflow-hidden border border-border-primary/30 group-hover:scale-105 transition-transform"
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
    </Button>
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={lulaLogo} alt="LulaFi" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-semibold text-text-primary">LulaFi Design System</h1>
                <p className="text-xs text-text-muted">v1.0.0 • Foundation Tokens & Components</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline"
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
              </Button>
              <LulaButton variant="primary">Download Assets</LulaButton>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-border-primary bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Button variant="ghost"
                key={id}
                onClick={() => setActiveTab(id)}
                aria-pressed={activeTab === id}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === id
                    ? 'border-brand text-text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Button>
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

            {[
              { title: "Surfaces", entries: roles.surface },
              { title: "Content", entries: roles.content },
              { title: "Strokes", entries: roles.stroke },
              { title: "Brand", entries: roles.brand },
              { title: "Chat", entries: roles.chat },
              ...Object.entries(roles.status).map(([name, entries]) => ({ title: `Status / ${name}`, entries })),
              { title: "Identity", entries: Object.fromEntries(roles.identity.map((color, i) => [`Person ${i + 1}`, color])) },
            ].map(({ title, entries }) => (
              <section key={title}>
                <h3 className="text-text-primary mb-6">{title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {Object.entries(entries).map(([name, value]) => <ColorSwatch key={name} name={name} value={value} />)}
                </div>
              </section>
            ))}

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

            {/* Wordmark Colours */}
            <div>
              <h3 className="text-text-primary mb-6">Wordmark Colours</h3>
              <p className="text-text-secondary max-w-3xl mb-6">
                The lulaFi wordmark is always two tones: <span className="font-medium text-text-primary">lula</span> in
                primary text and <span className="font-medium text-text-primary">Fi</span> in the interactive teal green.
                Royal blue never colours the wordmark — it stays in the logo icon, gradients and brand art. The dark
                appearance is a lighter pair of the same two roles, so the mark keeps its contrast on the dark canvas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: 'Light appearance', roles: semanticColors.light, note: 'teal green' },
                  { label: 'Dark appearance', roles: semanticColors.dark, note: 'light teal green' },
                ].map((variant) => (
                  <LulaCard key={variant.label}>
                    <div className="text-text-secondary mb-4">{variant.label}</div>
                    <div
                      className="rounded-[var(--radius-md)] px-8 py-10 flex items-center justify-center"
                      style={{ backgroundColor: variant.roles.surface.screen }}
                    >
                      <span
                        className="text-3xl font-semibold tracking-tight"
                        style={{ color: variant.roles.content.primary }}
                      >
                        lula<span style={{ color: variant.roles.content.interactive }}>Fi</span>
                      </span>
                    </div>
                    <div className="mt-4 text-xs text-text-muted font-mono">
                      lula {variant.roles.content.primary} · Fi {variant.roles.content.interactive} ({variant.note})
                    </div>
                  </LulaCard>
                ))}
              </div>

              <LulaCard className="mb-6">
                <div className="text-text-secondary mb-4">Wordmark tokens</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="text-left text-text-muted border-b border-border-primary">
                        <th className="py-3 pr-6 font-medium">Part</th>
                        <th className="py-3 pr-6 font-medium">Role</th>
                        <th className="py-3 pr-6 font-medium">Light</th>
                        <th className="py-3 font-medium">Dark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WORDMARK_ROWS.map((row) => (
                        <tr key={row.part} className="border-b border-border-primary/60 last:border-0">
                          <td className="py-3 pr-6 text-text-primary font-medium">{row.part}</td>
                          <td className="py-3 pr-6 text-text-muted font-mono text-xs">{row.role}</td>
                          <td className="py-3 pr-6">
                            <span className="inline-flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-sm border border-stroke-control"
                                style={{ backgroundColor: row.pick(semanticColors.light) }}
                              />
                              <span className="font-mono text-xs text-text-secondary">
                                {row.pick(semanticColors.light)}
                              </span>
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-sm border border-stroke-control"
                                style={{ backgroundColor: row.pick(semanticColors.dark) }}
                              />
                              <span className="font-mono text-xs text-text-secondary">
                                {row.pick(semanticColors.dark)}
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </LulaCard>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <LulaCard>
                  <div className="text-brand font-semibold mb-3">Teal green — use always</div>
                  <p className="text-text-secondary text-sm">
                    The <span className="font-medium text-text-primary">Fi</span> in every wordmark: app headers, splash,
                    landing header and footer, portal log-in and sidebar, Get the app and Desktop app pages. Also the
                    role for buttons, links, focus rings and selection.
                  </p>
                </LulaCard>
                <LulaCard>
                  <div className="text-brand-main font-semibold mb-3">Royal blue — never the wordmark</div>
                  <p className="text-text-secondary text-sm">
                    Reserved for the logo icon, gradients, brand art and the info status tone. Use it beside the wordmark,
                    never inside it — a blue <span className="font-medium text-text-primary">Fi</span> reads as a
                    different brand.
                  </p>
                </LulaCard>
                <LulaCard>
                  <div className="text-text-primary font-semibold mb-3">Dark-mode variant</div>
                  <p className="text-text-secondary text-sm">
                    On the dark canvas the wordmark flips to
                    <span className="font-mono text-xs"> {semanticColors.dark.content.primary}</span> and
                    <span className="font-mono text-xs"> {semanticColors.dark.content.interactive}</span>; the icon's
                    royal blue lifts to <span className="font-mono text-xs"> {semanticColors.dark.brand.main}</span> so
                    it stays readable. Both are automatic — use the roles, not the hex values.
                  </p>
                </LulaCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-state-success/10 border border-state-success/20 rounded-[var(--radius-md)]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-state-success mt-0.5" />
                    <div>
                      <div className="text-state-success font-medium mb-2">Do</div>
                      <ul className="text-text-secondary text-sm space-y-1">
                        <li>• Colour the wordmark with the text roles so it adapts to the appearance</li>
                        <li>• Keep "lula" and "Fi" on one baseline at one size and weight</li>
                        <li>• Place it on flat surface colours from the palette</li>
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
                        <li>• Never colour "Fi" royal blue or the foundation teal #17bebb</li>
                        <li>• Never recolour "lula" to a status or accent colour</li>
                        <li>• Never hand-pick a hex — the roles switch modes for you</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
