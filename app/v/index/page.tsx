import type { Metadata } from "next";
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeIndex } from "@/components/home/home-index";
import { HomeLead } from "@/components/home/home-lead";

export const metadata: Metadata = {
  title: "Work · Index",
};

export default function IndexHome() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeIndex />
    </main>
  );
}
