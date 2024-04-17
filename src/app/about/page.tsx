import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"
import AsciiHolder from "@/components/ascii/AsciiHolder"

export default function MainPage() {
  return (
    <PageWrap>
      <div className="max-w-xl">
        <TitleBig title="About page" />
        <AsciiHolder />
      </div>
    </PageWrap>
  )
}
