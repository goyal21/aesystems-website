"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { buildingTypeOptions } from "@/content/contact";

const CLIMATE_OPTIONS = [
  { value: "hot_humid", label: "Hot & Humid (coastal / tropical)", adj: 2 },
  { value: "composite", label: "Composite (most of North India)", adj: 1 },
  { value: "hot_dry", label: "Hot & Dry", adj: 0 },
  { value: "temperate", label: "Temperate (e.g. Bengaluru, Pune)", adj: -1 },
  { value: "cold_hill", label: "Cold / Hill Station", adj: -2 },
] as const;

const VFD_OPTIONS = [
  { value: "none", label: "No VFDs installed", adj: 3 },
  { value: "fixed", label: "VFDs installed, running at fixed speed", adj: 0 },
  { value: "optimised", label: "VFDs installed and already actively controlled", adj: null },
] as const;

type ClimateValue = (typeof CLIMATE_OPTIONS)[number]["value"];
type VfdValue = (typeof VFD_OPTIONS)[number]["value"];

interface Inputs {
  tonnage: string;
  hoursPerDay: string;
  daysPerYear: string;
  tariff: string;
  kwPerTr: string;
  climate: ClimateValue;
  vfd: VfdValue;
  industry: string;
}

interface Result {
  annualKwh: number;
  annualCost: number;
  savingsPct: number | null;
  savingsKwh: number;
  savingsCost: number;
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function calculate(inputs: Inputs): Result | null {
  const tonnage = Number(inputs.tonnage);
  const hoursPerDay = Number(inputs.hoursPerDay);
  const daysPerYear = Number(inputs.daysPerYear);
  const tariff = Number(inputs.tariff);
  const kwPerTr = Number(inputs.kwPerTr);

  if (![tonnage, hoursPerDay, daysPerYear, tariff, kwPerTr].every((n) => Number.isFinite(n) && n > 0)) {
    return null;
  }

  const annualKwh = tonnage * kwPerTr * hoursPerDay * daysPerYear;
  const annualCost = annualKwh * tariff;

  const vfd = VFD_OPTIONS.find((v) => v.value === inputs.vfd);
  if (!vfd || vfd.adj === null) {
    // Already actively controlled - no numeric estimate, handled by caller.
    return { annualKwh, annualCost, savingsPct: null, savingsKwh: 0, savingsCost: 0 };
  }

  const climate = CLIMATE_OPTIONS.find((c) => c.value === inputs.climate);
  const climateAdj = climate?.adj ?? 0;

  // Base is the midpoint of the 20-30% range already published across the
  // site (FAQ, platform pages, IIT Jammu case study). Adjustments move
  // within that same published range, never outside it - see the SEO
  // guardrail against inventing new figures.
  const rawPct = 25 + vfd.adj + climateAdj;
  const savingsPct = Math.min(30, Math.max(20, rawPct));

  const savingsKwh = annualKwh * (savingsPct / 100);
  const savingsCost = savingsKwh * tariff;

  return { annualKwh, annualCost, savingsPct, savingsKwh, savingsCost };
}

const fieldClass =
  "rounded-[var(--radius-control)] border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-teal-light";
const labelClass = "eyebrow text-body-light/80";

export function SavingsCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    tonnage: "",
    hoursPerDay: "10",
    daysPerYear: "300",
    tariff: "9",
    kwPerTr: "1.0",
    climate: "composite",
    vfd: "fixed",
    industry: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const result = useMemo(() => calculate(inputs), [inputs]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function handleCalculate(event: FormEvent) {
    event.preventDefault();
    setShowResult(true);
  }

  async function handleEmailResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;
    setEmailStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("_subject", `HVAC Savings Calculator result for ${data.get("email")}`);
    data.append("industry", inputs.industry || "Not specified");
    data.append("climate", CLIMATE_OPTIONS.find((c) => c.value === inputs.climate)?.label ?? "");
    data.append("vfd_status", VFD_OPTIONS.find((v) => v.value === inputs.vfd)?.label ?? "");
    data.append("tonnage_tr", inputs.tonnage);
    data.append(
      "estimated_result",
      result.savingsPct !== null
        ? `${result.savingsPct}% savings, ~${inr.format(result.savingsKwh)} kWh / ₹${inr.format(result.savingsCost)} per year`
        : "Already actively controlled - no numeric estimate shown"
    );

    try {
      const res = await fetch("https://formspree.io/f/xqedogwg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setEmailStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setEmailStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-7">
        <form onSubmit={handleCalculate} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="calc-tonnage" className={labelClass}>Total HVAC Load (TR) *</label>
              <input
                id="calc-tonnage"
                type="number"
                min="1"
                step="1"
                required
                placeholder="e.g. 500"
                value={inputs.tonnage}
                onChange={(e) => update("tonnage", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="calc-kwtr" className={labelClass}>Current kW/TR *</label>
              <input
                id="calc-kwtr"
                type="number"
                min="0.1"
                step="0.05"
                required
                value={inputs.kwPerTr}
                onChange={(e) => update("kwPerTr", e.target.value)}
                className={fieldClass}
              />
              <span className="text-[0.72rem] text-body-light/70">Typical non-optimised plants run 0.8–1.2 kW/TR.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="calc-hours" className={labelClass}>Daily Run Hours *</label>
              <input
                id="calc-hours"
                type="number"
                min="1"
                max="24"
                step="1"
                required
                value={inputs.hoursPerDay}
                onChange={(e) => update("hoursPerDay", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="calc-days" className={labelClass}>Operating Days / Year *</label>
              <input
                id="calc-days"
                type="number"
                min="1"
                max="366"
                step="1"
                required
                value={inputs.daysPerYear}
                onChange={(e) => update("daysPerYear", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="calc-tariff" className={labelClass}>Electricity Tariff (₹/kWh) *</label>
            <input
              id="calc-tariff"
              type="number"
              min="0.1"
              step="0.1"
              required
              value={inputs.tariff}
              onChange={(e) => update("tariff", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="calc-climate" className={labelClass}>Site Climate</label>
            <select
              id="calc-climate"
              value={inputs.climate}
              onChange={(e) => update("climate", e.target.value as ClimateValue)}
              className={fieldClass}
            >
              {CLIMATE_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="calc-vfd" className={labelClass}>Current VFD Status</label>
            <select
              id="calc-vfd"
              value={inputs.vfd}
              onChange={(e) => update("vfd", e.target.value as VfdValue)}
              className={fieldClass}
            >
              {VFD_OPTIONS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="calc-industry" className={labelClass}>Industry (optional)</label>
            <select
              id="calc-industry"
              value={inputs.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              {buildingTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-[999px] bg-teal-light px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Calculate Savings
          </button>
        </form>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col gap-5">
        {!showResult || !result ? (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-ink/15 p-8 text-center">
            <p className="text-sm text-body-light">Fill in your plant details and click Calculate to see an estimate.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-ink p-7">
            <div>
              <span className="eyebrow text-white/50">Estimated Current Annual Spend</span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                ₹{inr.format(result.annualCost)}
                <span className="ml-2 text-sm font-normal text-white/50">({inr.format(result.annualKwh)} kWh)</span>
              </p>
            </div>

            {result.savingsPct === null ? (
              <div className="rounded-[var(--radius-control)] border border-white/15 bg-white/[0.04] p-4">
                <p className="text-sm leading-relaxed text-white/80">
                  If your VFDs are already actively controlled, you may already be capturing much
                  of the achievable range. A site assessment is the only reliable way to size any
                  remaining opportunity — the numbers here would just be a guess.
                </p>
              </div>
            ) : (
              <>
                <div className="border-t border-white/10 pt-5">
                  <span className="eyebrow text-teal">Estimated Annual Savings</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold leading-none text-teal-light">
                      {result.savingsPct}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    ~{inr.format(result.savingsKwh)} kWh, or ~₹{inr.format(result.savingsCost)} per year
                  </p>
                </div>

                <form onSubmit={handleEmailResult} className="flex flex-col gap-2 border-t border-white/10 pt-5">
                  {emailStatus === "sent" ? (
                    <p className="text-sm text-teal-light">Sent — check your inbox.</p>
                  ) : (
                    <>
                      <label htmlFor="calc-email" className="eyebrow text-white/50">
                        Email me this result (optional)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="calc-email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          className="flex-1 rounded-[var(--radius-control)] border border-white/15 bg-ink px-3.5 py-2.5 text-sm text-white outline-none focus-visible:border-teal"
                        />
                        <button
                          type="submit"
                          disabled={emailStatus === "sending"}
                          className="shrink-0 rounded-[999px] border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-teal hover:text-teal disabled:opacity-60"
                        >
                          {emailStatus === "sending" ? "Sending…" : "Send"}
                        </button>
                      </div>
                      {emailStatus === "error" && (
                        <p className="text-xs text-red-400">Something went wrong — email {site.email} directly instead.</p>
                      )}
                    </>
                  )}
                </form>
              </>
            )}
          </div>
        )}

        <p className="text-[0.78rem] leading-relaxed text-body-light/70">
          These figures are indicative estimates, not a guarantee. Actual savings depend on your
          baseline equipment, occupancy pattern and current control strategy — which is exactly
          what a pilot measures for your specific building. Deployments have delivered 20–30%
          HVAC energy savings, including a verified 25% result in the live campus deployment at
          IIT Jammu.
        </p>
      </Reveal>
    </div>
  );
}
