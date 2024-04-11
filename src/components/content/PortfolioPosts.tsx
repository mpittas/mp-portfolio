import Link from "next/link";
import { formatDate, getPortfolioPosts } from "@/utils/utils";

export function PortfolioPosts() {
  let allPortfolios = getPortfolioPosts();

  return (
    <div className="flex flex-col gap-y-2">
      {allPortfolios
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col py-1 px-2 space-y-1 bg-orange-300 rounded-md "
            href={`/portfolio/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row justify-start md:justify-between space-x-0 md:space-x-2">
              <div className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 tabular-nums">
                {formatDate(post.metadata.publishedAt, false, true)}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
