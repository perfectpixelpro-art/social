// Shared pricing data — used by the Pricing page and the Checkout page.
export const tabs = ["Marketing", "Videos", "Website"];

export const pricing = {
  Marketing: [
    {
      tier: "BASIC", name: "Starter", desc: "Get consistent, professional content posted every month.",
      price: "99", period: "per month",
      features: [
        ["4 custom graphics / month", true], ["2 custom videos / month", true],
        ["1 revision per deliverable", true], ["Creative execution", true],
        ["Content strategy", true], ["Reliable turnaround", true],
        ["Captions", false], ["Weekly report", false], ["Scheduling", false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "Strategy-driven content with captions and a plan behind every post.",
      price: "199", period: "per month", featured: true,
      features: [
        ["8 custom graphics / month", true], ["4 custom videos / month", true],
        ["2 revisions per deliverable", true], ["Creative execution", true],
        ["Consistent brand presence", true], ["Captions", true],
        ["Scheduling", true], ["Content strategy", true],
        ["Reliable turnaround", true], ["Weekly report", false],
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "Full-service management with analytics, scheduling, and competitor insights.",
      price: "299", period: "per month",
      features: [
        ["12 custom graphics / month", true], ["4 carousels (up to 3 slides)", true],
        ["6 custom videos / month", true], ["Unlimited revisions", true],
        ["Creative execution", true], ["Consistent brand presence", true],
        ["Captions", true], ["Scheduling", true],
        ["Weekly report", true], ["Competitor analysis", true],
      ],
    },
  ],
  Videos: [
    {
      tier: "BASIC", name: "Starter", desc: "Short-form videos to get your brand seen on Reels, Shorts, and TikTok.",
      price: "99", period: "per month",
      features: [
        ["4 short-form videos / month", true], ["1 revision per video", true],
        ["Professional editing", true], ["Creative execution", true],
        ["Reliable turnaround", true], ["Clear deliverables", true],
        ["Storyboarding", false], ["Captions", false], ["Weekly report", false], ["Scheduling", false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "Strategy-backed videos with structured storytelling and captions.",
      price: "199", period: "per month", featured: true,
      features: [
        ["8 short-form videos / month", true], ["2 revisions per video", true],
        ["Professional editing", true], ["Storyboarding", true],
        ["Captions", true], ["Scheduling", true],
        ["Structured storytelling", true], ["Message clarity", true],
        ["Reliable turnaround", true], ["Weekly report", false],
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "Complete video management with scheduling, community, and analytics.",
      price: "299", period: "per month",
      features: [
        ["12 short-form videos / month", true], ["Unlimited revisions", true],
        ["Professional editing", true], ["Storyboarding", true],
        ["Captions", true], ["Scheduling", true],
        ["Community management", true], ["Competitor analysis", true],
        ["Weekly report", true],
      ],
    },
  ],
  Website: [
    {
      tier: "BASIC", name: "Starter", desc: "A clean, professional single-page site to establish your online presence.",
      price: "99", period: "per month",
      features: [
        ["Single page website", true], ["1 revision included", true],
        ["Content writing", true], ["Focused messaging", true],
        ["Simple page layout", true], ["Foundational web presence", true],
        ["Reliable turnaround", true], ["Premium stock assets", false],
      ],
    },
    {
      tier: "STANDARD", name: "Growth", desc: "A multi-page site built to rank, convert, and grow your business.",
      price: "199", period: "per month", featured: true,
      features: [
        ["Two-page website", true], ["2 revisions included", true],
        ["Content writing", true], ["SEO-optimized keywords", true],
        ["Keyword-aligned content", true], ["Search visibility foundation", true],
        ["Focused messaging", true], ["Reliable turnaround", true], ["Premium stock assets", false],
      ],
    },
    {
      tier: "PREMIUM", name: "Pro", desc: "A full five-page site with premium assets, SEO, and unlimited revisions.",
      price: "299", period: "per month",
      features: [
        ["Five-page website", true], ["Unlimited revisions", true],
        ["Content writing", true], ["SEO-optimized keywords", true],
        ["Keyword-aligned content", true], ["Search visibility foundation", true],
        ["Premium stock images", true], ["Premium stock videos", true],
      ],
    },
  ],
};

// Addons available at checkout
export const addonsList = [
  { key: "videos", label: "Extra Videos", hint: "Select number between 1 - 100", price: 25, min: 1, max: 100 },
  { key: "graphics", label: "Extra Graphics", hint: "Select number between 1 - 100", price: 25, min: 1, max: 100 },
  { key: "scheduling", label: "Scheduling (All social media platforms)", hint: "Select number between 1 - 100", price: 25, min: 1, max: 100 },
];

// Find a plan by tab + name (used by checkout)
export const findPlan = (tab, name) => {
  const list = pricing[tab] || pricing.Marketing;
  return list.find((p) => p.name === name) || list.find((p) => p.featured) || list[0];
};
