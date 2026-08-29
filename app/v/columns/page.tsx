/*
THESIS: Work is read as three ruled columns with staggered stacks, not a card grid of equal thumbs.
OWN-WORLD: Grayboard, ink, spec labels, hairline gutters; stills as slightly rounded plates in this variant only.
STORY: A hiring visitor scans three cases at once, then opens one.
FIRST VIEWPORT: Layout switch + intro + first triptych of three catalog entries.
FORM: Ruled three-column stagger cycling copy/still, still/copy, and title/still.
*/
import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeColumns } from "@/components/home/home-columns";
import { HomeLead } from "@/components/home/home-lead";

export const metadata: Metadata = {
  title: "Work · Columns",
};

export default function ColumnsHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeColumns />
    </main>
  );
}
