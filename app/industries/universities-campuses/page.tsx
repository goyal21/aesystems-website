import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Campus HVAC Energy Management India",
  description:
    "Multi-building campuses managed from a single dashboard, with 25% savings proven at IIT Jammu.",
  alternates: { canonical: "/industries/universities-campuses" },
  openGraph: {
    title: "Campus HVAC Energy Management India | AE Systems",
    description:
      "Multi-building campuses managed from a single dashboard, with 25% savings proven at IIT Jammu.",
    url: "/industries/universities-campuses",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Campus HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus HVAC Energy Management India",
    description: "Multi-building campuses managed from a single dashboard, 25% savings proven at IIT Jammu.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Is this the same deployment as the IIT Jammu case study?",
    answer:
      "Yes — the IIT Jammu deployment is a live, verified example of exactly this: 7 AHUs and 2 chillers under AI control across the campus, delivering 25% campus HVAC energy savings with 35 energy meters under continuous monitoring.",
  },
  {
    question: "Can it handle very different buildings — labs, hostels, classrooms — on one campus?",
    answer:
      "Yes. Campuses are precisely the mixed-load environment SAAR is built for — classrooms, hostels, labs and admin buildings each have different occupancy calendars, and the platform unifies them into one optimisation logic rather than treating each building separately.",
  },
  {
    question: "Does it account for academic term vs. break periods?",
    answer:
      "The optimisation responds to real-time demand rather than a fixed calendar, so it adapts automatically as occupancy drops during breaks and returns during term — no manual reconfiguration needed each semester.",
  },
  {
    question: "Can hostels and academic buildings be brought onto the platform in phases?",
    answer:
      "Yes — campuses are commonly onboarded building by building or in groups rather than all at once, which is also how the IIT Jammu deployment scaled up to its current 7-AHU, 2-chiller footprint.",
  },
];

export default function UniversitiesCampusesPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Universities & Campuses", path: "/industries/universities-campuses" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Universities & Campuses", path: "/industries/universities-campuses" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Universities & Campuses
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Campus-Wide HVAC, <span className="gradient-text">Proven at IIT Jammu</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Dozens of buildings, each with its own occupancy calendar, managed as one system
            instead of dozens of separate ones. This is the exact deployment shape verified at IIT
            Jammu: 25% campus HVAC energy savings.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Campus HVAC Is Hard to Manage Centrally</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A university campus is really dozens of separate buildings with wildly different
              occupancy calendars sharing one institution: classrooms full during the day and empty
              overnight, hostels running the opposite pattern, labs with equipment heat loads that
              have nothing to do with occupancy at all, and administrative blocks somewhere in
              between. Academic terms and breaks add a second layer of variation on top of the daily
              one. Left to run building by building, overall campus efficiency ends up depending on
              facilities staff manually coordinating dozens of independently controlled systems —
              a task that scales badly as the campus grows, and one where a single building running
              on a stale schedule doesn't get noticed for months.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises Across a Campus</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS connects to chillers, AHUs and pumps across every participating building
              and brings them under one optimisation logic instead of dozens of independent ones.
              The platform responds to real-time occupancy and demand in each building rather than a
              fixed academic-calendar schedule, so it adapts automatically as term dates, exam
              periods and semester breaks shift year to year — no manual reconfiguration required
              each cycle. This is exactly the deployment shape verified at IIT Jammu, where 7 AHUs
              and 2 chillers came under active AI control across the campus, delivering 25%
              campus-wide HVAC energy savings, verified against 35 continuously monitored energy
              meters.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Chiller plants, chilled water pumps, and AHUs across classroom blocks, hostels,
              laboratories and administrative buildings, plus VFDs on the major motors — the same
              scope proven at IIT Jammu, extended to whichever buildings a campus wants under one
              system. Energy, BTU, noise, vibration and temperature/humidity metering is added
              wherever visibility is missing, matching the sensor mix used in that live deployment.
              It's a non-invasive retrofit throughout, working across the mixed-brand equipment
              common on campuses built up over decades.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Facilities Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              One dashboard for the entire campus — real-time status for every connected building,
              energy consumption by building and by system, and automated alerts when something
              drifts out of range. A 3D digital twin gives facilities teams a live visual model to
              plan and troubleshoot remotely across a campus that can span a large physical
              footprint. Quarterly performance reviews keep savings compounding as buildings are
              added to the system or usage patterns shift year over year.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Beyond Classrooms and Offices</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Indian campuses typically carry infrastructure well beyond lecture halls — hostels
              housing thousands of students, guest houses, sports complexes, and research labs with
              equipment-driven heat loads that have nothing to do with occupancy. Each of these
              behaves differently enough that a single campus-wide schedule was never going to suit
              all of them, which is why building-by-building manual tuning tends to be where campus
              facilities teams spend most of their time. Bringing them under one optimisation logic
              — the same one already proven across IIT Jammu's campus — means the platform adapts
              to each building's actual pattern instead of forcing hostels and labs to run on a
              lecture-hall schedule.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most campuses go from site assessment to a live dashboard in 3–4 weeks per building
              or building group, with campuses often onboarded in phases rather than all at once.
              Installation works at the VFD and sensor level rather than requiring panel redesign,
              so academic operations continue without interruption throughout — a requirement IIT
              Jammu's live campus deployment already demonstrates in practice.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Campus HVAC FAQs</h2>
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
            { name: "IIT Jammu Case Study", path: "/case-studies/iit-jammu" },
            { name: "All Industries", path: "/industries" },
            { name: "The SAAR Platform", path: "/platform" },
            { name: "Hospitals & Healthcare", path: "/industries/hospitals-healthcare" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
