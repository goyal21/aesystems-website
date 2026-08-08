import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Hospital HVAC Energy Management India",
  description:
    "Critical cooling zones stay protected while non-critical HVAC optimises around occupancy and load. Non-invasive retrofit, no downtime.",
  alternates: { canonical: "/industries/hospitals-healthcare" },
  openGraph: {
    title: "Hospital HVAC Energy Management India | AE Systems",
    description:
      "Critical cooling zones stay protected while non-critical HVAC optimises around occupancy and load. Non-invasive retrofit, no downtime.",
    url: "/industries/hospitals-healthcare",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Hospital HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital HVAC Energy Management India",
    description: "Critical cooling zones stay protected while non-critical HVAC optimises around occupancy and load.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Will this touch our OTs, ICUs, or isolation wards?",
    answer:
      "Critical zones are excluded from optimisation by default, not just protected by policy. SAAR's control logic treats life-safety areas as fixed, non-negotiable settings — optimisation only ever acts on the non-critical load around them.",
  },
  {
    question: "How does this fit with our existing compliance and validation processes?",
    answer:
      "SAAR sits alongside your existing BMS and compliance workflows rather than replacing them — critical-zone monitoring, logging and validation continue exactly as they do today. Optimisation is scoped to non-critical HVAC only.",
  },
  {
    question: "Can it work across a multi-building hospital campus?",
    answer:
      "Yes — this is a common hospital configuration. SAAR unifies chillers, AHUs and pumps across multiple buildings or blocks into a single dashboard, the same way it does for university and corporate campuses.",
  },
  {
    question: "Does installation require any downtime in patient care areas?",
    answer:
      "No. Installation works at the VFD and sensor level rather than requiring panel redesign, and critical zones are excluded from the integration scope entirely, so patient care areas continue operating without interruption throughout.",
  },
];

export default function HospitalsHealthcarePage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Hospitals & Healthcare", path: "/industries/hospitals-healthcare" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Hospitals & Healthcare", path: "/industries/hospitals-healthcare" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Hospitals & Healthcare
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Hospital HVAC Optimisation <span className="gradient-text">That Never Touches Critical Zones</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Operating theatres, ICUs and isolation wards need uninterrupted, precise control — full
            stop. SAAR optimises everywhere else, so the plant serving them runs efficiently
            without ever putting critical zones at risk.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Hospital HVAC Is Different</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A hospital is a mix of very different criticality levels under one roof: operating
              theatres, ICUs and isolation wards where temperature, humidity and air pressure
              differentials are patient-safety requirements, not comfort preferences, sitting
              alongside corridors, waiting areas and administrative offices where the stakes are
              ordinary. Segmenting control by criticality is the obviously correct approach, but
              it's operationally risky to do manually — if a facilities team can't be completely
              confident that an optimisation change will never touch a critical zone, the safer and
              far more common choice is to run everything at hospital-grade conditions uniformly.
              That uniformity is where the avoidable spend accumulates: non-critical areas
              conditioned to the same standard as an OT, corridors and admin blocks running around
              the clock regardless of actual occupancy, and no confident way to loosen any of it
              without expensive manual reconfiguration and re-validation.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises Around Fixed Critical Zones</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS is configured, from day one, to treat life-safety zones — OTs, ICUs,
              isolation wards, and any other space your clinical and facilities teams designate —
              as fixed and untouched. The optimisation logic operates entirely on the non-critical
              load around them: corridors, waiting areas, administrative offices, and general wards
              where comfort bands can safely flex with occupancy and time of day. Because critical
              and non-critical zones typically share upstream plant — the same chillers, the same
              pumps — optimising the non-critical share of that shared load still delivers
              meaningful savings across the whole plant, without a single adjustment ever reaching
              a protected zone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The central chiller plant, chilled water pumps, and the AHUs serving non-critical
              zones — general wards, OPD areas, administration, corridors and public spaces —
              along with VFDs on the relevant motors. Critical-zone AHUs and any dedicated
              precision units serving OTs, ICUs or isolation wards are identified during the site
              assessment and excluded from the optimisation scope entirely; they continue running
              exactly as your clinical protocols require. It's a non-invasive retrofit — no panel
              replacement, no interference with existing validation or compliance instrumentation.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Facilities Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A single dashboard covering every connected zone, with critical areas clearly marked
              as monitored-but-not-optimised so there's never ambiguity about what SAAR is and
              isn't touching. Real-time energy consumption by zone, automated alerts on equipment
              drift or faults, and a 3D digital twin for facilities planning across what is often a
              sprawling, multi-block campus. Quarterly performance reviews are included, and all
              data — including the baseline that critical zones already run — stays visible and
              auditable for your own compliance record-keeping.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Multi-Facility Hospital Groups</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Hospital networks running multiple facilities face the same coordination problem
              multiplied across sites: each hospital in the group tends to have its own facilities
              team, its own equipment vintage, and its own informal way of tracking energy
              performance, which makes group-level comparison difficult even when every individual
              site is well run. Because SAAR's dashboard and critical-zone-exclusion model works the
              same way at every facility, a group-level engineering or sustainability team gets a
              single, consistent view across the whole network — which non-critical zones are
              optimising well, which facilities are lagging, and where the next efficiency
              investment should actually go — without asking every hospital to report performance a
              different way.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most sites go from site assessment to a live dashboard in 3–4 weeks. The assessment
              phase is where critical-zone boundaries get formally documented and signed off with
              your clinical and facilities leadership before any integration begins — that
              agreement is the foundation the rest of the deployment builds on. Installation itself
              works at the VFD and sensor level rather than requiring panel redesign, so hospital
              operations continue without interruption throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Hospital HVAC FAQs</h2>
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
            { name: "Case Studies", path: "/case-studies" },
            { name: "Universities & Campuses", path: "/industries/universities-campuses" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
