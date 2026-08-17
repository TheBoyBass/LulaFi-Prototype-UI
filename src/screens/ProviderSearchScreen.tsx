import { useMemo, useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import BackButton from "@/components/lulafi/BackButton";
import ProviderMap from "@/components/lulafi/ProviderMap";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import {
  serviceProviders,
  providerCategories,
  serviceTypes,
  eligibilityOptions,
  provinces,
  provinceCenters,
  userLocation,
  providerDistanceKm,
  buildProviderLink,
  ProviderCategory,
  ServiceType,
  Eligibility,
} from "@/data/providers";
import {
  Search,
  SearchX,
  BadgeCheck,
  ChevronRight,
  SlidersHorizontal,
  X,
  MapPin,
  FileText,
  Map as MapIcon,
  Share2,
  Navigation,
} from "lucide-react";

type Filter = "All" | ProviderCategory;
type SortMode = "relevance" | "distance";

interface ProviderSearchScreenProps {
  /** Bottom-nav tab to highlight (Discover reuses this screen) */
  tab?: "home" | "discover";
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

const ProviderSearchScreen = ({
  tab = "home",
  title = "Service search",
  subtitle = "Find banks, municipalities and government services",
  showBack = true,
}: ProviderSearchScreenProps) => {
  const { navigate, openProviderForm, openProviderDetail } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<ServiceType[]>([]);
  const [province, setProvince] = useState<string>("Any");
  const [selectedEligibility, setSelectedEligibility] = useState<Eligibility[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>("relevance");
  const [showMap, setShowMap] = useState(true);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const origin = province !== "Any" ? provinceCenters[province] ?? userLocation : userLocation;
  const originLabel = province !== "Any" ? province : "Centurion (your address)";

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const advancedCount =
    selectedTypes.length +
    selectedEligibility.length +
    (province !== "Any" ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const clearAdvanced = () => {
    setSelectedTypes([]);
    setSelectedEligibility([]);
    setProvince("Any");
    setVerifiedOnly(false);
  };

  const shareProvider = async (providerId: string, name: string) => {
    const url = buildProviderLink(providerId, undefined);
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} on lulaFi`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: `Anyone opening it lands on the ${name} form, prefilled.` });
    } catch {
      toast({ title: "Share link", description: url });
    }
  };

  const results = useMemo(() => {
    const list = serviceProviders.filter(p => {
      if (filter !== "All" && p.category !== filter) return false;
      if (verifiedOnly && !p.verified) return false;
      if (province !== "Any" && p.province !== province && p.province !== "Nationwide") return false;
      if (selectedTypes.length && !selectedTypes.some(t => p.serviceTypes.includes(t))) return false;
      if (selectedEligibility.length && !selectedEligibility.every(e => p.eligibility.includes(e)))
        return false;
      if (!q) return true;
      const hay = `${p.name} ${p.category} ${p.description} ${p.city} ${p.province} ${p.serviceTypes.join(" ")} ${p.primaryForm.name}`.toLowerCase();
      return hay.includes(q);
    });

    if (sort === "distance") {
      return [...list].sort((a, b) => {
        const da = providerDistanceKm(a.id, origin) ?? Infinity;
        const db = providerDistanceKm(b.id, origin) ?? Infinity;
        return da - db;
      });
    }
    return list;
  }, [q, filter, selectedTypes, province, selectedEligibility, verifiedOnly, sort, origin]);

  const filters: Filter[] = ["All", ...providerCategories];

  const chip = (active: boolean) =>
    `shrink-0 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
      active
        ? "bg-brand text-bg-primary border-brand"
        : "bg-bg-secondary text-text-secondary border-border-primary hover:border-brand"
    }`;

  const fmtKm = (km: number | null) =>
    km === null ? null : km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;

  return (
    <ScreenLayout
      activeTab={tab}
      header={
        <div className="px-6 pt-2 pb-3 flex items-center gap-3">
          {showBack && <BackButton to="home" />}
          <div>
            <h1 className="text-base font-semibold text-text-primary leading-tight">{title}</h1>
            <p className="text-[11px] text-text-muted">{subtitle}</p>
          </div>
        </div>
      }
    >
      <div className="pb-6">
        <div className="px-6 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-3 px-4">
            <Search size={16} className="text-text-muted shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search providers, e.g. CIPC or Capitec"
              aria-label="Search providers"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                <X size={15} className="text-text-muted" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            aria-label="Advanced filters"
            aria-expanded={showFilters}
            className={`relative w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              showFilters || advancedCount
                ? "bg-brand/10 border-brand text-brand"
                : "bg-bg-secondary border-border-primary text-text-secondary"
            }`}
          >
            <SlidersHorizontal size={17} />
            {advancedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-brand text-bg-primary text-[10px] font-semibold flex items-center justify-center">
                {advancedCount}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar px-6">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={chip(filter === f)}>
              {f}
            </button>
          ))}
        </div>

        {/* Sort + map toggle */}
        <div className="px-6 mt-4 flex items-center gap-2">
          <div className="flex-1 flex gap-1 p-1 bg-bg-secondary border border-border-primary rounded-full">
            {(["relevance", "distance"] as SortMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setSort(mode)}
                className={`flex-1 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                  sort === mode ? "bg-brand text-bg-primary" : "text-text-secondary"
                }`}
              >
                {mode === "relevance" ? "Best match" : "Nearest first"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowMap(v => !v)}
            aria-label={showMap ? "Hide map" : "Show map"}
            aria-pressed={showMap}
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              showMap
                ? "bg-brand/10 border-brand text-brand"
                : "bg-bg-secondary border-border-primary text-text-secondary"
            }`}
          >
            <MapIcon size={16} />
          </button>
        </div>

        {showMap && (
          <div className="px-6 mt-3">
            <ProviderMap
              providers={results}
              origin={origin}
              selectedId={focusedId}
              onSelect={setFocusedId}
            />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-muted">
              <Navigation size={11} className="text-brand shrink-0" />
              <span className="truncate">Distances measured from {originLabel}</span>
            </div>
          </div>
        )}



        {/* Advanced filters */}
        {showFilters && (
          <div className="mx-6 mt-4 p-4 bg-bg-secondary border border-border-primary rounded-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Advanced filters</span>
              {advancedCount > 0 && (
                <button onClick={clearAdvanced} className="text-xs text-brand">
                  Clear all
                </button>
              )}
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-text-muted mb-2">Service type</div>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => toggle(selectedTypes, t, setSelectedTypes)}
                    className={chip(selectedTypes.includes(t))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-text-muted mb-2">Location</div>
              <div className="flex flex-wrap gap-2">
                {["Any", ...provinces].map(p => (
                  <button key={p} onClick={() => setProvince(p)} className={chip(province === p)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-text-muted mb-2">
                Eligibility requirements
              </div>
              <div className="flex flex-wrap gap-2">
                {eligibilityOptions.map(e => (
                  <button
                    key={e}
                    onClick={() => toggle(selectedEligibility, e, setSelectedEligibility)}
                    className={chip(selectedEligibility.includes(e))}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setVerifiedOnly(v => !v)}
              className="flex items-center justify-between py-1"
            >
              <span className="text-sm text-text-primary">Verified providers only</span>
              <span
                className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                  verifiedOnly ? "bg-brand" : "bg-bg-tertiary border border-border-primary"
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-bg-primary shadow-sm transition-transform ${
                    verifiedOnly ? "translate-x-4" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        )}

        <div className="px-6 mt-4 text-[11px] text-text-muted">
          {results.length} provider{results.length === 1 ? "" : "s"}
          {advancedCount > 0 && ` · ${advancedCount} filter${advancedCount === 1 ? "" : "s"} applied`}
        </div>

        <div className="px-6 mt-3 flex flex-col gap-3">
          {results.map(p => (
            <div
              key={p.id}
              onMouseEnter={() => setFocusedId(p.id)}
              className={`p-4 bg-bg-secondary border rounded-xl flex flex-col gap-3 transition-colors ${
                focusedId === p.id ? "border-brand" : "border-border-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openProviderDetail(p.id)}
                  className="flex items-center gap-3 text-left min-w-0 flex-1"
                >
                  <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-semibold text-brand">{p.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-text-primary truncate">{p.name}</span>
                      {p.verified && <BadgeCheck size={14} className="text-brand shrink-0" />}
                    </div>
                    <div className="text-[11px] text-text-muted truncate mt-0.5">{p.description}</div>
                    <div className="flex items-center gap-1 text-[11px] text-text-secondary mt-1">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">
                        {p.city}, {p.province} · {p.forms} forms
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-text-muted shrink-0" />
                </button>
                <button
                  onClick={() => shareProvider(p.id, p.name)}
                  aria-label={`Share ${p.name} form link`}
                  className="w-9 h-9 rounded-full border border-border-primary bg-bg-primary flex items-center justify-center shrink-0 text-text-secondary hover:text-brand hover:border-brand transition-colors"
                >
                  <Share2 size={14} />
                </button>
              </div>

              {fmtKm(providerDistanceKm(p.id, origin)) && (
                <div className="flex items-center gap-1.5 text-[11px] text-brand">
                  <Navigation size={11} className="shrink-0" />
                  <span>{fmtKm(providerDistanceKm(p.id, origin))} away</span>
                </div>
              )}


              <div className="flex flex-wrap gap-1.5">
                {p.serviceTypes.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-bg-tertiary text-[10px] text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
                {p.eligibility.map(e => (
                  <span
                    key={e}
                    className="px-2 py-0.5 rounded-full border border-border-primary text-[10px] text-text-muted"
                  >
                    {e}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openProviderForm(p.id)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-brand/10 border border-brand/30 hover:bg-brand/15 transition-colors text-left"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <FileText size={14} className="text-brand shrink-0" />
                  <span className="text-xs font-medium text-brand truncate">
                    Start {p.primaryForm.name}
                  </span>
                </span>
                <span className="text-[10px] text-brand shrink-0">
                  {p.primaryForm.prefill.length} fields prefilled
                </span>
              </button>
            </div>
          ))}

          {results.length === 0 && (
            <div className="flex flex-col items-center text-center gap-2 py-12">
              <SearchX size={28} className="text-text-muted" />
              <div className="text-sm font-medium text-text-primary">No providers found</div>
              <div className="text-xs text-text-muted max-w-[240px]">
                Try another name, or relax the service type, location and eligibility filters.
              </div>
              {advancedCount > 0 && (
                <button onClick={clearAdvanced} className="text-xs text-brand mt-1 underline">
                  Clear advanced filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ProviderSearchScreen;
