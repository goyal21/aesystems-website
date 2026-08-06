import { Hero } from "@/components/sections/Hero";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { PlatformTeaser } from "@/components/sections/PlatformTeaser";
import { SeeItInAction } from "@/components/sections/SeeItInAction";
import { CaseStudiesTeaser } from "@/components/sections/CaseStudiesTeaser";
import { WhyAeSystems } from "@/components/sections/WhyAeSystems";
import { GetInTouch } from "@/components/sections/GetInTouch";
import { FaqTeaser } from "@/components/sections/FaqTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <BuiltWith />
      <IndustriesTeaser />
      <PlatformTeaser />
      <SeeItInAction />
      <CaseStudiesTeaser />
      <WhyAeSystems />
      <GetInTouch />
      <FaqTeaser />
    </main>
  );
}
