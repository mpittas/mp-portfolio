import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"
import ShoeWrap from "@/components/threede/ShoeWrap"

export default function MainPage() {
  return (
    <>
      <PageWrap>
        <div className="max-w-xl">
          <TitleBig title="About page" />
        </div>
      </PageWrap>
      <div className="w-[100vw] h-[100vh]">
        <ShoeWrap />
      </div>
    </>
  )
}
