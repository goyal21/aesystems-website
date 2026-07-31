import type { Stat } from "@/content/stats";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function StatRow({ stats, tone = "dark" }: { stats: Stat[]; tone?: "dark" | "light" }) {
  const border = tone === "dark" ? "border-white/15" : "border-ink/10";
  const num = tone === "dark" ? "text-white" : "text-ink";
  const lbl = tone === "dark" ? "text-muted-dark" : "text-body-light";

  return (
    <RevealGroup className={`grid grid-cols-2 gap-x-6 gap-y-8 border-t ${border} pt-11 sm:grid-cols-4`}>
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="flex flex-col gap-1.5">
          <span className={`font-display text-3xl font-bold ${num}`}>{stat.value}</span>
          <span className={`eyebrow ${lbl}`}>{stat.label}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
