/*
THESIS: The homepage is a quiet index: name, one line of intro, then the work as a plain list.
FIRST VIEWPORT: Name, intro and the first projects, with no images to scan past.
STORY: A recruiter reads the role, scans the list, opens a case, or goes to contact.
FORM: Minimal list on a neutral black field. The image index lives at /v/index.
*/
import { HomeChrome } from "@/components/home/home-chrome";
import { HomeMinimal } from "@/components/home/home-minimal";

export default function Home() {
  return (
    <>
      <HomeChrome />
      <HomeMinimal />
    </>
  );
}
