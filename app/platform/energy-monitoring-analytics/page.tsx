import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Energy Monitoring & Analytics for HVAC",
  description:
    "Equipment-level energy visibility. Know exactly which chiller, AHU or pump is wasting power. Data-driven decisions, not guesswork.",
  alternates: { canonical: "/platform/energy-monitoring-analytics" },
  openGraph: {
    title: "Energy Monitoring & Analytics for HVAC | AE Systems",
    description:
      "Equipment-level energy visibility. Know exactly which chiller, AHU or pump is wasting power. Data-driven decisions, not guesswork.",
    url: "/platform/energy-monitoring-analytics",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Energy monitoring and analytics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy Monitoring & Analytics for HVAC",
    description: "Equipment-level energy visibility across chillers, AHUs and pumps.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "How granular is the energy data — building-level or equipment-level?",
    answer:
      "Equipment-level. The platform is built to show exactly which chiller, AHU or pump is consuming what, not just a single building-wide number, since that's what's actually actionable for a facilities team.",
  },
  {
    question: "Can we export this data for our own reporting or ESG requirements?",
    answer:
      "Yes — the same equipment-level energy data and trend reporting used internally is exactly what most ESG, sustainability and CAM reporting processes need, generated as a byproduct of the monitoring already in place.",
  },
  {
    question: "Do we need additional energy meters installed?",
    answer:
      "Sometimes. Meters are added during site assessment wherever existing visibility is missing — accurate measurement is what makes any reported saving verifiable rather than assumed.",
  },
  {
    question: "How often is the data refreshed?",
    answer:
      "Consumption and status data update in real time, not on a periodic batch — the same live feed drives the dashboard, the automated alerts, and the AI-based optimisation decisions elsewhere on the platform.",
  },
];

export default function EnergyMonitoringAnalyticsPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Energy Monitoring & Analytics", path: "/platform/energy-monitoring-analytics" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Energy Monitoring & Analytics", path: "/platform/energy-monitoring-analytics" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Real-Time
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Energy Monitoring & Analytics, <span className="gradient-text">Down to the Equipment</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Know exactly which chiller, AHU or pump is wasting power — not just that the building's
            bill went up. Data-driven decisions, not guesswork.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Building-Level Numbers Aren&apos;t Enough</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A monthly electricity bill tells you the building consumed more this month than last
              — it doesn't tell you why, or which piece of equipment is responsible. Without
              equipment-level visibility, diagnosing an efficiency problem means manual
              investigation: physically checking chillers and AHUs one by one, hoping to spot
              something obviously wrong. Most of the time nothing is obviously wrong — the issue is
              a chiller running a few percent below its expected efficiency, or a pump cycling more
              than it should — which is invisible without granular measurement and genuinely
              expensive to find manually.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Equipment-Level Visibility Actually Shows</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR's monitoring breaks energy consumption down by individual chiller, AHU and pump,
              not just by building or floor — so instead of a single trend line, your facilities
              team sees exactly which unit is consuming what, and how that compares to its expected
              performance. That's the difference between knowing something changed and knowing
              what changed, which is the difference between a facilities team that can act
              immediately and one that has to investigate first.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Where the Data Comes From</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Energy meters connected at the equipment level, supplemented during site assessment
              wherever existing visibility is missing — since accurate measurement is what makes
              any reported saving verifiable rather than assumed. This is the same metering
              approach used in the live IIT Jammu deployment, where 35 energy meters under
              continuous monitoring are what make the campus's 25% HVAC energy savings a verified
              result rather than an estimate.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">From Data to Decisions</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Equipment-level data feeds directly into two things: the AI-based optimisation that
              acts on it in real time, and the trend reporting your team uses for slower,
              higher-level decisions — capital planning, maintenance prioritisation, CAM cost
              allocation across tenants, or ESG and sustainability reporting. Quarterly performance
              reviews turn the raw data into a structured read on where savings are compounding and
              where the next opportunity is, rather than leaving a dashboard for someone to
              interpret alone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Getting the Metering in Place</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Metering coverage is assessed during the same site visit that scopes the rest of the
              deployment — most sites go from that initial assessment to a live dashboard in 3–4
              weeks. Where existing meters already cover a chiller, AHU or pump, they're integrated
              directly; where visibility is missing, meters are added as part of the same
              installation, at the VFD and sensor level rather than requiring separate wiring or
              panel work.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Part of One Connected Platform</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              This monitoring layer isn't a standalone reporting tool — it's the same data
              informing AI-based optimisation decisions, feeding the 3D digital twin's live model,
              and triggering the automated alerts your facilities team sees on the dashboard.
              Everything on the platform that acts on your plant's behaviour is grounded in this
              same equipment-level measurement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Energy Monitoring FAQs</h2>
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
            { name: "The Full Platform", path: "/platform" },
            { name: "AI-Based HVAC Optimisation", path: "/platform/ai-hvac-optimisation" },
            { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
            { name: "IIT Jammu Case Study", path: "/case-studies/iit-jammu" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
