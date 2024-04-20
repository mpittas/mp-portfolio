import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedCircle from "@/components/anim/AnimatedCircles"
import Image from "next/image"
import HackingText from "@/components/anim/HackingText"

export default function MainView() {
  return (
    <PageWrap className="overflow-hidden">
      <div className="max-w-xl py-16 pb-28 relative ">
        <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
        <div className="absolute top-[0%] right-[-70%]">
          <AnimatedCircle />
        </div>
      </div>

      <div className=" z-1 relative">
        <div className="flex items-center gap-x-4 pb-4">
          <div className=" uppercase font-bold text-neutral-400 dark:text-neutral-300">
            Latest projects
          </div>
          <Image
            src="/arrow-double-pixel.svg"
            width={8}
            height={8}
            alt="arrow-right"
            className="opacity-70"
          />
        </div>
        <PortfolioPosts />
      </div>
    </PageWrap>
  )
}
