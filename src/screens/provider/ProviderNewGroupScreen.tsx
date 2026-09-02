import { useMemo, useState } from "react";
import ProviderLayout from "@/components/lulafi/ProviderLayout";
import { LulaButton } from "@/components/lulafi/LulaButton";
import { useApp } from "@/context/AppContext";
import { providerStaff } from "@/data/provider";
import { Search, Check, UserRoundPlus } from "lucide-react";
import { toast } from "sonner";

const ProviderNewGroupScreen = () => {
  const { navigateProvider } = useApp();
  const [name, setName] = useState("Service Desk Team");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(["st1", "st2"]);

  const staff = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providerStaff.filter(
      s => !q || s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id: string) =>
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <ProviderLayout title="New Group" activeTab="sem">
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-semibold text-text-primary">New Processing Group</h1>
        <p className="mt-1 text-sm text-text-secondary">Step 2 of 3 · Select members</p>

        <label className="mt-5 block text-sm font-medium text-text-primary">Group name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border-primary bg-bg-secondary px-3 py-3 text-sm text-text-primary outline-none focus:border-brand"
        />

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border-primary bg-bg-secondary px-4 py-3">
          <Search size={16} className="shrink-0 text-text-muted" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search provider staff"
            className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
        </div>

        <div className="mt-4 text-sm font-medium text-text-primary">Provider Directory</div>
        <div className="mt-2 rounded-xl border border-border-primary bg-bg-secondary px-4">
          {staff.map((s, i) => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`flex w-full items-center gap-3 py-3 text-left cursor-pointer ${
                i > 0 ? "border-t border-border-primary" : ""
              }`}
            >
              <span className="w-9 h-9 shrink-0 rounded-full bg-brand/10 flex items-center justify-center text-[11px] font-semibold text-brand">
                {s.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text-primary truncate">{s.name}</span>
                <span className="block text-[11px] text-text-muted truncate">{s.role}</span>
              </span>
              <span
                className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center ${
                  selected.includes(s.id)
                    ? "bg-brand border-brand text-bg-primary"
                    : "border-border-primary"
                }`}
              >
                {selected.includes(s.id) && <Check size={14} />}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 text-xs text-text-secondary">{selected.length} members selected</div>

        <LulaButton
          variant="secondary"
          className="mt-3 w-full flex items-center justify-center gap-2"
          onClick={() => toast.success("Staff invitation sent")}
        >
          <UserRoundPlus size={16} /> Invite staff member
        </LulaButton>

        <LulaButton
          className="mt-3 w-full"
          onClick={() => {
            toast.success(`${name} created with ${selected.length} members`);
            navigateProvider("psem");
          }}
        >
          Review Group
        </LulaButton>
        <LulaButton
          variant="secondary"
          className="mt-3 w-full"
          onClick={() => navigateProvider("psem")}
        >
          Back
        </LulaButton>
      </div>
    </ProviderLayout>
  );
};

export default ProviderNewGroupScreen;
