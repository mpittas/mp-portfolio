import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import Image from "next/image"
import TextScene from "@/components/anim/TextScene"
import TagSimulation from "@/components/anim/TagSimulation"
import TagSimulationOld from "@/components/anim/TagSimulationOld"

export default function MainView() {
  return (
    <div>
      <div className="h-[500px] mt-[-4rem] relative pb-16">
        <TextScene />
        <div className="absolute bottom-[15%] left-[50%] z-[1] mix-blend-difference select-none">
          <Image
            src="/images/click-me-hd.svg"
            width={130}
            height={20}
            alt="arrow-right"
            className="opacity-80"
          />
        </div>
      </div>
      <PageWrap>
        <div className="max-w-3xl mx-auto text-center mt-[-8rem] py-16 pb-28 relative ">
          <TitleBig title="I am a passionate front-end developer based in BG who also specializes in UI/UX" />
        </div>

        <div className=" z-1 relative pb-4">
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
      <TagSimulation />
      {/* <TagSimulation /> */}

      {/* <div className="h-[100vh]"></div> */}
    </div>
  )
}
