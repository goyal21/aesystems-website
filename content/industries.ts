export interface Industry {
  name: string;
  image: string;
  benefit: string;
}

export const industries: Industry[] = [
  {
    name: "Hotels & Hospitality",
    image: "/assets/industries/hotel-and-hospitality.webp",
    benefit:
      "Guest comfort protected while unoccupied rooms and off-peak hours stop bleeding energy.",
  },
  {
    name: "Hospitals & Healthcare",
    image: "/assets/industries/hospital-and-healthcare.webp",
    benefit:
      "Critical cooling zones stay protected while non-critical HVAC optimises around occupancy and load.",
  },
  {
    name: "Commercial Real Estate",
    image: "/assets/industries/commercial-complex.webp",
    benefit:
      "Multi-tenant office towers get equipment-level visibility across every AHU and chiller plant.",
  },
  {
    name: "Universities & Campuses",
    image: "/assets/industries/universities-and-campuses.webp",
    benefit:
      "Multi-building campuses managed from a single dashboard, with savings proven at IIT Jammu.",
  },
  {
    name: "Data Centers",
    image: "/assets/industries/datacenter.webp",
    benefit:
      "Precision cooling optimised for PUE — every fraction of a percent matters at this scale.",
  },
  {
    name: "Airports",
    image: "/assets/industries/airport.webp",
    benefit:
      "Terminal-scale HVAC coordinated across zones with continuous, mission-critical uptime.",
  },
];
