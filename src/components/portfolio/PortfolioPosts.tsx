import Link from "next/link"
import { getPortfolioPosts } from "@/utils/utils"
import Badge from "@/components/core/Badge"

type PortfolioPost = {
  metadata: {
    publishedAt: string
    title: string
    category: string
    featuredImage: string
  }
  slug: string
}

const PortfolioPostsItems = ({
  allPortfolios,
}: {
  allPortfolios: PortfolioPost[]
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {allPortfolios.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-row justify-between items-center p-1 hover:bg-neutral-50/[0.5] dark:hover:bg-neutral-950/[1] group rounded-md"
          href={`/portfolio/${post.slug}`}
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
  )
}

const PortfolioPosts = () => {
  const allPortfolios = getPortfolioPosts()

  return <PortfolioPostsItems allPortfolios={allPortfolios} />
}

export default PortfolioPosts
export { getPortfolioPosts }
