import { notFound } from "next/navigation"
import { CustomMDX } from "@/components/custom/Mdx"
import { formatDate, getPortfolioPosts } from "@/utils/utils"
import { baseUrl } from "@/seo/sitemap"
import PageWrap from "@/components/layout/PageWrap"

export async function generateStaticParams() {
  let posts = getPortfolioPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getPortfolioPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    category,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/portfolio/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Portfolio({ params }) {
  let post = getPortfolioPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <PageWrap>
      <section className="pt-8">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PortfolioPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              category: post.metadata.category,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/portfolio/${post.slug}`,
              author: {
                "@type": "Person",
                name: "My Portfolio",
              },
            }),
          }}
        />
        <img
          src={`/${post.metadata.featuredImage}`}
          alt={post.metadata.title}
        />
        <h1 className="title font-semibold text-3xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm text-neutral-400">
          <p className="text-sm ">{formatDate(post.metadata.publishedAt)}</p>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </section>
    </PageWrap>
  )
}
