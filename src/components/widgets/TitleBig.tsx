interface TitleBigProps {
  title?: string
}

export default function TitleBig({title = "Title here"}: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-3xl md:text-[52px] text-neutral-950 dark:text-neutral-200/[0.9] font-medium font-clashdisplay leading-tight">
        {title}
      </h1>
    </div>
  )
}
