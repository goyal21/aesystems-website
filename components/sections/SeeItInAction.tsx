import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/basePath";

const CELL_HEIGHT = "md:h-[360px]";

const items = [
  { label: "Digital Twin", animated: true, wide: true },
  { label: "BMS Control", animated: false, wide: false, src: "/assets/products/industrial-controller.webp" },
  { label: "Energy Dashboard", animated: false, wide: true, src: "/assets/products/energy-dashboard.webp" },
  { label: "Gateway & Connectivity", animated: false, wide: false, src: "/assets/products/universal-gateway.jpg" },
];

export function SeeItInAction() {
  return (
    <section id="see-it-in-action" className="section-pad bg-ink">
      <SectionHeading
        center
        tone="dark"
        eyebrow="See It In Action"
        title={
          <>
            Every Watt, Visible. <span className="gradient-text">Every Building, Modelled.</span>
          </>
        }
        sub="Your actual dashboard is configured to your building during the pilot — illustrative preview below."
        className="mx-auto mb-12"
      />

      <RevealGroup className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
        {items.map((item, i) => (
          <RevealItem
            key={item.label}
            className={`relative overflow-hidden rounded-[var(--radius-media)] border border-white/10 bg-panel ${
              item.wide ? "aspect-video md:aspect-auto" : "aspect-[4/3] md:aspect-auto"
            } ${CELL_HEIGHT}`}
          >
            {item.animated ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={withBasePath("/assets/products/digital-twin-poster.jpg")}
                aria-label={`${item.label} preview`}
                className="h-full w-full object-cover"
              >
                <source src={withBasePath("/assets/products/digital-twin.webm")} type="video/webm" />
                <source src={withBasePath("/assets/products/digital-twin.mp4")} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={item.src!}
                alt={`${item.label} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-8">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/85">{item.label}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
