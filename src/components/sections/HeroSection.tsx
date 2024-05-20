import TitleBig from "@/components/widgets/TitleBig";
import PageWrap from "@/components/layout/PageWrap";

const HeroSection = () => {
  return (
    <PageWrap>
      <div className="relative pb-32">
        <div className="max-w-[700px] mx-auto text-center">
          <TitleBig title="I am a passionate front-end developer based in BG who also specializes in UI/UX" />
        </div>
      </div>
    </PageWrap>
  );
};

export default HeroSection;
