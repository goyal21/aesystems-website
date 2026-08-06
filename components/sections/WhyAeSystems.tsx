import { AppImage as Image } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const differentiators = [
  "No equipment replacement — retrofit only",
  "Motor-level control, not panel replacement",
  "12 patents · IIT Jammu validated",
  "100% indigenous hardware & software",
  "Pan-India field engineering & support",
];

export function WhyAeSystems() {
  return (
    <section id="why" className="section-pad bg-ink">
      <SectionHeading
        center
        tone="dark"
        eyebrow="Why AE Systems"
        title={
          <>
            More Focused Than Giants.
            <br />
            <span className="gradient-text">More Complete Than Integrators.</span>
          </>
        }
        sub="Big players are too expensive and too rigid for Indian buildings. Local integrators lack the AI and product depth. AE Systems sits exactly in between — IIT-validated technology, Indian pricing, an AI platform purpose-built for HVAC."
        className="mx-auto mb-14"
      />

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative h-[280px] w-full overflow-hidden rounded-[var(--radius-media)] border border-white/10">
          <Image
            src="/assets/site-controller.jpg"
            alt="AE Systems industrial controller wired to a VFD on site, next to a chiller plant room"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
        </div>

        <RevealGroup className="flex flex-col justify-center">
          {differentiators.map((item, index) => (
            <RevealItem
              key={item}
              className={`flex items-center justify-between gap-6 py-5 text-[0.95rem] text-white ${
                index !== differentiators.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span>{item}</span>
              <span className="text-teal-light">✓</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
