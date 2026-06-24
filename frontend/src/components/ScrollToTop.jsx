import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Tracking params that Google/ads/social platforms append to inbound links.
// These are stripped from the address bar (cosmetic only — canonical tags
// already handle SEO). Functional params like tab/plan/token are NOT listed,
// so they're preserved.
const TRACKING_PARAMS = [
  "srsltid",   // Google Merchant Center / free listings
  "gclid",     // Google Ads
  "gbraid",
  "wbraid",
  "dclid",     // Google Display
  "fbclid",    // Facebook
  "msclkid",   // Microsoft / Bing Ads
  "twclid",    // Twitter/X
  "igshid",    // Instagram
  "mc_cid",
  "mc_eid",
];

function cleanTrackingParams() {
  const url = new URL(window.location.href);
  let changed = false;
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.includes(key) || key.startsWith("utm_")) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  if (changed) {
    // Replace (not push) so back-button history isn't polluted and no reload.
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }
}

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    cleanTrackingParams();
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
