import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Hotel HVAC Energy Saving Solutions India",
  description:
    "Cut hotel HVAC energy costs 20–30% without touching guest comfort. AI optimises unoccupied rooms and off-peak load automatically.",
  alternates: { canonical: "/industries/hotels-hospitality" },
  openGraph: {
    title: "Hotel HVAC Energy Saving Solutions India | AE Systems",
    description:
      "Cut hotel HVAC energy costs 20–30% without touching guest comfort. AI optimises unoccupied rooms and off-peak load automatically.",
    url: "/industries/hotels-hospitality",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Hotel HVAC optimisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel HVAC Energy Saving Solutions India",
    description: "Cut hotel HVAC energy costs 20–30% without touching guest comfort.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Will optimising HVAC affect guest comfort?",
    answer:
      "No — guest-facing spaces are never the target of optimisation. SAAR focuses on unoccupied rooms, off-peak hours, and back-of-house areas, while guest rooms and public spaces stay within the comfort band your hotel already sets. Every adjustment happens inside an engineer-approved band, not an open-ended one.",
  },
  {
    question: "Can it handle a mix of guest rooms, banquet halls, and restaurants on one system?",
    answer:
      "Yes. Hotels typically have the widest mix of load profiles of any commercial property — SAAR is built to unify chillers, AHUs and pumps serving very different zones into a single dashboard and a single optimisation logic, so mixed-use properties don't need separate systems per zone type.",
  },
  {
    question: "Does this work with our existing chiller and AHU brands?",
    answer:
      "In most cases, yes. SAAR connects at the VFD and sensor level across major brands (Danfoss, Schneider, ABB, Voltas, ECI, Servotech and others) without replacing equipment or affecting OEM warranties — including hotels with mixed-brand plants built up across renovation phases.",
  },
];

export default function HotelsHospitalityPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Hotels & Hospitality", path: "/industries/hotels-hospitality" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: "Hotels & Hospitality", path: "/industries/hotels-hospitality" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Hotels & Hospitality
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Hotel HVAC Energy Savings <span className="gradient-text">Without Touching Guest Comfort</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Hotels lose the most HVAC energy in the rooms guests aren&apos;t in. SAAR finds that
            waste automatically — occupied rooms, banquet halls and restaurants stay exactly as
            comfortable as they are today.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Where Hotel HVAC Actually Wastes Energy</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A hotel&apos;s occupancy changes room by room and night by night — a fully booked
              floor next to a half-empty one, a banquet hall running at full load for one evening
              event and standing empty for days on either side of it. Because guest comfort is
              non-negotiable, the default operating approach is to condition generously and
              uniformly, treating every room and every hour the same regardless of whether anyone
              is actually there. That safety margin is where most of the avoidable spend sits:
              unoccupied rooms held at guest-ready temperature around the clock, function spaces
              conditioned hours before and after the actual event on the calendar &ldquo;just in
              case,&rdquo; corridors and public areas over-conditioned as a buffer against guest
              complaints, and back-of-house zones — kitchens, laundry, staff corridors — running on
              the same aggressive setpoints as guest floors even though nobody there needs it.
              Seasonal swings compound the problem: a property running near full occupancy during
              peak season and a fraction of that in the off-season needs genuinely different plant
              behaviour, which a fixed schedule set once at commissioning was never designed to
              track.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How SAAR Optimises for a Hotel&apos;s Load Pattern</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR AI-BMS layers onto your existing chiller plant, AHUs and pumps and continuously
              recalculates how they should run against real-time occupancy and demand signals,
              instead of a schedule fixed at commissioning and rarely revisited. Unoccupied rooms
              and low-demand hours get optimised automatically; guest rooms, lobbies and dining
              areas stay within the comfort band you already run today — every adjustment happens
              inside an engineer-approved range, never open-ended. Because the platform unifies
              every zone — guest floors, banquet halls, restaurants, back-of-house — into one
              optimisation logic, the plant stops being run at the pace of its single busiest zone
              all day, every day, and starts responding to what the property as a whole actually
              needs at any given hour.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Connected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Typically the central chiller plant, primary and secondary chilled water pumps,
              cooling towers, and the AHUs or ducted/cassette units serving guest floors,
              banquet/function spaces and public areas — plus VFDs on the major pump and fan
              motors, which is where SAAR gets its direct, motor-level control. Energy meters are
              added where visibility is missing, since accurate measurement is what makes the
              optimisation — and the savings it delivers — verifiable rather than assumed. It&apos;s
              a non-invasive retrofit throughout: no panel replacement, no OEM warranty impact, and
              it works across mixed-brand plants, which is the norm rather than the exception in
              hotels built or renovated in phases over the years.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Engineering Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              A single cloud dashboard covering the whole property — real-time chiller and AHU
              status, energy consumption broken down by zone, and automated alerts if something
              drifts out of range: a stuck valve, a sensor fault, a schedule that never got updated
              after a renovation or a change in room inventory. A 3D digital twin gives engineering
              and facilities teams a live visual model of the property to work from remotely, and
              the same data rolls up into trend reports suited to monthly ownership or corporate
              reviews, not just day-to-day operations. Quarterly performance reviews are included
              as standard, so savings keep compounding after go-live instead of drifting back
              toward the old baseline once the initial attention fades. Access is role-based, so a
              duty engineer sees the operational detail needed to act immediately, while a general
              manager sees the property-level summary that actually informs budget decisions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Built for Every Property Type</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              The same underlying platform covers business hotels with heavy weekday occupancy and
              light weekends, resorts running the opposite pattern, and serviced apartments where
              stays run weeks rather than nights — the optimisation logic adapts to whatever
              occupancy rhythm the property actually runs, rather than assuming one hospitality
              pattern fits all of them. For groups operating more than one property, that matters
              beyond a single site: the same dashboard that gives a chief engineer real-time
              visibility into one hotel&apos;s plant gives a corporate engineering or sustainability
              team a consistent, comparable view across every property in the portfolio, without
              each site reporting energy performance a different way.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Timeline</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Most sites go from initial site assessment to a live dashboard in 3–4 weeks: an early
              site visit to catalogue equipment and metering, VFD- and sensor-level integration
              with the existing plant, a calibration period to establish the property&apos;s
              comfort bands and demand patterns, and then go-live. Installation itself is typically
              measured in days, not months, since SAAR works at the VFD and sensor level rather
              than requiring a panel redesign — front-of-house and back-of-house operations
              continue without interruption throughout, which matters for a property that never
              really closes.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Hotel HVAC FAQs</h2>
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
            { name: "Commercial Real Estate", path: "/industries/commercial-real-estate" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
