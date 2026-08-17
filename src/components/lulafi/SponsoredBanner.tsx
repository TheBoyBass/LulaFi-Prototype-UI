import bannerImage from "@/assets/sponsored-banner.jpg";

interface SponsoredBannerProps {
  brand?: string;
  headline?: string;
  cta?: string;
  onClick?: () => void;
}

const SponsoredBanner = ({
  brand = "Aerolite",
  headline = "Just keep moving.",
  cta = "Shop now",
  onClick,
}: SponsoredBannerProps) => (
  <button
    onClick={onClick}
    className="relative w-full overflow-hidden rounded-xl border border-border-primary text-left cursor-pointer"
  >
    <img
      src={bannerImage}
      alt=""
      loading="lazy"
      width={1536}
      height={768}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
    <div className="relative flex items-center gap-3 p-4">
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-semibold uppercase tracking-[2px] text-white/60">
          Sponsored · {brand}
        </div>
        <div className="mt-1 text-base font-semibold text-white truncate">{headline}</div>
      </div>
      <span className="shrink-0 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black">
        {cta}
      </span>
    </div>
  </button>
);

export default SponsoredBanner;
