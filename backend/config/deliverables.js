// Deliverable templates per SERVICE × TIER — digit/countable items only.
// (Qualitative perks like "Creative Execution" are part of the plan but not tracked here.)
const TEMPLATES = {
  marketing: { // Social Media Management
    Basic: [
      { key: "graphics", label: "Custom Graphics", total: 4 },
      { key: "videos", label: "Custom Videos", total: 2 },
      { key: "changes", label: "Changes Allowed", total: 1 },
    ],
    Standard: [
      { key: "graphics", label: "Custom Graphics", total: 8 },
      { key: "videos", label: "Custom Videos", total: 4 },
      { key: "changes", label: "Changes Allowed", total: 2 },
    ],
    Premium: [
      { key: "graphics", label: "Custom Graphics", total: 12 },
      { key: "videos", label: "Custom Videos", total: 6 },
      { key: "carousels", label: "Carousels", total: 4 },
      { key: "changes", label: "Changes Allowed", total: 3 },
    ],
    Trial: [
      { key: "graphics", label: "Custom Graphics", total: 4 },
      { key: "videos", label: "Custom Videos", total: 4 },
      { key: "changes", label: "Changes Allowed", total: 1 },
    ],
  },
  video: { // Short-Form Videos
    Basic: [
      { key: "videos", label: "Short-Form Videos", total: 4 },
      { key: "changes", label: "Changes Allowed", total: 1 },
    ],
    Standard: [
      { key: "videos", label: "Short-Form Videos", total: 8 },
      { key: "changes", label: "Changes Allowed", total: 2 },
    ],
    Premium: [
      { key: "videos", label: "Short-Form Videos", total: 12 },
      { key: "changes", label: "Changes Allowed", total: 3 },
    ],
  },
  website: { // Website
    Basic: [
      { key: "pages", label: "Website Pages", total: 1 },
      { key: "changes", label: "Revisions", total: 1 },
    ],
    Standard: [
      { key: "pages", label: "Website Pages", total: 2 },
      { key: "changes", label: "Revisions", total: 2 },
    ],
    Premium: [
      { key: "pages", label: "Website Pages", total: 5 },
      { key: "changes", label: "Revisions", total: 5 },
    ],
  },
};

export const SERVICES = [
  { key: "marketing", label: "Social Media" },
  { key: "video", label: "Short-Form Video" },
  { key: "website", label: "Website" },
];
export const TIERS = ["Basic", "Standard", "Premium"];

// Stripe plan names → tiers
export const planToTier = (plan) =>
  ({ Starter: "Basic", Growth: "Standard", Pro: "Premium" }[plan] || "Basic");

export const planDeliverables = (service = "marketing", tier = "Basic") => {
  const svc = TEMPLATES[service] || TEMPLATES.marketing;
  const items = svc[tier] || svc.Basic;
  return items.map((i) => ({ ...i, done: 0, check: false }));
};

export const currentPeriod = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
