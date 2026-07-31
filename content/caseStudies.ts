export interface CaseStudy {
  client: string;
  status: "Verified" | "Ongoing";
  headline: string;
  copy: string;
  cta: string;
  /** Set once a real case-study photo is supplied by the client. */
  image: string | null;
}

export const caseStudies: CaseStudy[] = [
  {
    client: "IIT Jammu",
    status: "Verified",
    headline: "20%+ Verified Energy Savings",
    copy: "Campus-wide AHUs ran without demand-based control. 7 SAAR controllers were installed across classrooms with full AHU automation — real-time monitoring is live today.",
    cta: "Read the full story →",
    image: null,
  },
  {
    client: "Leading Paint Manufacturer",
    status: "Ongoing",
    headline: "Continuous Optimisation, Live",
    copy: "Multiple chillers ran at fixed load across factory operations. SAAR controllers now give full remote control and a cloud dashboard across the North India facility.",
    cta: "Read the full story →",
    image: null,
  },
  {
    client: "Leading Cold Storage Operator",
    status: "Ongoing",
    headline: "Fully Remote HVAC Operations",
    copy: "A large multi-zone cold storage facility had no remote visibility. Remote monitoring and control of every temperature sensor now brings real-time alerts and automated response.",
    cta: "Read the full story →",
    image: null,
  },
];
