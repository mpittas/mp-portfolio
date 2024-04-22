import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedCircle from "@/components/anim/AnimatedCircles"
import Image from "next/image"
import Iframe from "react-iframe"
import TextScene from "@/components/scenes/TextScene"

export default function MainView() {
  return (
    <div>
      <div className="h-[50vh]">
        <TextScene />
      </div>
      <PageWrap>
        <div className="max-w-3xl mx-auto text-center mt-[-6rem] py-16 pb-28 relative ">
          <TitleBig title="I am a passionate front-end developer that also specializes in UI/UX based in BG." />
          <div className="absolute top-[-40px] right-[30%]">
            <Image
              src="/click-me-hd.svg"
              width={120}
              height={80}
              alt="arrow-right"
              className="opacity-30"
            />
          </div>
          {/* <div className="absolute top-[0%] right-[-70%]">
            <AnimatedCircle />
          </div>  */}
        </div>

        <div className=" z-1 relative">
          <div className="flex items-center gap-x-4 pb-4">
            <div className="uppercase font-bold text-neutral-400 dark:text-neutral-300">
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
    </div>
  )
}
