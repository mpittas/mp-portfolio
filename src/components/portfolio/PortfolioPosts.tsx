// components/PortfolioPostsItems.tsx
import Link from "next/link";
import { Badge } from "@/components/core/Badge";

type PortfolioPost = {
  metadata: {
    publishedAt: string;
    title: string;
    category: string;
    featuredImage: string;
  };
  slug: string;
};

type PortfolioPostsItemsProps = {
  allPortfolios: PortfolioPost[];
  onHover: (image: string) => void;
  onHoverLeave: () => void;
};

const PortfolioPostsItems = ({
  allPortfolios,
  onHover,
  onHoverLeave,
}: PortfolioPostsItemsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {allPortfolios.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-row justify-between items-center p-1 hover:bg-neutral-50 dark:hover:bg-neutral-950/[1] group rounded-md"
          href={`/portfolio/${post.slug}`}
          onMouseEnter={() => onHover(post.metadata.featuredImage)}
          onMouseLeave={onHoverLeave}
        >
          <div className="font-medium text-md sm:text-xl">
            {post.metadata.title}
          </div>
          <div className="tabular-nums flex items-center gap-x-4">
            <Badge title={post.metadata.category} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioPostsItems;
