import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedCircle from "@/components/anim/AnimatedCircles"

export default function MainView() {
  return (
    <PageWrap className="overflow-hidden">
      <div className="max-w-xl py-16 pb-28 relative ">
        <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
      </div>

      <div className=" z-1 relative">
        <PortfolioPosts />
      </div>
    </PageWrap>
  )
}
