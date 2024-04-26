interface TitleBigProps {
  title?: string;
}

export default function TitleBig({ title = "Title here" }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-2xl leading-snug md:text-[42px] font-medium font-clashdisplay">
        {title}
      </h1>
    </div>
  );
}
