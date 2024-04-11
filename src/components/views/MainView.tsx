import TitleBig from "@/components/widgets/TitleBig";
import { PortfolioPosts } from "@/components/content/PortfolioPosts";

export default function MainView() {
  return (
    <div className="bg-orange-200 py-16">
      <div className="container">
        <div className="max-w-xl mb-12">
          <TitleBig title="Passionate front-end developer that also specializes in UI/UX." />
        </div>

        <PortfolioPosts />
      </div>
    </div>
  );
}
