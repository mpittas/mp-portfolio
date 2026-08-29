/*
THESIS: Work leads at reading distance; the interface stays a black field, not a decorated hero.
OWN-WORLD: Near-black board, light ink, hairline rules; no yellow marks, no SVG banner.
STORY: A visitor scans the catalog, opens a case, and can reach Marios.
FIRST VIEWPORT: Layout switch, intro, then the project list.
FORM: List catalog on a neutral black field.
*/
import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeList } from "@/components/home/home-list";

export const metadata: Metadata = {
  title: "Work · List",
};

export default function ListHome() {
  return (
    <main className="pb-24 md:pb-36">
      <HomeChrome />
      <HomeLead />
      <HomeList />
    </main>
  );
}
