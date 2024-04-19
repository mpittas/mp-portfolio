interface BadgeProps {
  title?: string
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="badge py-1 px-2 rounded-md bg-neutral-600 dark:bg-red-800 text-neutral-300 dark:text-red-100 text-sm font-bold">
      {title}
    </div>
  )
}
