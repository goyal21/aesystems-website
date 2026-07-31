import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const align = center ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "dark" ? "text-teal" : "text-teal-light";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-muted-dark" : "text-body-light";

  return (
    <div className={`flex flex-col gap-4 ${align} ${className}`}>
      <Reveal>
        <span className={`font-mono text-[1.36rem] font-semibold uppercase tracking-[0.14em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`${titleColor} text-[clamp(2.2rem,5vw,4rem)]`}
          style={{ maxWidth: center ? "780px" : undefined }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`${subColor} text-[0.98rem] leading-[1.8]`} style={{ maxWidth: center ? "620px" : "520px" }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
