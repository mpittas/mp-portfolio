import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"
import AnimatedCircles from "@/components/anim/AnimatedCircles"

export default function MainPage() {
  return (
    <PageWrap>
      <div className="max-w-xl">
        <TitleBig title="About page" />
        <AnimatedCircles />
      </div>
    </PageWrap>
  )
}
