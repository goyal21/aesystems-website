import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { partnerBenefits } from "@/content/partners";

export function WhyPartner() {
  return (
    <section id="why-partner" className="section-pad bg-white">
      <SectionHeading
        center
        eyebrow="Why Partner with AE Systems"
        title={
          <>
            A Product That
            <br />
            <span className="gradient-text">Sells Itself.</span>
          </>
        }
        sub="The HVAC energy optimisation market in India is underserved and growing fast. Buildings across hotels, hospitals, factories, and offices are spending crores on avoidable electricity bills. SAAR AI-BMS solves that — with proof. Your job is to open the door. We help you close."
        className="mx-auto mb-14 max-w-[1100px]"
      />

      <RevealGroup className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnerBenefits.map((benefit) => (
          <RevealItem
            key={benefit.title}
            className="flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-ink/8 bg-surface p-6"
          >
            <h3 className="font-display text-[1.02rem] font-semibold text-ink">{benefit.title}</h3>
            <p className="text-sm leading-relaxed text-body-light">{benefit.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
