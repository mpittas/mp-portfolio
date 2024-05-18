interface BadgeProps {
  title?: string;
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="badge px-2 rounded-md bg-neutral-100/[1] dark:bg-neutral-950/[0.9] text-neutral-800 dark:text-neutral-300 font-medium">
      {title}
    </div>
  );
}
