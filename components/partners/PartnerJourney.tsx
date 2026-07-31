import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { partnerJourney } from "@/content/partners";

export function PartnerJourney() {
  return (
    <section className="section-pad bg-panel">
      <SectionHeading
        center
        tone="dark"
        eyebrow="Your Partner Journey"
        title="Simple to Start. Built to Scale."
        className="mx-auto mb-16"
      />

      <RevealGroup className="relative mx-auto grid max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="absolute left-[16.5%] right-[16.5%] top-7 hidden h-px bg-gradient-to-r from-teal/15 via-teal to-teal/15 sm:block" />
        {partnerJourney.map((step) => (
          <RevealItem
            key={step.num}
            className="relative flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-teal/12 bg-white/[0.03] p-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal bg-[#1B3A5C] font-mono text-[1.05rem] font-semibold text-teal">
              {step.num}
            </span>
            <h3 className="font-display text-[1rem] font-semibold text-white">{step.title}</h3>
            <p className="text-[0.85rem] leading-relaxed text-muted-dark">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
