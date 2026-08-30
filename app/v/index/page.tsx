/*
THESIS: Work leads at reading distance; the interface stays a black field, not a decorated hero.
OWN-WORLD: Near-black board, light ink, hairline rules; no yellow marks, no SVG banner.
STORY: A visitor scans the catalog, opens a case, and can reach Marios.
FIRST VIEWPORT: Layout switch, intro, then the project index.
FORM: Index catalog on a neutral black field.
*/
import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeIndex } from "@/components/home/home-index";
import { HomeLead } from "@/components/home/home-lead";
import { HomeSkills } from "@/components/home/home-skills";

export const metadata: Metadata = {
  title: "Work · Index",
};

export default function IndexHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeIndex />
      <HomeSkills />
    </main>
  );
}
