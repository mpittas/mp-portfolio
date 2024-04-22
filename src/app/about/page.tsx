import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"
import TextScene from "@/components/scenes/TextScene"

export default function MainPage() {
  return (
    <PageWrap>
      <div className="max-w-xl">
        <TitleBig title="About page" />
        <TextScene />
      </div>
    </PageWrap>
  )
}
