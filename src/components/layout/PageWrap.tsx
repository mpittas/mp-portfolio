interface PageWrapProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrap({children, className}: PageWrapProps) {
  return (
    <>
      <div className={`pagewrap pt-12 ${className}`}>
        <div className="container">{children}</div>
      </div>
    </>
  )
}
