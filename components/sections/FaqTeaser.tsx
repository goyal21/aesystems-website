import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faq } from "@/content/faq";

const featured = faq.slice(0, 3);

export function FaqTeaser() {
  return (
    <section className="section-pad bg-white">
      <SectionHeading center eyebrow="FAQ" title="Common Questions" className="mx-auto mb-12" />
      <Reveal delay={0.1} className="mx-auto max-w-[760px]">
        <Accordion items={featured} />
      </Reveal>
      <div className="mt-10 flex justify-center">
        <Button href="/faq" variant="outline" tone="light">
          See All FAQs →
        </Button>
      </div>
    </section>
  );
}
