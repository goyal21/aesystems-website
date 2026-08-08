export interface Industry {
  name: string;
  slug: string;
  image: string;
  benefit: string;
}

export const industries: Industry[] = [
  {
    name: "Hotels & Hospitality",
    slug: "hotels-hospitality",
    image: "/assets/industries/hotel-and-hospitality.webp",
    benefit:
      "Guest comfort protected while unoccupied rooms and off-peak hours stop bleeding energy.",
  },
  {
    name: "Hospitals & Healthcare",
    slug: "hospitals-healthcare",
    image: "/assets/industries/hospital-and-healthcare.webp",
    benefit:
      "Critical cooling zones stay protected while non-critical HVAC optimises around occupancy and load.",
  },
  {
    name: "Commercial Real Estate",
    slug: "commercial-real-estate",
    image: "/assets/industries/commercial-complex.webp",
    benefit:
      "Multi-tenant office towers get equipment-level visibility across every AHU and chiller plant.",
  },
  {
    name: "Universities & Campuses",
    slug: "universities-campuses",
    image: "/assets/industries/universities-and-campuses.webp",
    benefit:
      "Multi-building campuses managed from a single dashboard, with savings proven at IIT Jammu.",
  },
  {
    name: "Data Centers",
    slug: "data-centers",
    image: "/assets/industries/datacenter.webp",
    benefit:
      "Precision cooling optimised for PUE — every fraction of a percent matters at this scale.",
  },
  {
    name: "Airports",
    slug: "airports",
    image: "/assets/industries/airport.webp",
    benefit:
      "Terminal-scale HVAC coordinated across zones with continuous, mission-critical uptime.",
  },
];
