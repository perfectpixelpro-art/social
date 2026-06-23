/*
 * Pre-renders the marketing pages to static HTML using react-snap so that
 * search engines and AI crawlers receive real content (not a blank <div>).
 *
 * - Runs after `vite build` (see package.json "build" script).
 * - Uses the system Chrome/Chromium (react-snap's bundled 2019 Chromium does
 *   not run on Apple Silicon / modern Linux).
 * - Only the public marketing routes are pre-rendered. Dashboard/admin/auth
 *   stay client-side rendered.
 * - If Chrome can't be found/launched, it logs a warning and exits 0 so the
 *   build never fails (you just don't get pre-rendering until Chrome exists).
 */
const { run } = require("react-snap");

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  (process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "/usr/bin/chromium-browser");

const include = [
  "/",
  "/services",
  "/work",
  "/pricing",
  "/about",
  "/contact",
  "/social-media-management",
  "/short-form-videos",
  "/services/website",
  "/website",
  "/blogs",
  "/refund-policy",
  "/privacy-policy",
  "/privacy",
  "/terms",
  "/terms-of-service",
  "/deletion-data",
  "/careers",
  "/book-a-call",
  "/med-spa",
  "/pet-and-grooming",
  "/salons-and-beauty",
  "/restaurants",
  "/bars",
  // Blog posts
  "/blogs/real-roi-99-social-media-management",
  "/blogs/small-business-invisible-social-media-2026",
  "/blogs/psychology-customers-buy-businesses-they-follow",
  "/blogs/from-zero-to-1000-followers-the-small-business-playbook-for-2026",
  "/blogs/when-to-post-how-to-batch-and-how-to-schedule-30-days-of-social-media-in-one-sitting",
];

run({
  source: "dist",
  crawl: false,
  include,
  puppeteerExecutablePath: chrome,
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  skipThirdPartyRequests: true,
  // Vite output — disable react-snap's webpack-specific HTML rewriting.
  fixWebpackChunksIssue: false,
  inlineCss: false,
})
  .then(() => console.log("✅ Pre-render complete"))
  .catch((e) => {
    console.warn("⚠️  Pre-render skipped (build still succeeds):", e.message);
    process.exit(0);
  });
