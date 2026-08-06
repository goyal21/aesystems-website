import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { capabilities } from "@/content/capabilities";
import { withBasePath } from "@/lib/basePath";

const featured = capabilities.slice(0, 3);

export function PlatformTeaser() {
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
        sub="SAAR is a single AI platform for everything your HVAC needs — optimisation, monitoring, control and visualisation. It plugs into what you already have."
        className="mx-auto mb-14"
      />

      <div className="mx-auto mb-12 aspect-[20/9] max-w-[1100px] overflow-hidden rounded-[var(--radius-card)] border border-ink/8">
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

      <RevealGroup className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3.5 sm:grid-cols-3">
        {featured.map((cap) => (
          <RevealItem
            key={cap.title}
            className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-ink"
          >
            <Image
              src={cap.image}
              alt={cap.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
              <h3 className="font-display text-[0.9rem] font-semibold leading-tight text-white">{cap.title}</h3>
              <span className="eyebrow w-fit text-teal">{cap.tag}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 flex justify-center">
        <Button href="/platform" variant="outline" tone="light">
          Explore the Full Platform →
        </Button>
      </div>
    </section>
  );
}
