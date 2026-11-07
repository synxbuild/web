import { Header } from "@/components/layout/header";
import { SideIndex } from "@/components/layout/side-index";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Proof } from "@/components/sections/proof";
import { Expertise } from "@/components/sections/expertise";
import { Work } from "@/components/sections/work";
import { Control } from "@/components/sections/control";
import { Plans } from "@/components/sections/plans";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

/* Rhythm: dark → light → dark → light … closing on the electric section. */
export default function Home() {
  return (
    <>
      <Header />
      <SideIndex total={10} />
      <main>
        <Hero />
        <Problem />
        <Proof />
        <Expertise />
        <Work />
        <Control />
        <Plans />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
