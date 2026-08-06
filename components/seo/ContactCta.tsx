import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type ContactCtaProps = {
  title?: string;
  sub?: string;
  tone?: "dark" | "light";
};

/** Lightweight closing CTA for hub pages — links to the full /contact page rather than re-embedding the form. */
export function ContactCta({
  title = "Ready to Make Your Building Smarter?",
  sub = "Request a pilot, book a live dashboard demo, or get a site-specific proposal — an engineer responds within 24 hours.",
  tone = "dark",
}: ContactCtaProps) {
  const bg = tone === "dark" ? "bg-ink" : "bg-white";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-muted-dark" : "text-body-light";

  return (
    <section className={`section-pad ${bg}`}>
      <Reveal className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
        <h2 className={`text-[clamp(1.6rem,3vw,2.4rem)] ${titleColor}`}>{title}</h2>
        <p className={`text-[0.98rem] leading-[1.8] ${subColor}`}>{sub}</p>
        <Button href="/contact" variant="filled" tone={tone}>
          Talk to an Engineer →
        </Button>
      </Reveal>
    </section>
  );
}
