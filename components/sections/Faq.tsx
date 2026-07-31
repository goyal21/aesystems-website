import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/faq";
import { faqPageJsonLd } from "@/lib/structuredData";

export function Faq() {
  return (
    <section id="faq" className="section-pad bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
      />
      <SectionHeading center eyebrow="FAQ" title="Common Questions" className="mx-auto mb-12" />
      <Reveal delay={0.1} className="mx-auto max-w-[760px]">
        <Accordion items={faq} />
      </Reveal>
    </section>
  );
}
