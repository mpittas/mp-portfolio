interface TitleBigProps {
  title?: string
}

export default function TitleBig({ title = "Title here" }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-2xl md:text-4xl leading-tight">{title}</h1>
    </div>
  )
}
