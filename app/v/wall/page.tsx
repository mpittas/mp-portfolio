import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeWall } from "@/components/home/home-wall";
import { HomeSkills } from "@/components/home/home-skills";

export const metadata: Metadata = {
  title: "Work · Wall",
};

export default function WallHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeWall />
      <HomeSkills />
    </main>
  );
}
