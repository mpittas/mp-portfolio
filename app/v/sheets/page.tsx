import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeLead } from "@/components/home/home-lead";
import { HomeSheets } from "@/components/home/home-sheets";

export const metadata: Metadata = {
  title: "Work · Sheets",
};

export default function SheetsHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeSheets />
    </main>
  );
}
