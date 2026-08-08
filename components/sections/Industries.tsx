import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { industries, type Industry } from "@/content/industries";

const byName = (name: string) => industries.find((industry) => industry.name === name)!;

// Mobile-only row split: Data Centers closes row 1, Airports closes row 2.
const mobileRows: Industry[][] = [
  [byName("Hotels & Hospitality"), byName("Hospitals & Healthcare"), byName("Data Centers")],
  [byName("Commercial Real Estate"), byName("Universities & Campuses"), byName("Airports")],
];

function IndustryCard({ industry, eager }: { industry: Industry; eager: boolean }) {
  return (
    <Link href={`/industries/${industry.slug}`} className="relative block h-full w-full">
      <Image
        src={industry.image}
        alt={industry.name}
        fill
        sizes="(max-width: 640px) 37vw, 31vw"
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        <h3 className="font-display text-lg font-semibold text-white">{industry.name}</h3>
        <p className="max-h-0 overflow-hidden text-sm leading-snug text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
          {industry.benefit}
        </p>
      </div>
    </Link>
  );
}

export function Industries() {
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

      {/* Mobile: two swipeable rows, Data Centers / Airports closing each row */}
      <div className="flex flex-col gap-4 sm:hidden">
        {mobileRows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative">
            <RevealGroup className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {row.map((industry, index) => (
                <RevealItem
                  key={industry.name}
                  className="group relative h-[306px] w-[42%] shrink-0 snap-start overflow-hidden rounded-[var(--radius-media)]"
                >
                  <IndustryCard industry={industry} eager={rowIndex === 0 && index < 2} />
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink to-transparent" />
          </div>
        ))}
      </div>

      {/* Desktop/tablet: original static 3-column grid, original order */}
      <RevealGroup className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
        {industries.map((industry, index) => (
          <RevealItem
            key={industry.name}
            className="group relative h-[306px] overflow-hidden rounded-[var(--radius-media)]"
          >
            <IndustryCard industry={industry} eager={index < 3} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
