import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Commercial Building HVAC Optimisation",
  description:
    "Multi-tenant office towers get equipment-level visibility across every AHU and chiller plant, on one dashboard.",
  alternates: { canonical: "/industries/commercial-real-estate" },
  openGraph: {
    title: "Commercial Building HVAC Optimisation | AE Systems",
    description:
      "Multi-tenant office towers get equipment-level visibility across every AHU and chiller plant, on one dashboard.",
    url: "/industries/commercial-real-estate",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Commercial real estate HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Building HVAC Optimisation",
    description: "Multi-tenant office towers get equipment-level visibility across every AHU and chiller plant.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "We have multiple tenants on different fit-out schedules — does that complicate things?",
    answer:
      "It's the norm for multi-tenant towers, not an exception. SAAR optimises at the central plant and AHU level, which sits above individual tenant fit-outs, so tenant churn and floor-level changes don't require re-engineering the optimisation logic each time.",
  },
  {
    question: "Who typically owns this — the landlord or the property manager?",
    answer:
      "Usually the landlord or the appointed facilities/property management team, since the central chiller plant and shared AHUs are common-area infrastructure billed through CAM charges. The dashboard supports whichever team is accountable for that spend.",
  },
  {
    question: "Can it help us report on building-level sustainability or ESG metrics?",
    answer:
      "Yes — equipment-level energy data and trend reporting are exactly what most ESG and sustainability reporting requires, and it's generated as a byproduct of the same monitoring the optimisation relies on.",
  },
  {
    question: "How does this affect tenants day to day?",
    answer:
      "Tenants shouldn't notice anything change — optimisation operates at the central plant and shared-AHU level, within the comfort bands already set for occupied floors, so individual tenant spaces continue running exactly as before.",
  },
];

export default function CommercialRealEstatePage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Commercial Real Estate", path: "/industries/commercial-real-estate" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Commercial Real Estate", path: "/industries/commercial-real-estate" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Commercial Real Estate
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Office Tower HVAC, <span className="gradient-text">One Dashboard for Every Floor</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Multi-tenant buildings run on chiller plants and AHUs procured and commissioned at
            different times, tuned once and rarely revisited. SAAR gives the landlord or facilities
            team equipment-level visibility across all of it, on one dashboard.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Multi-Tenant Buildings Lose Track of HVAC Efficiency</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A commercial tower is rarely built and run as one coherent HVAC system. Floors get
              fitted out at different times by different tenants, each fit-out potentially changing
              occupancy density and load without the central plant's control strategy ever being
              retuned to match. The landlord bears the common-area electricity cost through CAM
              charges but often has less equipment-level visibility into the plant than any single
              tenant has into their own floor. Chiller plants and AHUs installed years apart, by
              different contractors, on different schedules, tend to be managed as separate
              problems rather than one system — which means nobody has a single, current view of
              where the building's HVAC spend is actually going, floor by floor and system by
              system.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises a Multi-Tenant Plant</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS connects to the central chiller plant and the AHUs serving each floor or
              zone, and continuously adjusts them against real-time demand rather than the
              schedule each was individually commissioned with. Because the optimisation sits at
              the shared-infrastructure level — the central plant, primary and secondary pumping —
              it works above individual tenant fit-outs rather than requiring coordination with
              every tenant, which is what makes it practical in a building where floors change
              hands and layouts regularly. The result is a plant that responds to the building's
              actual, current occupancy pattern rather than the pattern it happened to have when it
              was first tuned.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The central chiller plant, primary and secondary chilled water pumps, cooling towers,
              and the AHUs serving each floor or tenant zone — plus VFDs on the major pump and fan
              motors. Because towers commonly run mixed-brand equipment installed across different
              phases of the building's life, SAAR's brand-agnostic integration at the VFD and
              sensor level matters more here than almost anywhere else — it's a non-invasive
              retrofit that doesn't require standardising on one manufacturer first.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Facilities Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A single dashboard covering the whole building — real-time chiller and AHU status by
              floor, energy consumption broken down the same way, and automated alerts when
              something drifts, whether that's a fault or simply a floor whose load profile has
              changed since the last fit-out. A 3D digital twin gives facilities teams a live
              visual model of the tower for planning and reporting, and the same underlying data
              feeds directly into CAM cost allocation and ESG/sustainability reporting most
              landlords and asset managers already need to produce. Quarterly performance reviews
              keep the optimisation current as the building's tenant mix evolves.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Works Across an Entire Portfolio</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Asset managers and REITs overseeing multiple towers face the reporting version of the
              same problem landlords face inside a single building: each property tends to track
              HVAC performance its own way, making cross-portfolio comparison difficult even when
              individual buildings are managed well. Because SAAR connects the same way at every
              property — central plant and AHUs, at the VFD and sensor level — a portfolio-level
              team gets one consistent view of equipment-level energy performance across every
              asset, which is exactly the kind of standardised data most CAM benchmarking and ESG
              reporting processes need but rarely have.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most buildings go from site assessment to a live dashboard in 3–4 weeks. Installation
              works at the VFD and sensor level rather than requiring panel redesign, so building
              operations and tenant occupancy continue without interruption throughout — a
              meaningful constraint in a fully leased tower where downtime isn't an option.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Commercial Real Estate FAQs</h2>
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
            { name: "Hotels & Hospitality", path: "/industries/hotels-hospitality" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
