import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomePlates } from "@/components/home/home-plates";

export const metadata: Metadata = {
  title: "Work · Plates",
};

export default function PlatesHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomePlates />
    </main>
  );
}
