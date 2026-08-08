import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "AI-Based HVAC Optimisation | Retrofit Only",
  description:
    "AI-BMS connects to existing chillers, AHUs, pumps and VFDs to deliver 20–30% energy savings without replacing equipment.",
  alternates: { canonical: "/platform/ai-hvac-optimisation" },
  openGraph: {
    title: "AI-Based HVAC Optimisation | Retrofit Only | AE Systems",
    description:
      "AI-BMS connects to existing chillers, AHUs, pumps and VFDs to deliver 20–30% energy savings without replacing equipment.",
    url: "/platform/ai-hvac-optimisation",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — AI HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Based HVAC Optimisation | Retrofit Only",
    description: "AI-BMS delivers 20–30% energy savings without replacing equipment.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Is this a hardware replacement or a software layer?",
    answer:
      "It's a retrofit, not a replacement. SAAR AI-BMS connects to your existing chillers, AHUs, pumps and VFDs at the sensor and motor-control level — no rip-and-replace, and no impact on existing OEM warranties.",
  },
  {
    question: "How is this different from a standard BMS?",
    answer:
      "A standard BMS monitors equipment and lets you schedule it manually. SAAR actively decides how equipment should run, continuously, adjusting chiller loading and AHU behaviour in real time against actual demand rather than a fixed schedule.",
  },
  {
    question: "What savings are realistic for our building?",
    answer:
      "Deployments have delivered 20–30% HVAC energy savings, including a verified 25% result in the live campus deployment at IIT Jammu. Actual savings depend on your baseline equipment, occupancy pattern and current control strategy, which is exactly what a pilot measures for your specific building.",
  },
  {
    question: "Who owns the data collected during a pilot?",
    answer:
      "You do, regardless of your decision on whether to continue afterward. There's no obligation to proceed and no lock-in — the pilot is designed to give you a real answer for your building, not a sales funnel.",
  },
];

export default function AiHvacOptimisationPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "AI-Based HVAC Optimisation", path: "/platform/ai-hvac-optimisation" },
        ])}
      />
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "AI-Based HVAC Optimisation", path: "/platform/ai-hvac-optimisation" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            SAAR Powered
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            AI-Based HVAC Optimisation, <span className="gradient-text">Retrofit Only</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            SAAR AI-BMS connects to the chillers, AHUs, pumps and VFDs you already have and
            continuously decides how they should run — no equipment replacement, 20–30% energy
            savings.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What &ldquo;AI-Based Optimisation&rdquo; Actually Means</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most HVAC plants run on schedules and setpoints configured once at commissioning and
              rarely revisited — a chiller staged for peak summer load runs the same way in a mild
              month, an AHU scheduled for fixed hours runs full-speed through a half-empty
              afternoon. A traditional BMS gives you the tools to change that manually, but manual
              changes drift: a setpoint adjusted for one hot week never gets reverted, a schedule
              never gets updated after a floor plan changes. AI-based optimisation replaces that
              static configuration with a system that's continuously deciding, on its own, how
              equipment should run right now — not a fixed rule set someone wrote once.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises Your Plant</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS connects to your existing chillers, AHUs, pumps and VFDs and continuously
              recalculates chiller staging and loading, AHU fan speed and damper position, and pump
              speed against real-time demand — all within a safe band your engineering team
              approves, never open-ended. Because the platform sees the whole plant as one
              connected system rather than independently tuned equipment, it can shift how load is
              distributed across chillers and zones in ways a per-device setpoint never could, and
              it keeps doing this continuously rather than needing to be re-tuned every season.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Chillers, AHUs, primary and secondary pumps, and VFDs on the major motors — across
              major brands including Danfoss, Schneider, ABB, Voltas, ECI and Servotech, connected
              at the sensor and VFD level rather than requiring a panel redesign. It's a
              non-invasive retrofit: no rip-and-replace, no OEM warranty impact, and it works across
              mixed-brand plants, which is the norm rather than the exception in buildings built or
              expanded over multiple phases.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Verified Results, Not Projections</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              At IIT Jammu, bringing 7 AHUs and 2 chillers under active AI control delivered 25%
              campus-wide HVAC energy savings, verified against 35 continuously monitored energy
              meters — a live deployment, not a modelled estimate. Across deployments generally,
              20–30% HVAC energy savings is the realistic range, with the exact figure depending on
              your baseline equipment, occupancy pattern and current control strategy, which is
              exactly what a pilot is designed to measure for your specific building.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Getting Started</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most sites go from initial site assessment to a live dashboard in 3–4 weeks: an early
              visit to catalogue equipment, brands and existing metering, VFD- and sensor-level
              integration with the plant, a calibration period to establish your building's actual
              demand pattern and safe operating bands, and then go-live. Installation itself is
              typically measured in days, not months, since nothing about it requires a panel
              redesign — building operations continue throughout.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Part of One Platform</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Optimisation doesn&apos;t run in isolation — it's backed by the same real-time
              monitoring, VFD-level control, digital twin visualisation and automated safe
              sequencing that make up the rest of the SAAR platform. Optimisation decisions are
              informed by the same live data your team sees on the dashboard, and every adjustment
              respects the same safe-sequencing interlocks that protect your equipment from
              startup errors.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">AI-Based HVAC Optimisation FAQs</h2>
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
            { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
            { name: "VFD Integration & Control", path: "/platform/vfd-integration-control" },
            { name: "IIT Jammu Case Study", path: "/case-studies/iit-jammu" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
