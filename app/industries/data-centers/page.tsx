import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Data Centre Cooling Optimisation & PUE",
  description:
    "Precision cooling optimised for PUE. Equipment-level visibility and AI control across CRAC, chillers and pumps.",
  alternates: { canonical: "/industries/data-centers" },
  openGraph: {
    title: "Data Centre Cooling Optimisation & PUE | AE Systems",
    description:
      "Precision cooling optimised for PUE. Equipment-level visibility and AI control across CRAC, chillers and pumps.",
    url: "/industries/data-centers",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Data centre cooling optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Centre Cooling Optimisation & PUE",
    description: "Precision cooling optimised for PUE across CRAC, chillers and pumps.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Does this replace our CRAC/CRAH units or precision cooling?",
    answer:
      "No. SAAR is a non-invasive retrofit that connects to your existing CRAC/CRAH units, chillers and pumps at the VFD and sensor level — no equipment replacement, no OEM warranty impact.",
  },
  {
    question: "How does this affect our uptime SLAs?",
    answer:
      "Every adjustment operates within an engineer-approved safe band, and critical cooling capacity is never reduced below what your uptime requirements demand — optimisation targets excess margin, not the safety margin itself.",
  },
  {
    question: "Can it work alongside our existing DCIM or BMS tooling?",
    answer:
      "Yes. SAAR sits alongside existing monitoring and management tooling rather than replacing it, adding an active optimisation layer on top of the visibility you already have.",
  },
  {
    question: "How is PUE improvement actually measured and verified?",
    answer:
      "Through the same energy and thermal metering the optimisation itself relies on — PUE is tracked continuously rather than sampled periodically, and quarterly performance reviews give you a defensible, auditable trend rather than a single before/after snapshot.",
  },
];

export default function DataCentersPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Data Centers", path: "/industries/data-centers" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Data Centers", path: "/industries/data-centers" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Data Centers
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Data Centre Cooling, <span className="gradient-text">Optimised for PUE</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Cooling is the largest non-IT load in most data centres. SAAR brings equipment-level
            visibility and continuous optimisation to CRAC units, chillers and pumps — without
            touching the uptime margins your SLAs depend on.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Where Data Centre Cooling Wastes Energy</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Cooling efficiency in a data centre is measured directly — PUE makes the overhead
              visible in a way most other building types never bother to track — and yet a large
              share of that overhead is routine rather than unavoidable. CRAC and CRAH units are
              commonly run at a uniform setpoint across the room, sized and tuned for the hottest
              rack rather than the actual, uneven heat load across the floor, because granular
              rack-level airflow and hotspot visibility is expensive to build without dedicated
              sensing. Redundant units frequently run in active-active mode instead of
              active-standby with automated failover, trading efficiency for a simpler operational
              model. At data-centre power densities, even a fractional PUE improvement compounds
              into a meaningful cost difference over a year — which is exactly why cooling is
              usually the first place a facilities team looks once IT load itself is already
              optimised.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises Data Centre Cooling</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS connects to your existing CRAC/CRAH units, chiller plant and pumps at the
              VFD and sensor level, and continuously adjusts them against real-time thermal load
              rather than a fixed setpoint. Every adjustment operates inside an engineer-approved
              safe band — critical cooling capacity required for uptime SLAs is never reduced,
              optimisation targets the excess margin sitting above it. Because the platform sees
              the whole cooling chain — CRAC units, chillers, pumps, cooling towers — as one
              connected system rather than independently tuned components, it can shift load
              between them in ways that a per-unit setpoint can't.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              CRAC/CRAH units, the central chiller plant, primary and secondary chilled water
              pumps, and cooling towers where applicable — plus VFDs on the major pump and fan
              motors, which is where SAAR exercises direct, motor-level control. Energy and thermal
              meters are added wherever visibility is missing, since PUE reporting is only as
              accurate as the metering behind it. It's a non-invasive retrofit throughout: no
              equipment replacement, and no interference with existing DCIM, BMS or redundancy
              configurations.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Facilities Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A single dashboard with real-time PUE, equipment-level energy consumption across
              every connected CRAC unit, chiller and pump, and automated alerts on drift or fault
              conditions before they become a thermal risk. A 3D digital twin gives facilities and
              operations teams a live visual model of the floor and plant for remote planning, and
              the same data supports the trend reporting most data centre operators already need
              for internal SLA and efficiency reporting. Quarterly performance reviews are
              included, so PUE improvements are tracked and defended over time, not just claimed at
              go-live.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Multi-Facility Operators</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Operators running more than one facility face a version of the same problem at
              portfolio scale: each site typically reports PUE and cooling performance its own way,
              on its own tooling, making it hard to know whether one facility is genuinely more
              efficient than another or simply measuring differently. Because SAAR connects the
              same way at every site — CRAC units, chillers, pumps, at the VFD and sensor level — a
              portfolio or regional operations team gets one consistent PUE and energy view across
              every facility, without each site needing to be normalised by hand before the numbers
              are comparable.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most sites go from site assessment to a live dashboard in 3–4 weeks. Given the
              stakes, the assessment phase includes explicit sign-off on safe operating bands with
              your facilities and uptime-owning teams before any integration begins. Installation
              itself works at the VFD and sensor level rather than requiring panel redesign or
              downtime, and redundancy configurations are preserved exactly as designed throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Data Centre Cooling FAQs</h2>
          <div className="flex flex-col gap-6">
            {faqs.map((item) => (
              <div key={item.question} className="flex flex-col gap-2">
                <h3 className="text-[1.05rem] font-semibold text-white">{item.question}</h3>
                <p className="text-[0.92rem] leading-[1.8] text-muted-dark">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <RelatedLinks
          tone="light"
          links={[
            { name: "All Industries", path: "/industries" },
            { name: "The SAAR Platform", path: "/platform" },
            { name: "Energy Monitoring & Analytics", path: "/platform/energy-monitoring-analytics" },
            { name: "Case Studies", path: "/case-studies" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
