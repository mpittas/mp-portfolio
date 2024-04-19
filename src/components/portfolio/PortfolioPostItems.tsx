import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/utils/utils"
import Badge from "@/components/core/Badge"

type PortfolioPostsItemsProps = {
  allPortfolios: {
    metadata: {
      publishedAt: string
      title: string
      category: string
      featuredImage: string
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
          className="flex justify-between items-center py-1 px-2 space-y-1 bg-gray-200 group rounded-md"
          href={`/portfolio/${post.slug}`}
        >
          <div className="flex items-center gap-x-2 tracking-tight">
            {post.metadata.title}
            <Badge title={post.metadata.category} />
          </div>
          <div className="tabular-nums flex items-center gap-x-4">
            {formatDate(post.metadata.publishedAt, false, true)}
            {/* <img
              src={`/${post.metadata.featuredImage}`} // Add a leading slash to the src attribute
              alt={post.metadata.title}
              width={20}
            /> */}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PortfolioPostsItems
