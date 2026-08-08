export interface CaseStudy {
  client: string;
  slug: string;
  category: string;
  status: "Live" | "Validated POC";
  statValue: string;
  statUnit: string;
  statCaption: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  /** Client logo — only used when the client has agreed to be named. */
  logo: string | null;
  /** Set once a real case-study photo is supplied by the client. */
  image: string | null;
}

export const caseStudies: CaseStudy[] = [
  {
    client: "IIT Jammu",
    slug: "iit-jammu",
    category: "Campus / Institutional",
    status: "Live",
    statValue: "25",
    statUnit: "%",
    statCaption: "Campus HVAC energy savings",
    challenge:
      "Bring a multi-building campus — chiller plant, air handling units and lab spaces — under one intelligent, measurable control layer.",
    solution:
      "Full controlling and monitoring deployment — 7 AHUs and 2 chillers under active AI control; 35 energy meters, 4 BTU meters, 4 noise sensors, 4 vibration sensors and 5 temperature/humidity sensors under continuous monitoring. Both VFD and gateway controllers installed, plus a 3D digital twin of the classrooms and central instrumentation lab.",
    outcome:
      "25% energy savings, with live reports, analytics, trends, alerts and warnings on a single dashboard.",
    tags: ["Chiller + AHU", "Digital twin", "50+ monitored points"],
    logo: "/assets/iit-jammu-logo.png",
    image: null,
  },
  {
    client: "Leading Co-working Operator, Delhi NCR",
    slug: "coworking-operator-delhi-ncr",
    category: "Commercial Real Estate",
    status: "Validated POC",
    statValue: "57.8",
    statUnit: "%",
    statCaption: "AHU energy reduction",
    challenge: "Prove measurable HVAC savings before any capital commitment.",
    solution:
      "Parallel AHU proof-of-concept run alongside the existing BMS for 8 weeks, dual-metered throughout — zero operational risk and zero cost to the client during the trial.",
    outcome: "57.8% reduction in AHU energy consumption, independently validated by dual-metering.",
    tags: ["AHU optimisation", "Dual-metered", "8-week POC"],
    logo: null,
    image: null,
  },
  {
    client: "Berger Paints",
    slug: "berger-paints",
    category: "Manufacturing",
    status: "Live",
    statValue: "15–20",
    statUnit: "%",
    statCaption: "Energy savings on plant utilities",
    challenge: "Extend energy control beyond comfort cooling into the production process itself.",
    solution:
      "Complete automation, controlling and monitoring of 2 plant chillers with 2 energy meters, plus scheduling and remote on/off control of 6 paint ovens. Both VFD controllers and gateway controllers installed.",
    outcome: "15–20% energy savings, with scheduling, reports, analytics, alerts and warnings on the dashboard.",
    tags: ["Process integration", "Chiller optimisation", "Remote scheduling"],
    logo: "/assets/clients/berger-paints.png",
    image: null,
  },
  {
    client: "5-Star International Hotel, Delhi NCR",
    slug: "5-star-hotel-delhi-ncr",
    category: "Hospitality",
    status: "Validated POC",
    statValue: "~40",
    statUnit: "%",
    statCaption: "AHU energy savings, POC-validated on site",
    challenge: "Cut HVAC running cost with no impact on guest comfort.",
    solution:
      "On-site AHU proof-of-concept with VFD-inclusive scope, full BMS functionality mapping and a dedicated energy-savings review pack for ownership.",
    outcome: "~40% AHU energy savings demonstrated on site during the POC period.",
    tags: ["VFD control", "AHU optimisation", "Guest comfort held"],
    logo: null,
    image: null,
  },
  {
    client: "JK Agro Cold Storage, Chenani",
    slug: "jk-agro-cold-storage",
    category: "Cold Chain",
    status: "Live",
    statValue: "9",
    statUnit: "rooms",
    statCaption: "Full facility automation",
    challenge:
      "Reliable, auditable temperature control across nine cold storage rooms — automation was the requirement, not energy savings.",
    solution:
      "Complete controlling and monitoring deployment — 9 cold rooms, 18 temperature sensors, gateway controllers and a dedicated HMI screen for manual control and monitoring on site.",
    outcome:
      "Facility managers monitor and set room temperatures remotely or locally, backed by reports, graphs, analytics, alerts and warnings.",
    tags: ["Refrigeration automation", "Multi-room control", "On-site HMI"],
    logo: "/assets/clients/jk-agro.jpg",
    image: null,
  },
  {
    client: "Major Urban Metro Rail Operator, North India",
    slug: "metro-rail-operator-north-india",
    category: "Urban Rail / Metro",
    status: "Validated POC",
    statValue: "40.2",
    statUnit: "%",
    statCaption: "Less energy per running hour, station AHU",
    challenge:
      "Cut station AHU energy without touching passenger comfort or tunnel-ventilation safety logic.",
    solution:
      "Air-side control of one platform AHU on two 30kW VFDs — 1 energy-saving controller, 2 gateway controllers, 4 energy meters and 2 temperature/humidity sensors. Safety interlock left intact; chilled-water side untouched.",
    outcome:
      "40.2% lower energy intensity (22.58 → 13.52 kWh per running hour) against a client-operated manual baseline — about 129 kWh avoided per day, with the platform 0.86°C cooler.",
    tags: ["Air-side optimisation", "Client-operated baseline", "Safety interlock intact"],
    logo: null,
    image: null,
  },
];
