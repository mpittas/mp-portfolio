import HeroSection from "../sections/HeroSection"
import ProjectsSection from "../sections/ProjectSection"
import HelloText from "@/components/sections/HelloText"
import TagSimulation from "@/components/anim/TagSimulation"

export default function MainView() {
  return (
    <div>
      <HelloText />
      <HeroSection />
      <ProjectsSection />
      <TagSimulation />
    </div>
  )
}
