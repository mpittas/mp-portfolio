/*
THESIS: Work leads at reading distance; the interface stays a black field, not a decorated hero.
OWN-WORLD: Near-black board, light ink, hairline rules; no yellow marks, no SVG banner.
STORY: A visitor scans the catalog, opens a case, and can reach Marios.
FIRST VIEWPORT: Layout switch, intro, then the project catalog.
FORM: List below lg; Index on desktop (default).
*/
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeIndex } from "@/components/home/home-index";
import { HomeLead } from "@/components/home/home-lead";
import { HomeList } from "@/components/home/home-list";
import { HomeSkills } from "@/components/home/home-skills";

export default function Home() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <div className="lg:hidden">
        <HomeList />
      </div>
      <div className="hidden lg:block">
        <HomeIndex />
      </div>
      <HomeSkills />
    </main>
  );
}
