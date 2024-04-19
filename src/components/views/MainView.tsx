import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedCircle from "@/components/anim/AnimatedCircles"

export default function MainView() {
  return (
    <PageWrap>
      <div className="max-w-xl py-12 pb-24 relative">
        <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
        <div className="absolute top-[-40%] right-[-60%]">
          <AnimatedCircle />
        </div>
      </div>

      <PortfolioPosts />
    </PageWrap>
  )
}
