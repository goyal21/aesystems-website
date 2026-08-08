import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Airport HVAC Optimisation & Terminal Cooling",
  description:
    "Terminal-scale HVAC coordinated across zones with continuous, mission-critical uptime and full energy visibility.",
  alternates: { canonical: "/industries/airports" },
  openGraph: {
    title: "Airport HVAC Optimisation & Terminal Cooling | AE Systems",
    description:
      "Terminal-scale HVAC coordinated across zones with continuous, mission-critical uptime and full energy visibility.",
    url: "/industries/airports",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Airport HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport HVAC Optimisation & Terminal Cooling",
    description: "Terminal-scale HVAC coordinated across zones with continuous, mission-critical uptime.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Can this run continuously without any downtime window?",
    answer:
      "Yes — installation and operation are both designed around continuous facility uptime. SAAR works at the VFD and sensor level rather than requiring panel redesign, and optimisation itself operates within engineer-approved bands that never interrupt terminal operations.",
  },
  {
    question: "How does it handle very different zones — check-in halls, gates, retail, back-of-house?",
    answer:
      "Terminals are exactly the mixed-zone environment SAAR is built to unify — each zone type has its own occupancy and thermal profile, and the platform optimises each against real demand rather than running every zone at one conservative shared setpoint.",
  },
  {
    question: "What about passenger comfort during peak travel periods?",
    answer:
      "Passenger-facing zones stay within the comfort bands you set, the same way guest-facing spaces do in hospitality deployments — optimisation targets off-peak and lower-occupancy periods and back-of-house areas, not peak-hour passenger zones.",
  },
  {
    question: "Does it work with our existing mixed-brand terminal equipment?",
    answer:
      "In most cases, yes. SAAR connects at the VFD and sensor level across major brands (Danfoss, Schneider, ABB, Voltas, ECI, Servotech and others) without replacing equipment or affecting OEM warranties — including plants built up across successive terminal expansions.",
  },
];

export default function AirportsPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Airports", path: "/industries/airports" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Airports", path: "/industries/airports" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Airports
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Terminal HVAC Coordination <span className="gradient-text">Built for Continuous Operation</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Terminals never close, and comfort is a service-quality metric, not a preference. SAAR
            coordinates HVAC across every zone — check-in, gates, retail, back-of-house — without
            ever compromising mission-critical uptime.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Terminal HVAC Runs Conservatively</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A terminal building operates continuously, with no acceptable downtime window, across
              zones that behave nothing like each other: high-ceilinged check-in halls with
              constantly cycling passenger volumes, gate areas whose occupancy swings with the
              flight schedule, retail and dining concessions, and back-of-house operational areas
              with entirely different thermal loads. Because passenger comfort is a direct service
              quality and, at points, safety factor, and because zone-level tuning carries real
              operational risk if it's done manually, large shared AHU zones are typically run at
              conservative, fixed setpoints sized for the busiest imaginable moment — which means
              most hours of most days, the plant is running harder than the terminal actually needs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Coordinates Terminal-Scale HVAC</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS connects to the terminal's chiller plant, AHUs and pumps and continuously
              coordinates them against real-time zone-level demand rather than one shared,
              worst-case setpoint. Passenger-facing zones — check-in, gates, arrivals — stay within
              the comfort bands already set for them; optimisation targets off-peak periods,
              lower-occupancy zones and back-of-house areas where the same safety margin isn't
              needed. Every adjustment operates inside an engineer-approved band, which matters
              more here than almost anywhere else given the continuous, mission-critical nature of
              terminal operations.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The central chiller plant, primary and secondary chilled water pumps, and the AHUs
              serving check-in halls, gate areas, retail/concession zones and back-of-house
              operational spaces — plus VFDs on the major pump and fan motors. Airports commonly
              run mixed-brand equipment installed across successive terminal expansions, so
              brand-agnostic integration at the VFD and sensor level is a practical requirement, not
              a nice-to-have. It's a non-invasive retrofit: no panel replacement, no interference
              with existing building management or safety systems.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Operations Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A single dashboard covering every connected zone — real-time chiller and AHU status,
              energy consumption by zone, and automated alerts if something drifts, surfaced fast
              enough to act on before it becomes a passenger-facing issue. A 3D digital twin gives
              facilities and operations teams a live visual model of the terminal for planning and
              troubleshooting, and quarterly performance reviews keep the optimisation tuned as
              flight schedules, seasonal traffic and terminal layouts change over time.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Built for Every Terminal Size</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The same coordination logic scales from a single regional terminal to a multi-terminal
              international hub — what changes is the number of zones and AHUs under management,
              not the underlying approach. For airports operating more than one terminal, a single
              dashboard that treats every terminal consistently matters even more: operations teams
              get one place to compare energy performance and equipment health across terminals
              built and commissioned years apart, instead of each terminal's facilities team working
              from its own separate view of a system that, in reality, serves the same airport.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most terminals go from site assessment to a live dashboard in 3–4 weeks. Given the
              continuous-operation requirement, the assessment phase includes explicit sign-off on
              safe operating bands with your facilities and operations leadership before any
              integration begins. Installation itself works at the VFD and sensor level rather than
              requiring panel redesign or downtime, so terminal operations continue uninterrupted
              throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Airport HVAC FAQs</h2>
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
            { name: "Data Centers", path: "/industries/data-centers" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
