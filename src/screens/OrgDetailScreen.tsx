import { useMemo, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import { useApp } from "@/context/AppContext";
import { LulaCard } from "@/components/lulafi/LulaCard";
import { LulaBadge } from "@/components/lulafi/LulaBadge";
import {
  getProvider,
  getProviderForms,
  providerDistanceKm,
  userLocation,
} from "@/data/providers";
import {
  Search,
  FileText,
  Clock,
  BadgeCheck,
  MapPin,
  Navigation,
  Sparkles,
  ChevronRight,
  SearchX,
} from "lucide-react";

const OrgDetailScreen = () => {
  const { navigate, activeProviderId, openProviderForm } = useApp();
  const provider = getProvider(activeProviderId);
  const [query, setQuery] = useState("");

  const forms = useMemo(
    () => (provider ? getProviderForms(provider.id) : []),
    [provider]
  );

  const q = query.trim().toLowerCase();
  const visible = forms.filter(
    f => !q || `${f.name} ${f.category} ${f.description}`.toLowerCase().includes(q)
  );

  const distance = provider ? providerDistanceKm(provider.id, userLocation) : null;

  if (!provider) {
    return (
      <ScreenLayout activeTab="discover">
        <div className="flex items-center px-6 pb-4">
          <BackButton to="psearch" />
        </div>
        <div className="px-6 py-12 flex flex-col items-center text-center gap-2">
          <SearchX size={28} className="text-text-muted" />
          <div className="text-sm font-medium text-text-primary">No provider selected</div>
          <button onClick={() => navigate("psearch")} className="text-xs text-brand underline">
            Back to service search
          </button>
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      activeTab="discover"
      header={
        <div className="px-6 pt-2 pb-3 flex items-center gap-3">
          <BackButton to="psearch" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-semibold text-text-primary truncate">{provider.name}</h1>
              {provider.verified && <BadgeCheck size={15} className="text-brand shrink-0" />}
            </div>
            <p className="text-[11px] text-text-muted truncate">{provider.category}</p>
          </div>
        </div>
      }
    >
      <div className="px-6 flex flex-col gap-6 pb-6">
        <LulaCard className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <LulaBadge variant="success">Active</LulaBadge>
            <LulaBadge variant="neutral">
              <FileText size={12} className="inline" /> {forms.length} forms
            </LulaBadge>
            {provider.verified && (
              <LulaBadge variant="info">
                <BadgeCheck size={12} className="inline" /> Verified
              </LulaBadge>
            )}
          </div>
          <div className="text-sm text-text-secondary">{provider.description}</div>
          <div className="h-px bg-border w-full" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin size={13} className="text-text-muted shrink-0" />
              {provider.city}, {provider.province}
            </div>
            {distance !== null && (
              <div className="flex items-center gap-1.5 text-sm text-brand">
                <Navigation size={13} className="shrink-0" />
                {distance < 10 ? `${distance.toFixed(1)} km` : `${Math.round(distance)} km`} from your address
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {provider.serviceTypes.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-bg-tertiary text-[10px] text-text-secondary">
                {t}
              </span>
            ))}
            {provider.eligibility.map(e => (
              <span key={e} className="px-2 py-0.5 rounded-full border border-border-primary text-[10px] text-text-muted">
                {e}
              </span>
            ))}
          </div>
        </LulaCard>

        <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-3 px-4">
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${provider.name} forms...`}
            aria-label="Search forms"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-text-primary">
            Forms available to fill
          </div>
          {visible.map(f => (
            <button
              key={f.id}
              onClick={() => openProviderForm(provider.id, f.id)}
              className="bg-bg-secondary border border-border-primary rounded-xl p-5 cursor-pointer hover:border-brand transition-colors text-left"
            >
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-medium text-text-primary">{f.name}</div>
                  <div className="text-sm text-text-secondary mt-1.5">{f.description}</div>
                </div>
                <ChevronRight size={16} className="text-text-muted shrink-0 mt-1" />
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="flex items-center gap-1 text-[11px] text-text-muted">
                  <FileText size={11} /> {f.fields} questions
                </span>
                <span className="flex items-center gap-1 text-[11px] text-brand">
                  <Sparkles size={11} /> {f.prefill.length} prefilled
                </span>
                <span className="flex items-center gap-1 text-[11px] text-text-muted">
                  <Clock size={11} /> Updated {f.updated}
                </span>
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <div className="flex flex-col items-center text-center gap-2 py-10">
              <SearchX size={26} className="text-text-muted" />
              <div className="text-sm font-medium text-text-primary">No forms match "{query}"</div>
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default OrgDetailScreen;
