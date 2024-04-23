interface BadgeProps {
  title?: string
}

export default function Badge({title}: BadgeProps) {
  return (
    <div className="badge py-1 px-2 rounded-md bg-neutral-400/[0.3] dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-sm font-bold">
      {title}
    </div>
  )
}
