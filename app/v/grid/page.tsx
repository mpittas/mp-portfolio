import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeGrid } from "@/components/home/home-grid";
import { HomeLead } from "@/components/home/home-lead";
import { HomeSkills } from "@/components/home/home-skills";

export const metadata: Metadata = {
  title: "Work · Grid",
};

export default function GridHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeGrid />
      <HomeSkills />
    </main>
  );
}
