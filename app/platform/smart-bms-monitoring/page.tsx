import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Smart BMS & Real-Time HVAC Monitoring",
  description:
    "Centralised cloud dashboard for real-time HVAC control, energy analytics, automated alerts and 3D visualisation.",
  alternates: { canonical: "/platform/smart-bms-monitoring" },
  openGraph: {
    title: "Smart BMS & Real-Time HVAC Monitoring | AE Systems",
    description:
      "Centralised cloud dashboard for real-time HVAC control, energy analytics, automated alerts and 3D visualisation.",
    url: "/platform/smart-bms-monitoring",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Smart BMS monitoring" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart BMS & Real-Time HVAC Monitoring",
    description: "Centralised cloud dashboard for real-time HVAC control, energy analytics and automated alerts.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Do we need to replace our existing BMS to get this?",
    answer:
      "No. SAAR's monitoring layer connects to your existing chillers, AHUs and pumps at the sensor level and works alongside whatever BMS or building automation you already have — it's an addition, not a replacement.",
  },
  {
    question: "Is the dashboard accessible remotely, or only on-site?",
    answer:
      "It's cloud-based, so your engineering and facilities teams can access real-time status, alerts and reporting from anywhere — useful for multi-site operators and corporate teams who don't sit on-site day to day.",
  },
  {
    question: "What kind of alerts does the system generate?",
    answer:
      "Automated alerts on equipment drift and faults — a stuck valve, a sensor reading out of range, a chiller underperforming against its expected load — surfaced as they happen rather than discovered at the next scheduled inspection.",
  },
  {
    question: "How far back does the historical data and reporting go?",
    answer:
      "Trend data accumulates from go-live onward and is retained for ongoing reporting, including the quarterly performance reviews included as standard — so comparisons over time get more useful the longer the system has been live.",
  },
];

export default function SmartBmsMonitoringPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Cloud Native
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Smart BMS & <span className="gradient-text">Real-Time HVAC Monitoring</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            One centralised cloud dashboard for real-time control, energy analytics, automated
            alerts and 3D visualisation — the visibility layer that makes every other part of the
            platform actionable.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Visibility Comes Before Optimisation</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              You can't optimise what you can't see, and most buildings have less HVAC visibility
              than their energy spend deserves — a chiller plant that's clearly consuming a lot,
              without a clear picture of exactly which unit, at which hour, is responsible. Faults
              go unnoticed between scheduled inspections. A facilities team ends up reacting to
              complaints or unusually high bills rather than catching drift while it's still small.
              Real-time, equipment-level monitoring is the foundation everything else on the
              platform builds on — optimisation, digital twin visualisation and safe sequencing all
              depend on the same underlying data this monitoring layer provides.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What the Dashboard Actually Shows</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Real-time status for every connected chiller, AHU and pump, energy consumption broken
              down by equipment and by zone, and automated alerts the moment something drifts out
              of range — a stuck valve, a sensor fault, a unit underperforming against its expected
              load. It's cloud-based, so engineering and facilities teams can check it from
              anywhere, not just from a control room on-site, which matters as much for a single
              building's duty engineer as it does for a corporate team overseeing a multi-site
              portfolio.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Energy Analytics That Go Beyond a Single Bill</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Beyond real-time status, the dashboard rolls the same data into trend reporting —
              consumption over time, by zone, by equipment — so a facility manager or owner can see
              whether efficiency is actually improving month over month, not just glance at a
              current reading. Quarterly performance reviews are included as standard, turning that
              data into a structured conversation about where savings are compounding and where
              there's still room to improve, rather than a dashboard nobody revisits after go-live.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">3D Visualisation, Not Just Numbers</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Alongside the numeric dashboard, a 3D digital twin gives your team a live visual model
              of the building or campus, mirroring real-time HVAC performance rather than a static
              floor plan. It's genuinely useful for planning and troubleshooting remotely — spotting
              which zone or floor an anomaly is coming from is faster with a spatial view than with
              a list of equipment IDs, especially on larger or multi-building sites.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Who Actually Uses This Day to Day</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Access is role-based rather than one generic view for everyone. A duty engineer sees
              the operational detail they need to act on immediately — which unit, what fault, what
              action. A facilities manager sees consumption trends and alert history across the
              whole site. An owner or corporate sustainability team sees the property- or
              portfolio-level summary that actually informs budget and ESG reporting decisions.
              Everyone is looking at the same underlying data, just at the altitude relevant to
              their role.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Works Alongside What You Already Have</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              This monitoring layer connects to your existing chillers, AHUs and pumps at the
              sensor level and sits alongside whatever BMS, DCIM or building automation tooling you
              already run — it's additive, not a rip-and-replace. It's also the same data layer
              that powers AI-based optimisation, VFD-level control and safe sequencing elsewhere on
              the platform, so nothing you see here exists in isolation from what the rest of SAAR
              is actually doing to your plant.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Smart BMS FAQs</h2>
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
            { name: "3D Digital Twin", path: "/platform/3d-digital-twin" },
            { name: "Energy Monitoring & Analytics", path: "/platform/energy-monitoring-analytics" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
