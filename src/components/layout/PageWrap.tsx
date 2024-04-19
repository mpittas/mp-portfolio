import Image from "next/image"
import Link from "next/link"

interface PageWrapProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrap({ children, className }: PageWrapProps) {
  return (
    <>
      <div className={`pagewrap py-12 ${className}`}>
        <div className="container">{children}</div>
      </div>
    </>
  )
}
