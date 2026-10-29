export type ProviderLinkTab = "inbox" | "sem";

/** Build a shareable deep link to a specific provider inbox submission or LulaSEM thread */
export const buildProviderDeepLink = (tab: ProviderLinkTab, itemId: string) => {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  const params = new URLSearchParams({ mode: "provider", ptab: tab, item: itemId });
  return `${origin}${path}?${params.toString()}`;
};

/** Copy (or natively share) a provider deep link. Returns the url. */
export const shareProviderDeepLink = async (
  tab: ProviderLinkTab,
  itemId: string,
  title: string
) => {
  const url = buildProviderDeepLink(tab, itemId);
  try {
    if (navigator.share) {
      await navigator.share({ title: `${title} on lulaFi`, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  } catch {
    /* user dismissed the share sheet */
  }
  return url;
};
