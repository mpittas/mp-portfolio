import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import {
  Capabilities,
  ClosingCta,
  Experience,
  OtherWork,
  Process,
} from "@/components/home/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Capabilities />
      <Process />
      <Experience />
      <OtherWork />
      <ClosingCta />
    </main>
  );
}
