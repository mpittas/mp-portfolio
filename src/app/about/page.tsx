import TitleBig from "@/components/widgets/TitleBig"
import PageWrap from "@/components/layout/PageWrap"
import BoundUi from "@/components/scenes/BoundUi"
import { BunnyWrap } from "@/components/scenes/BunnyWrap"

export default function MainPage() {
  return (
    <div>
      <div className="h-screen w-screen">
        <BunnyWrap />
      </div>
      <PageWrap>
        <div className="max-w-xl">
          <TitleBig title="About page 2" />

          {/* <TestOne /> */}
          {/* <BoundUi /> */}
        </div>
      </PageWrap>
    </div>
  )
}
