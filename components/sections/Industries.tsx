import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { industries } from "@/content/industries";

export function Industries() {
  return (
    <section id="industries" className="section-pad bg-white">
      <SectionHeading
        center
        eyebrow="Industries"
        title={
          <>
            Built for Buildings
            <br />
            <span className="gradient-text">That Never Stop Running.</span>
          </>
        }
        sub="Anywhere HVAC runs around the clock, SAAR finds savings. From guest comfort to critical cooling, the optimisation logic adapts to how each sector actually operates."
        className="mb-14"
      />

      <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {industries.map((industry, index) => (
          <RevealItem
            key={industry.name}
            className="group relative h-[306px] overflow-hidden rounded-[var(--radius-media)]"
          >
            <Image
              src={industry.image}
              alt={industry.name}
              fill
              sizes="(max-width: 640px) 45vw, 31vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
              <h3 className="font-display text-lg font-semibold text-white">{industry.name}</h3>
              <p className="max-h-0 overflow-hidden text-sm leading-snug text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                {industry.benefit}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
