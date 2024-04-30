import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import Image from "next/image"
import AnimatedCircles from "@/components/anim/AnimatedCircles"
import TagSimulation from "@/components/anim/TagSimulation"
import TagSimulationOld from "@/components/anim/TagSimulationOld"

export default function MainView() {
  return (
    <div>
      {/* <HelloText /> */}
      <PageWrap>
        <div className="relative pb-32">
          <div className="max-w-[500px]">
            <TitleBig title="I am a passionate front-end developer based in BG who also specializes in UI/UX" />
          </div>

          <div className="absolute top-[6%] right-[-15%]">
            <AnimatedCircles />
          </div>
        </div>

        <div className=" z-1 relative pb-32">
          <div className="flex items-center gap-x-2 pb-2">
            <div className="px-2 uppercase font-semibold text-neutral-700 dark:text-neutral-500 text-sm">
              Latest projects
            </div>
            <div className="mix-blend-difference">
              <Image
                src="/images/arrow-double-pixel.svg"
                width={6}
                height={6}
                alt="arrow-right"
                className="opacity-50"
              />
            </div>
          </div>
          <PortfolioPosts />
        </div>
      </PageWrap>
      {/* <TagSimulation /> */}
      {/* <TagSimulation /> */}
    </div>
  )
}
