import Link from "next/link"

interface ButtonProps {
  title?: string
  className?: string
  href?: string
}

export default function Button({ title, className, href }: ButtonProps) {
  return (
    <Link
      href={href || "#"}
      target="_blank"
      className={`py-2 px-6 inline-block font-medium rounded-md bg-neutral-900 text-neutral-200 dark:bg-neutral-700/[0.5] dark:text-neutral-200 hover:bg-neutral-950 dark:hover:bg-neutral-700/[0.8] !no-underline ${className}`}
    >
      {title}
    </Link>
  )
}
