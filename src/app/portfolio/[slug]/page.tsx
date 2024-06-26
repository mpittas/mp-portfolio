import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/custom/Mdx";
import { formatDate, getPortfolioPosts } from "@/utils/utils";
import { baseUrl } from "@/seo/sitemap";
import PageWrap from "@/components/layout/PageWrap";
import Image from "next/image";

// Temp
export async function generateStaticParams() {
  let posts = getPortfolioPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getPortfolioPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    category,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

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
  };
}

export default function Portfolio({ params }) {
  let post = getPortfolioPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWrap>
      <section className="pb-14">
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
        {/* <div className="relative h-[300px] bg-neutral-700 mb-12 rounded-3xl overflow-hidden">
          <Image
            src={`/projects/${post.metadata.featuredImage}`}
            alt={post.metadata.title}
            fill={true}
            className="object-cover"
          />
        </div> */}
        <div className=" border-b-[1px] border-neutral-300 dark:border-neutral-800 pb-8 xl:pb-16 mb-8">
          <h1 className="title font-medium text-5xl xl:text-6xl mb-4">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center text-sm text-neutral-600 dark:text-neutral-300">
            {formatDate(post.metadata.publishedAt)}
          </div>
        </div>
        <article className="prose">
          <CustomMDX source={post.content} />
          <div className="flex justify-center pt-16 pb-8">
            <Image
              width={320}
              height={20}
              src="/images/thanks-for-reading.png"
              alt="Thanks for reading"
            />
          </div>
        </article>
      </section>
    </PageWrap>
  );
}
