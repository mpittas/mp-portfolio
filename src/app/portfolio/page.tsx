import ClientProjectSection from "@/components/sections/ClientProjectSection";
import TitleBig from "@/components/widgets/TitleBig";
import PageWrap from "@/components/layout/PageWrap";
import { getPortfolioPosts } from "@/utils/utils";

export const metadata = {
  title: "My Portfolio",
  description: "Take a look at my projects.",
};

export default function Page() {
  const allPortfolios = getPortfolioPosts();

  return (
    <PageWrap>
      <section>
        <div className="pb-8">
          <TitleBig>Portfolio</TitleBig>
        </div>
        <ClientProjectSection allPortfolios={allPortfolios} />
      </section>
    </PageWrap>
  );
}
