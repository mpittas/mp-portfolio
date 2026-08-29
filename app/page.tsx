/*
THESIS: Work leads at reading distance; the interface stays a black field, not a decorated hero.
OWN-WORLD: Near-black board, light ink, hairline rules; no yellow marks, no SVG banner.
STORY: A visitor scans the catalog, opens a case, and can reach Marios.
FIRST VIEWPORT: Intro, then the project list.
FORM: List catalog on a neutral black field.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
*/
import { HomeLead } from "@/components/home/home-lead";
import { HomeList } from "@/components/home/home-list";

export default function Home() {
  return (
    <main>
      <HomeLead />
      <HomeList />
    </main>
  );
}
