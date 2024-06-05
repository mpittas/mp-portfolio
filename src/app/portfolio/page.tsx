import PortfolioPosts from "@/components/portfolio/PortfolioPosts"
import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"

export const metadata = {
  title: "My Portfolio",
  description: "Take a look at my projects.",
}

export default function Page() {
  return (
    <PageWrap>
      <section>
        <div className="pb-8">
          <TitleBig title="Portfolio" />
        </div>
        <PortfolioPosts
          allPortfolios={[]}
          onHover={() => {}}
          onMouseLeave={() => {}}
        />
      </section>
    </PageWrap>
  )
}
