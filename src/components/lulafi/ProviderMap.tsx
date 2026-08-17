import { LatLng, providerCoords, ServiceProvider } from "@/data/providers";
import { Navigation } from "lucide-react";

type Props = {
  providers: ServiceProvider[];
  origin: LatLng;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

/** Lightweight schematic map: equirectangular projection of provider pins */
const ProviderMap = ({ providers, origin, selectedId, onSelect }: Props) => {
  const points = providers
    .map(p => ({ provider: p, coord: providerCoords[p.id] }))
    .filter(p => p.coord);

  const all = [origin, ...points.map(p => p.coord)];
  const lats = all.map(c => c.lat);
  const lngs = all.map(c => c.lng);
  const pad = 0.6;
  const minLat = Math.min(...lats) - pad;
  const maxLat = Math.max(...lats) + pad;
  const minLng = Math.min(...lngs) - pad;
  const maxLng = Math.max(...lngs) + pad;

  const x = (lng: number) => ((lng - minLng) / (maxLng - minLng || 1)) * 100;
  const y = (lat: number) => ((maxLat - lat) / (maxLat - minLat || 1)) * 100;

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-bg-tertiary border border-border-primary">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border-primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border-primary)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* origin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ left: `${x(origin.lng)}%`, top: `${y(origin.lat)}%` }}
      >
        <span className="absolute w-8 h-8 rounded-full bg-brand/20 animate-pulse" />
        <span className="w-3 h-3 rounded-full bg-brand border-2 border-bg-primary" />
      </div>

      {points.map(({ provider, coord }) => {
        const active = provider.id === selectedId;
        return (
          <button
            key={provider.id}
            onClick={() => onSelect?.(provider.id)}
            aria-label={provider.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x(coord.lng)}%`, top: `${y(coord.lat)}%` }}
          >
            <span
              className={`block rounded-full border transition-all ${
                active
                  ? "w-3.5 h-3.5 bg-brand border-bg-primary"
                  : "w-2.5 h-2.5 bg-text-secondary border-bg-primary"
              }`}
            />
          </button>
        );
      })}

      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-bg-primary/85 border border-border-primary">
        <Navigation size={11} className="text-brand" />
        <span className="text-[10px] text-text-secondary">
          {points.length} pin{points.length === 1 ? "" : "s"} near you
        </span>
      </div>
    </div>
  );
};

export default ProviderMap;
