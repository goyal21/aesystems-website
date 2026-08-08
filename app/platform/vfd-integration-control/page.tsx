import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "VFD Integration & Motor-Level HVAC Control",
  description:
    "Direct VFD-level control for chillers, AHUs and pumps. No panel interference, no OEM warranty impact.",
  alternates: { canonical: "/platform/vfd-integration-control" },
  openGraph: {
    title: "VFD Integration & Motor-Level HVAC Control | AE Systems",
    description:
      "Direct VFD-level control for chillers, AHUs and pumps. No panel interference, no OEM warranty impact.",
    url: "/platform/vfd-integration-control",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — VFD integration and control" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VFD Integration & Motor-Level HVAC Control",
    description: "Direct VFD-level control for chillers, AHUs and pumps, no panel interference.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "Does this interfere with our existing control panels?",
    answer:
      "No. Integration happens at the VFD and sensor level, not by modifying or replacing panels — your existing panel logic and safety interlocks remain exactly as installed.",
  },
  {
    question: "Will this affect our OEM equipment warranties?",
    answer:
      "No. Because it's a non-invasive integration rather than a hardware modification, connecting at the VFD level doesn't affect OEM warranties on the chillers, AHUs or pumps themselves.",
  },
  {
    question: "Which VFD brands does this work with?",
    answer:
      "SAAR integrates across major brands including Danfoss, Schneider, ABB, Voltas, ECI and Servotech, which covers most mixed-brand plants without requiring standardisation on a single manufacturer first.",
  },
  {
    question: "What if our VFDs are older or a less common model?",
    answer:
      "Compatibility is confirmed during site assessment rather than assumed — if a specific drive can't be integrated directly, that gets flagged upfront as part of the scoping process, not discovered midway through installation.",
  },
];

export default function VfdIntegrationControlPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "VFD Integration & Control", path: "/platform/vfd-integration-control" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "VFD Integration & Control", path: "/platform/vfd-integration-control" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            Non-Invasive
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            VFD Integration & <span className="gradient-text">Motor-Level Control</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Direct, motor-level control over chillers, AHUs and pumps — connected at the VFD, not
            the panel, so there's no interference with existing equipment and no OEM warranty
            impact.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why VFD-Level Is the Right Integration Point</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              There are two ways to add intelligent control to an HVAC plant: redesign the control
              panels, or integrate at the VFD and sensor level that already sits between the panel
              and the motor. Panel redesign is invasive — it typically requires downtime, carries
              OEM warranty implications, and locks you into whatever that new panel logic supports.
              VFD-level integration avoids all of that: the drives already installed on your
              chillers, AHUs and pumps become the control surface, which means real, motor-level
              intelligence without touching the panel logic or the equipment itself.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How the Integration Works</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR connects directly to the VFDs already installed on your chiller, AHU and pump
              motors, plus the sensors feeding temperature, pressure and flow data. From there it
              can adjust motor speed in real time — the actual mechanism behind chiller loading,
              AHU fan output and pump flow — rather than only being able to turn equipment on or
              off, or nudge a setpoint the panel then interprets on its own. This is what makes
              fine-grained, continuous optimisation possible instead of coarse, occasional
              adjustments.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">No Panel Interference, No Warranty Impact</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Because integration happens at the VFD rather than inside the panel, your existing
              panel logic, safety interlocks and OEM warranties are untouched. This matters
              practically: most commercial buildings run mixed-brand equipment installed or
              replaced across different years, and a panel-level approach would mean either
              standardising on one manufacturer or maintaining separate integrations per brand.
              VFD-level integration works the same way across major brands — Danfoss, Schneider,
              ABB, Voltas, ECI, Servotech and others — without that constraint.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What This Enables Elsewhere on the Platform</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              VFD-level access is the mechanism behind most of what the rest of SAAR does: AI-based
              optimisation adjusts motor speed through this same connection, safe sequencing
              automation uses it to enforce startup interlocks between chillers, pumps and towers,
              and real-time monitoring reads the same sensor data this integration exposes. It's
              the foundation layer other capabilities build on, not a standalone feature.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Deployment Without Downtime</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Because there's no panel redesign involved, installation is typically measured in
              days rather than months, and building or plant operations continue throughout. Most
              sites go from site assessment to a live dashboard in 3–4 weeks, with the VFD and
              sensor integration itself making up only a portion of that timeline — the rest is
              calibration against your building's actual demand pattern.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why This Matters More With Mixed-Brand Plants</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Buildings expanded or renovated over multiple phases rarely end up with one
              chiller, AHU and pump brand throughout — a phase-one plant from one manufacturer,
              a phase-two expansion from another, is the common case rather than the exception.
              A panel-level integration would need a separate approach per brand, or pressure
              toward standardising on one manufacturer before any of this is possible. VFD-level
              integration sidesteps that entirely: it works the same way regardless of which
              brand sits behind the drive, which is what makes it practical for a plant that
              was never built to be uniform in the first place.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">VFD Integration FAQs</h2>
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
            { name: "Safe Sequencing & Automation", path: "/platform/safe-sequencing-automation" },
            { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
