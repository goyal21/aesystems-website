import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "3D Digital Twin for Buildings India",
  description:
    "A live virtual model of your building mirroring real-time HVAC performance. Predict failures, simulate changes, plan maintenance remotely.",
  alternates: { canonical: "/platform/3d-digital-twin" },
  openGraph: {
    title: "3D Digital Twin for Buildings India | AE Systems",
    description:
      "A live virtual model of your building mirroring real-time HVAC performance. Predict failures, simulate changes, plan maintenance remotely.",
    url: "/platform/3d-digital-twin",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — 3D digital twin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Digital Twin for Buildings India",
    description: "A live virtual model of your building mirroring real-time HVAC performance.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Is the digital twin a static 3D model or does it update live?",
    answer:
      "It's live — the model mirrors real-time HVAC performance from the same sensor data feeding the rest of the platform, not a one-time architectural render that goes stale after go-live.",
  },
  {
    question: "Do we need our own BIM model to get a digital twin?",
    answer:
      "No. The digital twin is built from your building's layout and the equipment data captured during site assessment and integration — an existing BIM model can help but isn't a prerequisite.",
  },
  {
    question: "What's it actually useful for day to day?",
    answer:
      "Spotting which zone or floor an anomaly is coming from faster than scanning a list of equipment IDs, planning maintenance remotely without a site visit, and simulating the effect of a change before making it on live equipment.",
  },
  {
    question: "Does the twin cover the whole building or just HVAC equipment?",
    answer:
      "The focus is HVAC — chillers, AHUs, pumps and the zones they serve — mirroring the same equipment and sensor data feeding the rest of the platform, rather than a general-purpose architectural model of the entire building.",
  },
];

export default function DigitalTwinPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "3D Digital Twin", path: "/platform/3d-digital-twin" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "3D Digital Twin", path: "/platform/3d-digital-twin" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            AI Powered
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            A Live <span className="gradient-text">3D Digital Twin</span> of Your Building
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            A virtual model of your building that mirrors real-time HVAC performance — predict
            failures, simulate changes, and plan maintenance remotely instead of walking the plant
            room to find out what's actually happening.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why a List of Numbers Isn&apos;t Enough</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A dashboard full of equipment IDs and readings is accurate, but it's not always fast
              to act on — working out which anomaly on a long list actually matters, and where it
              physically is in a large or multi-building site, takes longer than it should when
              every second matters for a fault that's actively wasting energy or risking equipment.
              A spatial, visual model of the building closes that gap: instead of reading a table,
              your team sees where the issue is, in context, immediately.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Live, Not Static</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The digital twin is built from your building's layout combined with the same
              real-time sensor and equipment data feeding the rest of the SAAR platform — it
              mirrors actual HVAC performance continuously, not a one-time architectural
              visualisation that goes stale the day after go-live. As chillers, AHUs and pumps
              report status, the model reflects it, so what your team sees is what's genuinely
              happening in the plant right now.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Predicting Failures Before They Happen</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Because the twin is fed by the same continuous monitoring that drives optimisation
              and alerting elsewhere on the platform, drift that precedes a failure — a component
              trending away from its expected operating range — shows up visually before it becomes
              a breakdown. That gives facilities teams a genuine head start on maintenance planning,
              rather than finding out about a failure only once it's already interrupted operation.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Simulating Changes Before You Make Them</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Because the model reflects real building and equipment data, it's also a place to
              simulate the effect of a change — an added zone, a different setpoint policy, a new
              piece of equipment — before applying it to live systems. That's a meaningfully lower-
              risk way to plan changes than testing directly on a plant that's actively serving
              occupied space.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Remote Planning for Multi-Site Teams</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              For teams overseeing more than one property — a hotel group, a campus, a multi-tower
              portfolio — a live visual model that's accessible from anywhere means facilities
              planning doesn't require a site visit to get a clear picture of what's going on. It's
              the same underlying data as the numeric dashboard, presented in a form that's faster
              to act on when the question is spatial: which building, which floor, which zone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Built During the Same Deployment</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The digital twin isn't a separate project with its own timeline — it's assembled from
              the same site assessment and VFD/sensor integration that brings the rest of the
              platform online, typically within the same 3–4 week deployment window. There's no
              separate BIM modelling exercise required beforehand; the model is built from what's
              captured during the standard onboarding process, then kept live by the same data
              feed that powers monitoring and optimisation elsewhere on the platform.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">3D Digital Twin FAQs</h2>
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
            { name: "Energy Monitoring & Analytics", path: "/platform/energy-monitoring-analytics" },
            { name: "See It In Action", path: "/platform#see-it-in-action" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
