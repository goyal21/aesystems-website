import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { Carousel } from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/content/caseStudies";

export function CaseStudiesTeaser() {
  return (
    <section id="case-studies" className="section-pad bg-white">
      <div className="mx-auto mb-10 flex max-w-[1100px] flex-col items-center gap-3 text-center">
        <span className="font-mono text-[1.36rem] font-semibold uppercase tracking-[0.14em] text-teal-light">
          Case Studies
        </span>
        <h2 className="text-[clamp(2rem,3.8vw,3.5rem)] text-ink">
          Real Deployments. <span className="gradient-text">Real Results.</span>
        </h2>
      </div>

      <Carousel arrowTone="light" className="mx-auto max-w-[1100px]">
        {caseStudies.map((study) => (
          <Link
            key={study.client}
            href={`/case-studies/${study.slug}`}
            data-carousel-item
            className="group flex w-[74vw] shrink-0 snap-start flex-col gap-3 rounded-[var(--radius-card)] bg-ink p-6 transition-colors hover:bg-panel sm:w-[calc((100%-2rem)/3)]"
          >
            {study.logo && (
              <div className="flex h-9 w-fit items-center rounded-[var(--radius-control)] bg-white/95 px-3">
                <Image src={study.logo} alt={`${study.client} logo`} width={120} height={40} className="h-6 w-auto object-contain" />
              </div>
            )}
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/50">
              {study.category}
            </span>
            <h3 className="font-display text-[1rem] font-bold text-white">{study.client}</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[2.2rem] font-bold leading-none text-teal-light">
                {study.statValue}
              </span>
              <span className="font-display text-[1.1rem] font-bold text-teal-light">{study.statUnit}</span>
            </div>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-white/60">
              {study.statCaption}
            </p>
          </Link>
        ))}
      </Carousel>

      <div className="mt-10 flex justify-center">
        <Button href="/case-studies" variant="outline" tone="light">
          See All Case Studies →
        </Button>
      </div>
    </section>
  );
}
