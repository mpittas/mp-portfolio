import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeTape } from "@/components/home/home-tape";
import { HomeSkills } from "@/components/home/home-skills";

export const metadata: Metadata = {
  title: "Work · Tape",
};

export default function TapeHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeTape />
      <HomeSkills />
    </main>
  );
}
