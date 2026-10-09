/*
THESIS: The homepage is a quiet index: name, one line of intro, then the work as a plain list.
FIRST VIEWPORT: Name, intro and the first projects, with no images to scan past.
STORY: A recruiter reads the role, scans the list, opens a case, or goes to contact.
FORM: Index catalog on a neutral black field. The columns view lives at /v/columns.
*/
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeIndex } from "@/components/home/home-index";
import { HomeLead } from "@/components/home/home-lead";
import { HomeSkills } from "@/components/home/home-skills";

export default function Home() {
  return (
    <main>
      <HomeChrome />
      <HomeLead />
      <HomeIndex />
      <HomeSkills />
    </main>
  );
}
