import Link from "next/link";

interface ButtonProps {
  title?: string;
  className?: string;
  href?: string;
}

export default function Button({ title, className, href }: ButtonProps) {
  return (
    <Link
      href={href || "#"}
      target="_blank"
      className={`py-2 px-6 inline-block font-medium rounded-md bg-neutral-900 text-neutral-200 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-950 !no-underline ${className}`}
    >
      {title}
    </Link>
  );
}
