import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactCta } from "@/components/seo/ContactCta";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Safe Chiller Sequencing & HVAC Automation",
  description:
    "Automated startup interlocks for chiller–pump–tower sequences, eliminating operator error — the leading cause of HVAC trips.",
  alternates: { canonical: "/platform/safe-sequencing-automation" },
  openGraph: {
    title: "Safe Chiller Sequencing & HVAC Automation | AE Systems",
    description:
      "Automated startup interlocks for chiller–pump–tower sequences, eliminating operator error — the leading cause of HVAC trips.",
    url: "/platform/safe-sequencing-automation",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "AE Systems — Safe sequencing and automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Chiller Sequencing & HVAC Automation",
    description: "Automated startup interlocks for chiller-pump-tower sequences.",
    images: ["/assets/og-image.png"],
  },
};

const faqs = [
  {
    question: "What exactly is a sequencing error, in practice?",
    answer:
      "Most commonly, a chiller starting before its associated pump and cooling tower are confirmed ready — which can trip protective cutouts, stress equipment, or in the worst case cause damage. It's typically caused by manual startup steps skipped or done out of order.",
  },
  {
    question: "Does this replace our operator's role in starting up equipment?",
    answer:
      "No — it removes the error-prone part of a manual process, not the operator. Startup is still initiated the same way; the interlocks simply enforce that each step in the chiller-pump-tower sequence is genuinely ready before the next one proceeds.",
  },
  {
    question: "Does this work with our existing chiller and pump brands?",
    answer:
      "In most cases, yes. Sequencing automation connects at the same VFD and sensor level as the rest of the platform, across major brands including Danfoss, Schneider, ABB, Voltas, ECI and Servotech.",
  },
  {
    question: "What happens if a stage genuinely isn't ready during startup?",
    answer:
      "The sequence holds at that stage and alerts your team rather than proceeding anyway — the entire point of the interlock is to stop an unsafe startup before it happens, not just log it after the fact.",
  },
];

export default function SafeSequencingAutomationPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Safe Sequencing & Automation", path: "/platform/safe-sequencing-automation" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: "Safe Sequencing & Automation", path: "/platform/safe-sequencing-automation" },
        ]}
      />

      <div className="section-pad pb-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 text-center">
          <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-teal-light">
            24×7 Protection
          </span>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Safe Sequencing, <span className="gradient-text">Automated Every Time</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.8] text-muted-dark">
            Automated startup interlocks for chiller–pump–tower sequences remove the leading cause
            of HVAC trips — operator error — without removing the operator.
          </p>
        </Reveal>
      </div>

      <section className="section-pad bg-white">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Why Startup Sequencing Fails</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Chillers, pumps and cooling towers have to start in a specific order, with each stage
              confirmed ready before the next begins — a chiller starting before its condenser
              water pump and tower are actually flowing can trip protective cutouts or, over
              repeated occurrences, stress the equipment itself. Done manually, this depends on an
              operator following every step correctly, every time, including during a rushed
              restart after a power interruption or a shift change where the next person on duty
              doesn't have full context. Operator error in exactly this kind of sequencing is one
              of the most common causes of HVAC system trips — not equipment failure, but a step
              skipped or done out of order.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">How Automated Interlocks Work</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              SAAR enforces the correct chiller–pump–tower startup sequence automatically, using
              the same VFD and sensor connections as the rest of the platform to confirm each stage
              is genuinely ready — flow confirmed, pressure within range — before allowing the next
              stage to proceed. The operator still initiates startup the same way they always have;
              what changes is that the error-prone manual verification between each step is now
              enforced by the system itself, every time, regardless of who's on shift or how much
              pressure they're under.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Gets Protected</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Chillers, condenser and chilled water pumps, and cooling towers — the full sequence
              chain most commercial HVAC plants depend on. Integration happens at the same VFD and
              sensor level as the rest of SAAR, across major brands including Danfoss, Schneider,
              ABB, Voltas, ECI and Servotech, so mixed-brand plants get the same protection without
              needing to standardise on one manufacturer's sequencing logic first.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">What Your Team Sees</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Startup and shutdown events logged on the same dashboard as the rest of the platform,
              with automated alerts if a sequence is ever held up waiting for a stage that isn't
              confirming ready — surfacing a genuine equipment issue immediately, rather than an
              operator discovering it only after a trip. Over time, this history also gives
              facilities teams a clear record of startup reliability, useful for maintenance
              planning and for training new operators on what a correct sequence actually looks
              like.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Configured During Commissioning, Not Bolted On Later</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Sequencing interlocks are defined during the same site assessment and integration
              process that brings the rest of the platform online — your engineering team confirms
              the correct chiller-pump-tower order and the ready conditions for each stage before
              anything goes live, so the automation reflects how your specific plant is actually
              meant to start up, not a generic default. Most sites go from assessment to a live,
              protected system in 3–4 weeks.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-ink">Part of the Same Protected Plant</h2>
            <p className="text-[0.98rem] leading-[1.8] text-body-light">
              Sequencing automation runs on the same VFD-level integration that powers AI-based
              optimisation and real-time monitoring elsewhere on the platform — it's not a
              separate add-on system with its own installation. Every safe-sequencing interlock is
              respected by the optimisation logic too, so continuous efficiency improvements never
              come at the cost of the startup protections your equipment depends on.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <h2 className="text-center text-[clamp(1.5rem,2.6vw,2rem)] text-white">Safe Sequencing FAQs</h2>
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
            { name: "VFD Integration & Control", path: "/platform/vfd-integration-control" },
            { name: "AI-Based HVAC Optimisation", path: "/platform/ai-hvac-optimisation" },
            { name: "Smart BMS & Monitoring", path: "/platform/smart-bms-monitoring" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
      </section>

      <ContactCta tone="dark" />
    </main>
  );
}
