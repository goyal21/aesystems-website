import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";

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

      <Carousel arrowTone="dark" className="mx-auto max-w-[1100px]">
        {industries.map((industry) => (
          <Link
            key={industry.name}
            href={`/industries/${industry.slug}`}
            data-carousel-item
            className="group relative block h-[240px] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius-media)] sm:w-[calc((100%-2rem)/3)]"
          >
            <Image
              src={industry.image}
              alt={industry.name}
              fill
              sizes="(max-width: 640px) 78vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-lg font-semibold text-white">{industry.name}</h3>
            </div>
          </Link>
        ))}
      </Carousel>

      <div className="mt-10 flex justify-center">
        <Button href="/industries" variant="outline" tone="dark">
          See All Industries →
        </Button>
      </div>
    </section>
  );
}
