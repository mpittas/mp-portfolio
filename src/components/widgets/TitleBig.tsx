interface TitleBigProps {
  title?: string
}

export default function TitleBig({ title = "Title here" }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="md:text-[50px] text-neutral-950 dark:text-neutral-200/[0.9] font-medium font-clashdisplay">
        {title}
      </h1>
    </div>
  )
}
