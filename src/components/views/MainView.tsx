import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import {PortfolioPosts} from "@/components/portfolio/PortfolioPosts"
import Image from "next/image"
import TextScene from "@/components/anim/TextScene"

export default function MainView() {
  return (
    <div>
      <div className="h-[600px] relative mt-[-5rem]">
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
          {/* <div className="absolute top-[0%] right-[-70%]">
            <AnimatedCircle />
          </div>  */}
        </div>

        <div className=" z-1 relative">
          <div className="flex items-center gap-x-4 pb-4">
            <div className="uppercase font-bold text-neutral-700 dark:text-neutral-500">
              Latest projects
            </div>
            <div className="mix-blend-difference">
              <Image
                src="/images/arrow-double-pixel.svg"
                width={8}
                height={8}
                alt="arrow-right"
                className="opacity-70"
              />
            </div>
          </div>
          <PortfolioPosts />
        </div>
      </PageWrap>
    </div>
  )
}
