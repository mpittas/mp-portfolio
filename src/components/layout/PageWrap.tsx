import Image from "next/image";
import Link from "next/link";

interface PageWrapProps {
  children: React.ReactNode;
}

export default function PageWrap({ children }: PageWrapProps) {
  return (
    <>
      <div className="pagewrap py-12">
        <div className="container">{children}</div>
      </div>
    </>
  );
}
