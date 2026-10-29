import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, LogOut, type LucideIcon } from "lucide-react";

export type SettingsField =
  | { kind: "text"; id: string; name: string; sub?: string }
  | { kind: "toggle"; id: string; name: string; sub?: string; onChange?: (value: boolean) => void }
  | {
      kind: "select";
      id: string;
      name: string;
      sub?: string;
      options: string[];
      onChange?: (value: string) => void;
    }
  | { kind: "action"; id: string; name: string; sub?: string; danger?: boolean; done: string };

export interface SettingsSectionDef {
  id: string;
  label: string;
  icon: LucideIcon;
  items: SettingsField[];
}

interface SettingsSectionsProps {
  sections: SettingsSectionDef[];
  texts: Record<string, string>;
  selects: Record<string, string>;
  toggles: Record<string, boolean>;
  onTextChange: (id: string, value: string) => void;
  onSelectChange: (id: string, value: string) => void;
  onToggleChange: (id: string, value: boolean) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
  editing: string | null;
  setEditing: (id: string | null) => void;
  onSignOut: () => void;
  signOutLabel?: string;
  version?: string;
}

const ROW_BASE =
  "w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-border-primary last:border-b-0";
const ROW_COL =
  "w-full flex flex-col items-start gap-0 px-4 py-3.5 text-left border-b border-border-primary last:border-b-0";

