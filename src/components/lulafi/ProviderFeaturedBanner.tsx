interface ProviderFeaturedBannerProps {
  onClick?: () => void;
}

const ProviderFeaturedBanner = ({ onClick }: ProviderFeaturedBannerProps) => (
  <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[hsl(215,75%,14%)] via-[hsl(206,80%,20%)] to-[hsl(190,70%,28%)] p-4">
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-semibold uppercase tracking-[2px] text-white/60">
          Featured
        </div>
        <div className="mt-1 text-base font-semibold text-white truncate">
          Tools that help your business grow
        </div>
        <div className="mt-0.5 text-[11px] text-white/70 truncate">
          Discover solutions for your provider team
        </div>
      </div>
      <button
        onClick={onClick}
        className="shrink-0 rounded-md bg-white/15 border border-white/25 px-4 py-2 text-xs font-semibold text-white cursor-pointer hover:bg-white/25 transition-colors"
      >
        View
      </button>
    </div>
  </div>
);

export default ProviderFeaturedBanner;
