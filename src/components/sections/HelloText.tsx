import Image from "next/image"
import TextScene from "@/components/anim/TextScene"

export default function HelloText() {
  return (
    <div className="h-[500px] mt-[-4rem] relative">
      <TextScene />
      <div className="absolute bottom-[15%] left-[50%] z-[1] mix-blend-difference select-none">
        <Image
          src="/images/click-me-hd.svg"
          width={110}
          height={20}
          alt="arrow-right"
          className="opacity-80"
        />
      </div>
    </div>
  )
}
