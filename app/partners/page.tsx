import type { Metadata } from "next";
import { PartnerHero } from "@/components/partners/PartnerHero";
import { WhyPartner } from "@/components/partners/WhyPartner";
import { PartnerJourney } from "@/components/partners/PartnerJourney";
import { ApplyForm } from "@/components/partners/ApplyForm";

export const metadata: Metadata = {
  title: "Partner with AE Systems | Channel Partner Programme India",
  description:
    "Join the AE Systems Partner Programme. Resell IIT Jammu-validated SAAR AI-BMS and HVAC optimisation solutions across India. Apply to become a channel partner today.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner with AE Systems | Channel Partner Programme India",
    description:
      "Resell IIT Jammu-validated SAAR AI-BMS and HVAC optimisation solutions across India. Attractive margins, protected territories, full support.",
    url: "/partners",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <main>
      <PartnerHero />
      <WhyPartner />
      <PartnerJourney />
      <ApplyForm />
    </main>
  );
}
