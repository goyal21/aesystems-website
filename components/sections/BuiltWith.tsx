import { AppImage as Image } from "@/components/ui/AppImage";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function BuiltWith() {
  return (
    <section id="built-with" className="section-pad border-y border-ink/8 bg-white">
      <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-6 px-6 text-center">
        <span className="eyebrow text-teal-light">Technology &amp; Research Partners</span>

        <div className="flex items-center gap-8 sm:gap-11">
          <a
            href={site.saarUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SAAR — opens in a new tab"
            className="opacity-80 grayscale transition-opacity hover:opacity-100"
          >
            <Image src="/assets/saar-logo.png" alt="SAAR System Solutions" width={150} height={52} className="h-11 w-auto object-contain" />
          </a>
          <span className="h-8 w-px bg-ink/15" aria-hidden="true" />
          <Image
            src="/assets/iit-jammu-logo.png"
            alt="IIT Jammu"
            width={150}
            height={52}
            className="h-11 w-auto object-contain grayscale"
          />
        </div>

        <p className="text-[0.92rem] leading-relaxed text-body-light">
          SAAR is the AI platform behind every deployment, developed with IIT Jammu researchers.
          AE Systems is the authorised global partner bringing it to buildings across India.
        </p>
      </Reveal>
    </section>
  );
}
