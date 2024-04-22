import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedCircle from "@/components/anim/AnimatedCircles"
import Image from "next/image"
import Iframe from "react-iframe"
import TestOne from "@/components/scenes/TestOne"
import { BunnyWrap } from "@/components/scenes/BunnyWrap"

export default function MainView() {
  return (
    <PageWrap className="overflow-hidden">
      <div className="max-w-xl py-[6rem] pb-[6rem] relative ">
        <div className="absolute top-[0%] right-[-70%]">
          {/* <AnimatedCircle /> */}
          <div className=" w-[100vw] h-[100vh] fixed top-[-12%] right-[-18%]">
            {/* <TestOne /> */}
            <BunnyWrap />
          </div>
        </div>
        <div className="relative mix-blend-color-dodge	">
          <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
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
