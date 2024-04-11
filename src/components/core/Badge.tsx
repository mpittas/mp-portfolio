interface BadgeProps {
  title?: string
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="badge p-1 rounded-md bg-gray-300 text-gray-950 text-xs font-bold">
      {title}
    </div>
  )
}
