import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { capabilities } from "@/content/capabilities";
import { withBasePath } from "@/lib/basePath";

export function Platform() {
  return (
    <section id="platform" className="section-pad bg-white">
      <SectionHeading
        center
        eyebrow="The Platform"
        title={
          <>
            One Platform. <span className="gradient-text">Complete HVAC&nbsp;Intelligence.</span>
          </>
        }
        sub="SAAR is a single AI platform for everything your HVAC needs — optimisation, monitoring, control and visualisation. It plugs into what you already have and gets smarter about your building every single day."
        className="mx-auto mb-14"
      />

      <div className="mx-auto mb-16 aspect-[20/9] max-w-[1100px] overflow-hidden rounded-[var(--radius-card)] border border-ink/8">
        <video
          src={withBasePath("/assets/platform/archgif.mp4")}
          aria-label="SAAR AI-BMS architecture: sense, decide, act control loop"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <RevealGroup className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3.5 lg:grid-cols-3">
        {capabilities.map((cap, index) => (
          <RevealItem
            key={cap.title}
            className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-ink"
          >
            <Link href={`/platform/${cap.slug}`} className="relative block h-full w-full">
              <Image
                src={cap.image}
                alt={cap.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                loading={index < 3 ? "eager" : "lazy"}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              {cap.core && (
                <span className="eyebrow absolute right-3 top-3 rounded-[var(--radius-control)] bg-teal-light px-2 py-0.5 text-white">
                  CORE
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-[0.9rem] font-semibold leading-tight text-white">{cap.title}</h3>
                </div>
                <span className="eyebrow w-fit text-teal">{cap.tag}</span>
                <p className="max-h-0 overflow-hidden text-xs leading-snug text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
                  {cap.bullets.join(" · ")}
                </p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
