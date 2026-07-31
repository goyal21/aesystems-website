export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "Do we need to replace our existing chillers, AHUs or pumps?",
    answer:
      "No. SAAR is a non-invasive retrofit — it connects at the VFD and sensor level to your existing equipment across most major brands (Danfoss, Schneider, ABB, Voltas, ECI, Servotech and others). There's no rip-and-replace and no OEM warranty impact.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most sites go from site assessment to a live dashboard in 3–4 weeks. Installation itself typically takes days, not months, since we work at the VFD level rather than redesigning panels.",
  },
  {
    question: "What savings can we realistically expect?",
    answer:
      "Deployments have delivered 20–30% HVAC energy savings, including a verified 20%+ result in a live campus deployment at IIT Jammu. Actual savings depend on your baseline equipment, occupancy pattern and current control strategy — which is exactly what the pilot measures for your building specifically.",
  },
  {
    question: "Who owns the data, and what happens if we don't continue after the pilot?",
    answer:
      "All data collected during the pilot is yours to keep, regardless of your decision. There's no obligation to continue, and no lock-in.",
  },
  {
    question: "Do you offer ongoing support after go-live?",
    answer:
      "Yes. Every deployment includes AMC, remote monitoring, over-the-air updates, and quarterly performance reviews so savings keep compounding after installation.",
  },
  {
    question: "Is SAAR suitable for buildings with mixed HVAC brands?",
    answer:
      "Yes — this is one of SAAR's core strengths. It's built to unify chillers, AHUs and pumps from different manufacturers into a single dashboard and a single optimisation logic, so mixed-brand sites don't need multiple systems.",
  },
];
