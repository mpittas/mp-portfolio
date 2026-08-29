import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeTape } from "@/components/home/home-tape";

export const metadata: Metadata = {
  title: "Work · Tape",
};

export default function TapeHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeTape />
    </main>
  );
}
