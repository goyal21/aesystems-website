import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatRow } from "@/components/ui/StatRow";
import { partnerStats } from "@/content/partners";
import { site } from "@/content/site";

export function PartnerHero() {
  return (
    <section
      className="px-[6vw] pb-9 pt-32 max-[900px]:pb-7"
      style={{ background: "linear-gradient(140deg, #0A0F1E 0%, #0D1B2A 55%, #0A0F1E 100%)" }}
    >
      <div className="mx-auto flex max-w-[880px] flex-col items-start gap-6">
        <Reveal className="flex w-full flex-wrap items-center justify-between gap-3 rounded-[var(--radius-media)] border border-teal/20 bg-teal/[0.07] px-5 py-3.5">
          <p className="text-[0.83rem] text-muted-dark">
            Already a registered partner? <span className="font-semibold text-teal">Access your dashboard, leads, and resources.</span>
          </p>
          <a
            href={site.partnerLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-[999px] bg-teal px-4 py-2 text-xs font-medium text-ink"
          >
            Partner Login →
          </a>
        </Reveal>

        <Reveal delay={0.08} className="eyebrow text-teal">
          Channel Partner Programme · Open for Applications
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="text-[clamp(2rem,3.8vw,3.5rem)] text-white">
            Grow Your Business
            <br />
            with <span className="gradient-text">AE Systems.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="max-w-[560px] text-[1rem] leading-relaxed text-muted-dark">
          Join India&apos;s fastest-growing AI HVAC optimisation network. Resell IIT Jammu-validated
          SAAR solutions — and help enterprises cut energy costs by 20–30%. Proven product.
          Attractive margins. Full support from day one.
        </Reveal>

        <Reveal delay={0.26} className="flex flex-wrap gap-4">
          <Button href="/partners#apply" variant="filled" tone="dark">
            Apply to Partner →
          </Button>
          <Button href="/partners#why-partner" variant="outline" tone="dark">
            Why Partner with Us
          </Button>
        </Reveal>

        <div className="mt-10 w-full">
          <StatRow stats={partnerStats} tone="dark" />
        </div>
      </div>
    </section>
  );
}
