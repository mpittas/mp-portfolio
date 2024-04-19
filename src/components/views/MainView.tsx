import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "../layout/PageWrap"
import { PortfolioPosts } from "@/components/portfolio/PortfolioPosts"

export default function MainView() {
  return (
    <PageWrap>
      <div className="max-w-xl py-12 pb-24">
        <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
      </div>

      <PortfolioPosts />
    </PageWrap>
  )
}
