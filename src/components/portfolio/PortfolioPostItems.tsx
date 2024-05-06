import Link from "next/link";
import { formatDate } from "@/utils/utils";
import Badge from "@/components/core/Badge";

type PortfolioPostsItemsProps = {
  allPortfolios: {
    metadata: {
      publishedAt: string;
      title: string;
      category: string;
      featuredImage: string;
    };
    slug: string;
  }[];
};

const PortfolioPostsItems = ({ allPortfolios }: PortfolioPostsItemsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {allPortfolios.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col sm:flex-row justify-start sm:justify-between items-center p-1 hover:bg-neutral-100/[0.6] dark:hover:bg-neutral-800 group rounded-md"
          href={`/portfolio/${post.slug}`}
        >
          <div className=" text-xl">{post.metadata.title}</div>
          <div className="tabular-nums flex items-center gap-x-4">
            <Badge title={post.metadata.category} />
            {formatDate(post.metadata.publishedAt, false, true)}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioPostsItems;
