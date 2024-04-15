import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"
import AnimatedComponent from "@/components/custom/AnimatedComponent"
import HoverImgFx4 from "../custom/ImageHover"

export default function MainView() {
  return (
    <PageWrap>
      <div className="max-w-xl mb-12">
        <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
      </div>

      <PortfolioPosts />

      <div className="pb-28">
        <HoverImgFx4 imgSrc="/posts/featured.jpg">
          <p>This is some child content.</p>
        </HoverImgFx4>
      </div>
    </PageWrap>
  )
}
