import { Hero } from "@/components/sections/Hero";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { Industries } from "@/components/sections/Industries";
import { Platform } from "@/components/sections/Platform";
import { SeeItInAction } from "@/components/sections/SeeItInAction";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyAeSystems } from "@/components/sections/WhyAeSystems";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <BuiltWith />
      <Industries />
      <Platform />
      <SeeItInAction />
      <CaseStudies />
      <WhyAeSystems />
      <GetInTouch />
      <Faq />
    </main>
  );
}
