import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeWall } from "@/components/home/home-wall";

export const metadata: Metadata = {
  title: "Work · Wall",
};

export default function WallHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeWall />
    </main>
  );
}
