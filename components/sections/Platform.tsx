import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PlatformDiagram } from "@/components/sections/PlatformDiagram";
import { capabilities } from "@/content/capabilities";

export function Platform() {
  return (
    <section id="platform" className="section-pad bg-white">
      <SectionHeading
        center
        eyebrow="The Platform"
        title={
          <>
            One Platform.
            <br />
            <span className="gradient-text">Complete HVAC Intelligence.</span>
          </>
        }
        sub="SAAR is a single AI platform for everything your HVAC needs — optimisation, monitoring, control and visualisation. It plugs into what you already have and gets smarter about your building every single day."
        className="mx-auto mb-14"
      />

      <div className="mx-auto mb-16 max-w-[1100px]">
        <PlatformDiagram />
      </div>

      <RevealGroup className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => (
          <RevealItem
            key={cap.title}
            className="relative flex min-h-[150px] flex-col gap-2.5 rounded-[var(--radius-card)] border border-ink/8 bg-surface p-5"
          >
            {cap.core && (
              <span className="eyebrow absolute right-4 top-4 rounded-[var(--radius-control)] bg-teal-light px-2 py-0.5 text-white">
                CORE
              </span>
            )}
            <h3 className="font-display text-[1rem] font-semibold text-ink">{cap.title}</h3>
            <p className="text-sm leading-relaxed text-body-light">{cap.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
