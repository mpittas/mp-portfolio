import Link from "next/link"
import { formatDate } from "@/utils/utils"
import Badge from "@/components/core/Badge"

type PortfolioPostsItemsProps = {
  allPortfolios: {
    metadata: {
      publishedAt: string
      title: string
      category: string
    }
    slug: string
  }[]
}

const PortfolioPostsItems = ({ allPortfolios }: PortfolioPostsItemsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {allPortfolios.map((post) => (
        <Link
          key={post.slug}
          className="flex justify-between items-center py-1 px-2 space-y-1 bg-gray-200 hover:bg-gray-900 group rounded-md"
          href={`/portfolio/${post.slug}`}
        >
          <div className=" group-hover:text-neutral-100 flex items-center gap-x-2 tracking-tight">
            {post.metadata.title}
            <Badge title={post.metadata.category} />
          </div>
          <div className="group-hover:text-neutral-100 tabular-nums">
            {formatDate(post.metadata.publishedAt, false, true)}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PortfolioPostsItems
