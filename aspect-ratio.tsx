import tshwaneLogo from "@/assets/tshwane-logo.png";

interface TshwaneSponsoredProps {
  onOpen?: () => void;
}

/**
 * Sponsored slot using the official City of Tshwane logo and brand colours
 * (green swoosh, yellow sun, orange accent). Same footprint as SponsoredBanner.
 */
const TshwaneSponsored = ({ onOpen }: TshwaneSponsoredProps) => (
  <button
    onClick={onOpen}
    className="relative w-full overflow-hidden rounded-xl border border-tshwane-green/40 bg-bg-secondary text-left"
  >
    <span className="absolute left-0 top-0 h-full w-1 bg-[image:var(--gradient-tshwane)]" />
    <div className="relative flex items-center gap-3 p-4">
      <img
        src={tshwaneLogo}
        alt="City of Tshwane"
        loading="lazy"
        width={620}
        height={580}
        className="h-11 w-11 shrink-0 object-contain"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[9px] font-semibold uppercase tracking-[2px] text-tshwane-green-dark dark:text-tshwane-green">
          Sponsored · City of Tshwane
        </div>
        <div className="mt-1 truncate text-base font-semibold text-text-primary">
          Renew your municipal account
        </div>
        <div className="text-[9px] font-semibold uppercase tracking-[2px] text-tshwane-orange">
          Igniting Excellence
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-[image:var(--gradient-tshwane)] px-3 py-1.5 text-xs font-semibold text-bg-primary">
        Open
      </span>
    </div>
  </button>
);

export default TshwaneSponsored;
