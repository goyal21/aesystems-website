import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";

const featured = [
  industries.find((i) => i.name === "Hotels & Hospitality")!,
  industries.find((i) => i.name === "Hospitals & Healthcare")!,
  industries.find((i) => i.name === "Data Centers")!,
];

export function IndustriesTeaser() {
  return (
    <section id="industries" className="section-pad bg-ink">
      <SectionHeading
        center
        tone="dark"
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

      <RevealGroup className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-3">
        {featured.map((industry) => (
          <RevealItem
            key={industry.name}
            className="group relative h-[240px] overflow-hidden rounded-[var(--radius-media)]"
          >
            <Image
              src={industry.image}
              alt={industry.name}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-lg font-semibold text-white">{industry.name}</h3>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 flex justify-center">
        <Button href="/industries" variant="outline" tone="dark">
          See All Industries →
        </Button>
      </div>
    </section>
  );
}
