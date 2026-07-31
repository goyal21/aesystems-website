export interface Capability {
  title: string;
  description: string;
  core?: boolean;
}

export const capabilities: Capability[] = [
  {
    title: "AI-Based HVAC Optimisation",
    description:
      "SAAR connects to existing chillers, AHUs, pumps and VFDs. Delivers 20–30% energy savings without replacing any equipment.",
    core: true,
  },
  {
    title: "Real-Time Energy Dashboard",
    description:
      "One screen for live control, energy analytics, automated alerts, and a 3D digital twin of your facility — from anywhere.",
  },
  {
    title: "VFD Integration & Control",
    description:
      "Direct VFD-level control for chillers, AHUs, pumps. No panel interference, no OEM warranty issues. Motor-level intelligence.",
  },
  {
    title: "3D Digital Twin",
    description:
      "Live virtual model of your building mirroring real-time HVAC performance. Predict failures, simulate changes, plan maintenance remotely.",
  },
  {
    title: "Equipment-Level Analytics",
    description:
      "Know exactly which chiller, AHU, or pump is wasting power — down to the equipment level. Data-driven decisions, not guesswork.",
  },
  {
    title: "Safe Sequencing & Automation",
    description:
      "Automated startup interlocks for chiller-pump-tower sequences. Eliminates operator error — the #1 cause of HVAC system trips.",
  },
];
