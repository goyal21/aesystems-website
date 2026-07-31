import type { Stat } from "@/content/stats";

export const partnerStats: Stat[] = [
  { value: "20–30%", label: "Energy Savings to Sell" },
  { value: "12", label: "Patents — Defensible Tech" },
  { value: "PAN", label: "India Opportunity" },
  { value: "IIT", label: "Research Backed" },
];

export interface PartnerBenefit {
  title: string;
  description: string;
}

export const partnerBenefits: PartnerBenefit[] = [
  {
    title: "Attractive Revenue Model",
    description:
      "Earn competitive margins on every deployment. Recurring AMC revenue year after year. The more buildings you bring on, the more you earn — passively.",
  },
  {
    title: "IIT Jammu Validated Tech",
    description:
      "12 patents. Live campus deployment with 20%+ savings proven. You walk into every sales meeting with independent institutional validation behind you.",
  },
  {
    title: "Make in India Advantage",
    description:
      "100% indigenous hardware and software. A natural edge with PSUs, government bodies, and enterprises under the Atmanirbhar Bharat programme.",
  },
  {
    title: "Full Sales & Tech Support",
    description:
      "You are never on your own. AE Systems provides pre-sales support, technical training, proposal templates, and co-selling assistance on every deal you bring in.",
  },
  {
    title: "Exclusive Territory Rights",
    description:
      "Qualified partners receive protected geographies. Build your regional pipeline without worrying about channel conflict. First-mover advantage in your city.",
  },
  {
    title: "One Product, Every Vertical",
    description:
      "Hotels, hospitals, factories, offices, malls, data centers — SAAR sells into every sector that runs HVAC around the clock. One product, a huge addressable market.",
  },
];

export interface PartnerStep {
  num: string;
  title: string;
  description: string;
}

export const partnerJourney: PartnerStep[] = [
  {
    num: "01",
    title: "Apply",
    description:
      "Fill the partner application below. Tell us about your business, geography, and the sectors you serve. We review within 48 hours.",
  },
  {
    num: "02",
    title: "Onboard",
    description:
      "Get certified on SAAR AI-BMS. Access the partner portal, sales collateral, pricing guides, and a dedicated AE Systems account manager.",
  },
  {
    num: "03",
    title: "Start Earning",
    description:
      "Bring in your first lead. We co-sell, you earn. Build recurring AMC revenue with every building deployed. Grow your book of business with us.",
  },
];

export const applyPerks = [
  "Application reviewed within 48 hours",
  "Dedicated account manager assigned on approval",
  "Access to partner pricing and sales collateral",
  "Free technical certification on SAAR AI-BMS",
  "Co-selling support on your very first deal",
  "Protected territory rights for qualified partners",
];

export const partnerTypes = [
  "Reseller / Channel Partner",
  "System Integrator",
  "HVAC Contractor",
  "ELV Contractor",
  "IT Solutions Provider",
  "Consultant / Advisor",
  "Other",
];

export const partnerSectors = [
  "Hotels / Hospitality",
  "Hospitals / Healthcare",
  "Industrial / Manufacturing",
  "Corporate Offices",
  "Government / PSU",
  "Educational Institutions",
  "Data Centers",
  "Mixed / Multiple Sectors",
];