export function SettingsSections({
  sections,
  texts,
  selects,
  toggles,
  onTextChange,
  onSelectChange,
  onToggleChange,
  open,
  setOpen,
  editing,
  setEditing,
  onSignOut,
  signOutLabel = "Sign out of lulaFi",
  version = "App version 1.0.40 (40)",
}: SettingsSectionsProps) {
  const toggleSection = (id: string) => setOpen(open === id ? null : id);

  const renderRow = (item: SettingsField) => {
    if (item.kind === "toggle") {
      const on = !!toggles[item.id];
      return (
        <button
          key={item.id}
          role="switch"
          aria-checked={on}
          onClick={() => {
            onToggleChange(item.id, !on);
            item.onChange?.(!on);
            toast.success(`${item.name} ${!on ? "enabled" : "disabled"}`);
          }}
          className={`${ROW_BASE} hover:bg-brand/[0.04] transition-colors cursor-pointer`}
        >
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-medium text-text-primary">{item.name}</span>
            {item.sub && (
              <span className="block text-[11px] text-text-muted mt-0.5">{item.sub}</span>
            )}
          </span>
          <span
            className={`w-10 h-6 rounded-full flex items-center p-0.5 shrink-0 transition-colors ${
              on ? "bg-brand" : "bg-bg-tertiary border border-border-primary"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-bg-secondary shadow-sm transition-transform ${
                on ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      );
    }

    if (item.kind === "select") {
      const isEditing = editing === item.id;
      return (
        <div key={item.id} className={`${ROW_COL} hover:bg-brand/[0.04] transition-colors`}>
          <button
            onClick={() => setEditing(isEditing ? null : item.id)}
            className="w-full flex items-center gap-3 text-left cursor-pointer"
          >
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-text-primary">{item.name}</span>
              {item.sub && (
                <span className="block text-[11px] text-text-muted mt-0.5">{item.sub}</span>
              )}
            </span>
            <span className="text-xs text-text-secondary shrink-0">{selects[item.id]}</span>
            <ChevronRight
              size={15}
              className={`text-text-muted shrink-0 transition-transform ${
                isEditing ? "rotate-90" : ""
              }`}
            />
          </button>
          {isEditing && (
            <div className="w-full mt-3 flex flex-wrap gap-2">
              {item.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelectChange(item.id, opt);
                    item.onChange?.(opt);
                    setEditing(null);
                    toast.success(`${item.name} set to ${opt}`);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium border cursor-pointer transition-colors ${
                    selects[item.id] === opt
                      ? "bg-brand text-primary-foreground border-brand"
                      : "bg-bg-primary text-text-secondary border-border-primary"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.kind === "text") {
      const isEditing = editing === item.id;
      return (
        <div key={item.id} className={`${ROW_COL} hover:bg-brand/[0.04] transition-colors`}>
          <button
            onClick={() => setEditing(isEditing ? null : item.id)}
            className="w-full flex items-center gap-3 text-left cursor-pointer"
          >
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-text-primary">{item.name}</span>
              {item.sub && (
                <span className="block text-[11px] text-text-muted mt-0.5">{item.sub}</span>
              )}
            </span>
            <span className="text-xs text-text-secondary shrink-0 max-w-[40%] truncate">
              {texts[item.id]}
            </span>
            <ChevronRight
              size={15}
              className={`text-text-muted shrink-0 transition-transform ${
                isEditing ? "rotate-90" : ""
              }`}
            />
          </button>
          {isEditing && (
            <form
              className="w-full mt-3 flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                const input =
                  (e.currentTarget.elements.namedItem("value") as HTMLInputElement) ?? null;
                const value = input?.value.trim();
                if (value) {
                  onTextChange(item.id, value);
                  setEditing(null);
                  toast.success(`${item.name} updated`);
                }
              }}
            >
              <input
                name="value"
                defaultValue={texts[item.id]}
                autoFocus
                className="min-w-0 flex-1 rounded-lg border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-brand px-4 text-xs font-semibold text-primary-foreground cursor-pointer"
              >
                Save
              </button>
            </form>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => toast.success(item.done)}
        className={`${ROW_BASE} hover:bg-brand/[0.04] transition-colors cursor-pointer`}
      >
        <span className="flex-1 min-w-0">
          <span
            className={`block text-sm font-medium ${
              item.danger ? "text-destructive" : "text-text-primary"
            }`}
          >
            {item.name}
          </span>
          {item.sub && <span className="block text-[11px] text-text-muted mt-0.5">{item.sub}</span>}
        </span>
        <ChevronRight size={15} className="text-text-muted shrink-0" />
      </button>
    );
  };

  return (
    <div className="px-6 mt-6 flex flex-col gap-3">
      {sections.map(({ id, label, icon: Icon, items }) => {
        const expanded = open === id;
        return (
          <div
            key={id}
            className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection(id)}
              aria-expanded={expanded}
              className="w-full flex items-center gap-3 px-4 py-4 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Icon size={17} className="text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-text-primary">{label}</span>
              <ChevronDown
                size={16}
                className={`text-text-muted transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {expanded && <div className="border-t border-border-primary">{items.map(renderRow)}</div>}
          </div>
        );
      })}

      {/* Sign out */}
      <div className="bg-bg-secondary border border-border-primary rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection("signout")}
          aria-expanded={open === "signout"}
          className="w-full flex items-center gap-3 px-4 py-4 text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut size={17} className="text-destructive" />
          </div>
          <span className="flex-1 text-sm font-medium text-text-primary">Sign out</span>
          <ChevronDown
            size={16}
            className={`text-text-muted transition-transform duration-200 ${
              open === "signout" ? "rotate-180" : ""
            }`}
          />
        </button>
        {open === "signout" && (
          <div className="border-t border-border-primary p-4">
            <button
              onClick={onSignOut}
              className="w-full rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold py-3 cursor-pointer"
            >
              {signOutLabel}
            </button>
            <div className="text-[11px] text-text-muted text-center mt-3">{version}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Convenience hook holding the three value maps + open/editing state. */
export function useSettingsState(initial: {
  texts?: Record<string, string>;
  selects?: Record<string, string>;
  toggles?: Record<string, boolean>;
  openSection?: string | null;
}) {
  const [open, setOpen] = useState<string | null>(initial.openSection ?? null);
  const [editing, setEditing] = useState<string | null>(null);
  const [texts, setTexts] = useState<Record<string, string>>(initial.texts ?? {});
  const [selects, setSelects] = useState<Record<string, string>>(initial.selects ?? {});
  const [toggles, setToggles] = useState<Record<string, boolean>>(initial.toggles ?? {});

  return {
    open,
    setOpen,
    editing,
    setEditing,
    texts,
    selects,
    toggles,
    onTextChange: (id: string, value: string) => setTexts(prev => ({ ...prev, [id]: value })),
    onSelectChange: (id: string, value: string) => setSelects(prev => ({ ...prev, [id]: value })),
    onToggleChange: (id: string, value: boolean) => setToggles(prev => ({ ...prev, [id]: value })),
  };
}
