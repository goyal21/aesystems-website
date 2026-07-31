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
    <section id="why" className="section-pad bg-white">
      <SectionHeading
        center
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
        <div
          className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-[var(--radius-media)] border border-ink/8"
          style={{ background: "linear-gradient(135deg, #0A0F1E, #0D1B2A)" }}
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-white/30">
            Photo pending — controller on a VFD / engineer on site
          </span>
        </div>

        <RevealGroup className="flex flex-col justify-center">
          {differentiators.map((item, index) => (
            <RevealItem
              key={item}
              className={`flex items-center justify-between gap-6 py-5 text-[0.95rem] text-ink ${
                index !== differentiators.length - 1 ? "border-b border-ink/10" : ""
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
