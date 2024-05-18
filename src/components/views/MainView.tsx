import TitleBig from "@/components/widgets/TitleBig";
import PageWrap from "../layout/PageWrap";
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts";
import Image from "next/image";
import HelloText from "@/components/sections/HelloText";
import AnimatedCircles from "@/components/anim/AnimatedCircles";
import CodeErrorMsg from "../widgets/CodeErrorMsg";
import TagSimulation from "@/components/anim/TagSimulation";

export default function MainView() {
  return (
    <div>
      <HelloText />
      <PageWrap>
        <div className="relative pb-32">
          <div className="max-w-[700px] mx-auto text-center">
            <TitleBig title="I am a passionate front-end developer based in BG who also specializes in UI/UX" />
          </div>
        </div>
      </PageWrap>

      <div className="px-24 grid grid-cols-1 lg:grid-cols-12 gap-24 p-4">
        <div className="bg-neutral-300 dark:bg-neutral-950 min-h-[200px] col-span-12 lg:col-span-5">
          Column 1
        </div>
        <div className="bg-neutral-300 dark:bg-neutral-950 min-h-[200px] col-span-12 lg:col-span-7">
          <div className="flex items-center gap-x-2 pb-4">
            <div className="px-2 uppercase font-semibold text-neutral-400 dark:text-neutral-600">
              Latest projects
            </div>
            <div className="mix-blend-difference">
              <Image
                src="/images/arrow-double-pixel.svg"
                width={8}
                height={8}
                alt="arrow-right"
                className="opacity-40 relative top-[-2px]"
              />
            </div>
          </div>
          <PortfolioPosts />
        </div>
      </div>
      <TagSimulation />
      {/* <div className="absolute top-[-5%] right-[0%]">
        <AnimatedCircles />
      </div> */}
    </div>
  );
}
