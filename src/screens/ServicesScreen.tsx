import ScreenLayout from "@/components/lulafi/ScreenLayout";
import { useApp } from "@/context/AppContext";
import { Search, Building2, Landmark, Hospital, LayoutGrid, MapPin, Star, Briefcase } from "lucide-react";

const services = [
  { name: "18012715663", meta: "Medical · No reviews yet", icon: Building2 },
  { name: "27778765432", meta: "Financial Services · No reviews", icon: Building2 },
  { name: "27790749929", meta: "125 Rivonia Rd, Sandton, JHB", icon: Landmark },
  { name: "TechNova Solutions (Pty) Ltd", meta: "Financial Services · Sandton", icon: Hospital },
];

const filters: { label: string; icon: typeof LayoutGrid }[] = [
  { label: "All categories", icon: LayoutGrid },
  { label: "Location", icon: MapPin },
  { label: "Top rated", icon: Star },
  { label: "Medical", icon: Hospital },
  { label: "Finance", icon: Briefcase },
];

const ServicesScreen = () => {
  const { navigate } = useApp();

  return (
    <ScreenLayout activeTab="services">
      <div className="px-6 pb-6 flex flex-col gap-6">
        <div className="text-2xl font-medium text-text-primary">Services</div>
        <div className="flex items-center gap-3 bg-bg-secondary border border-border-primary rounded-md py-3 px-4">
          <Search size={15} className="text-text-muted shrink-0" />
          <input type="text" placeholder="Search services..." className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted" />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-0.5">
          {filters.map((f, i) => (
            <div key={i} className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors flex items-center gap-1.5 ${i === 0 ? "border-brand text-brand bg-brand/10" : "border-border-primary text-text-secondary bg-muted/10"}`}>
              <f.icon size={12} />
              {f.label}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={i}
                onClick={() => navigate("org")}
                className="flex items-center gap-4 p-4 bg-bg-secondary border border-border-primary rounded-lg cursor-pointer hover:border-brand hover:bg-brand/[0.04] transition-all text-left"
              >
                <div className="w-11 h-11 rounded-md bg-bg-tertiary flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{s.name}</div>
                  <div className="text-xs text-text-muted mt-0.5">{s.meta}</div>
                </div>
                <div className="text-text-muted text-base">›</div>
              </button>
            );
          })}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ServicesScreen;