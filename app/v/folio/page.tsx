import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeFolio } from "@/components/home/home-folio";

export const metadata: Metadata = {
  title: "Work · Folio",
};

export default function FolioHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeFolio />
    </main>
  );
}
