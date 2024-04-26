interface TitleBigProps {
  title?: string;
}

export default function TitleBig({ title = "Title here" }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-2xl leading-tight md:text-[52px] font-medium">
        {title}
      </h1>
    </div>
  );
}
