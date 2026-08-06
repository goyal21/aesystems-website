export interface Capability {
  title: string;
  bullets: string[];
  tag: string;
  image: string;
  core?: boolean;
}

export const capabilities: Capability[] = [
  {
    title: "AI-Based HVAC Optimisation",
    bullets: [
      "SAAR AI-BMS connects to existing chillers, AHUs, pumps, and VFDs.",
      "Delivers 20–30% energy savings without replacing any equipment.",
    ],
    tag: "SAAR Powered",
    image: "/assets/platform/ai-optimisation.webp",
  },
  {
    title: "Smart BMS & Monitoring",
    bullets: [
      "Centralised dashboard for real-time control.",
      "Energy analytics. Automated alerts.",
      "3D digital twin visualisation of your facility.",
    ],
    tag: "Cloud Native",
    image: "/assets/platform/smart-bms.webp",
  },
  {
    title: "VFD Integration & Control",
    bullets: [
      "Direct VFD-level control for chillers, AHUs, and pumps.",
      "No panel interference. No OEM warranty issues.",
      "Motor-level intelligence.",
    ],
    tag: "Non-Invasive",
    image: "/assets/platform/vfd-control.webp",
  },
  {
    title: "3D Digital Twin",
    bullets: [
      "Live virtual model of your building mirroring real-time HVAC performance.",
      "Predict failures. Simulate changes.",
      "Plan maintenance remotely.",
    ],
    tag: "AI Powered",
    image: "/assets/platform/digital-twin.webp",
  },
  {
    title: "Energy Monitoring & Analytics",
    bullets: [
      "Equipment-level energy visibility.",
      "Know exactly which chiller, AHU, or pump is wasting power.",
      "Data-driven decisions, not guesswork.",
    ],
    tag: "Real-Time",
    image: "/assets/platform/energy-monitoring.webp",
  },
  {
    title: "Safe Sequencing & Automation",
    bullets: [
      "Automated startup interlocks for chiller–pump–tower sequences.",
      "Eliminates operator error — the #1 cause of HVAC system trips.",
    ],
    tag: "24×7 Protection",
    image: "/assets/platform/safe-sequencing.webp",
  },
];
