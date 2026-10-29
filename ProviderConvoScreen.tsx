import { useState } from "react";
import ScreenLayout from "@/components/lulafi/ScreenLayout";
import AppHeader from "@/components/lulafi/AppHeader";
import SponsoredBanner from "@/components/lulafi/SponsoredBanner";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/screens";
import { Search, Zap, CalendarDays, Store } from "lucide-react";

const tiles: { label: string; sub: string; icon: typeof Search; screen: ScreenId }[] = [
  { label: "Service Search", sub: "Find providers", icon: Search, screen: "psearch" },
  { label: "Quick Actions", sub: "Scan & submit", icon: Zap, screen: "qr" },
  { label: "Calendar", sub: "Appointments", icon: CalendarDays, screen: "cal" },
  { label: "Marketplace", sub: "Coming soon", icon: Store, screen: "market" },
];


const HomeScreen = () => {
  const { navigate, openProviderForm } = useApp();
  const [query, setQuery] = useState("");

  const submitSearch = () => navigate("psearch");

  return (
    <ScreenLayout activeTab="home" header={<AppHeader />}>
      <div className="flex flex-col min-h-full pb-6 pt-2">


        <div className="px-6">
          <SponsoredBanner onClick={() => navigate("org")} />
        </div>

        <div className="px-6 mt-6">
          <h1 className="text-2xl font-semibold text-text-primary leading-tight">
            Find and manage services
          </h1>
          <p className="text-sm text-text-secondary mt-1.5">
            Search providers, start forms and track progress in one place.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              submitSearch();
            }}
            className="mt-4 flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-full py-3 px-4"
          >
            <Search size={16} className="text-text-muted shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search services, providers or forms"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted"
            />
          </form>
        </div>

        <div className="px-6 mt-6 grid grid-cols-2 gap-3">
          {tiles.map(({ label, sub, icon: Icon, screen }) => (
            <button
              key={label}
              onClick={() => navigate(screen)}
              className="bg-bg-secondary border border-border-primary rounded-xl p-4 flex flex-col items-start gap-3 text-left cursor-pointer hover:border-brand transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <Icon size={19} className="text-brand" />
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary leading-tight">{label}</div>
                <div className="text-[11px] text-text-muted mt-0.5">{sub}</div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </ScreenLayout>
  );
};

export default HomeScreen;
