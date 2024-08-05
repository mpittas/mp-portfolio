import React from "react";

interface TitleBigProps {
  children: React.ReactNode;
}

export default function TitleBig({ children }: TitleBigProps) {
  return (
    <div className="header">
      <h1 className="text-4xl md:text-[52px] text-neutral-600 dark:text-neutral-400/[0.9] font-medium font-clashdisplay leading-tight">
        {children}
      </h1>
    </div>
  );
}
