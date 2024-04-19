interface BadgeProps {
  title?: string
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="badge py-1 px-2 rounded-md bg-gray-50 text-gray-950 text-sm font-bold">
      {title}
    </div>
  )
}
