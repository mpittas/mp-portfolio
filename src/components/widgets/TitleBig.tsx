interface TitleBigProps {
  title?: string;
}

export default function TitleBig({ title = "Title here" }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-5xl">{title}</h1>
    </div>
  );
}
