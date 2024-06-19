import Link from "next/link";
import Image from "next/image";

interface ButtonProps {
  title?: string;
  className?: string;
  href?: string;
  variant?: "figma" | "adobexd" | "demo";
}

const getButtonStyles = (variant?: string): string => {
  switch (variant) {
    case "figma":
      return "bg-neutral-950 text-white flex items-center space-x-2 hover:bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-100";
    case "adobexd":
      return "bg-pink-900 text-white flex items-center space-x-2 hover:bg-pink-800";
    case "demo":
      return "bg-blue-900 text-white flex items-center space-x-2 hover:bg-blue-800";
    default:
      return "bg-neutral-900 text-neutral-200 dark:bg-neutral-700/[0.5] dark:text-neutral-200 hover:bg-neutral-950 dark:hover:bg-neutral-700/[0.8]";
  }
};

const getIcon = (variant?: string): JSX.Element | null => {
  switch (variant) {
    case "figma":
      return <Image src="/icons/figma.svg" width={16} height={5} alt="Figma" />;
    case "adobexd":
      return (
        <Image src="/icons/adobe-xd.svg" width={16} height={5} alt="Adobe XD" />
      );
    case "demo":
      return (
        <Image src="/icons/globe-white.svg" width={16} height={5} alt="Globe" />
      );
    default:
      return null;
  }
};

export default function Button({
  title,
  className,
  href,
  variant,
}: ButtonProps) {
  return (
    <Link
      href={href || "#"}
      target="_blank"
      className={`py-2 px-6 flex gap-x-2 font-medium rounded-md !no-underline ${getButtonStyles(
        variant
      )} ${className}`}
    >
      {getIcon(variant)}
      <span>{title}</span>
    </Link>
  );
}
