import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  readThemePreference,
  resolveIsDark,
  setThemePreference,
  subscribeTheme,
  type ThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light mode", icon: Sun },
  { value: "dark", label: "Dark mode", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  className?: string;
}

/**
 * Appearance control: a sun/moon button that opens Light mode / Dark mode / System.
 * Icons keep the icon role (bright teal in both appearances); only the labels are text.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [preference, setPreference] = useState<ThemePreference>(() => readThemePreference());

  useEffect(() => subscribeTheme(setPreference), []);

  const TriggerIcon = resolveIsDark(preference) ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Change appearance"
          title="Change appearance"
          className={cn("h-9 w-9 rounded-full", className)}
        >
          <TriggerIcon aria-hidden="true" className="h-4 w-4 text-icon-interactive" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-44 border-border-primary bg-popover text-popover-foreground"
      >
        <DropdownMenuLabel className="text-text-muted">Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => setThemePreference(value as ThemePreference)}
        >
          {OPTIONS.map(({ value, label, icon: OptionIcon }) => (
            <DropdownMenuRadioItem key={value} value={value} className="gap-2">
              <OptionIcon aria-hidden="true" className="h-4 w-4 text-icon-interactive" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
