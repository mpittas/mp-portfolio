import { getPortfolioPosts } from "@/utils/utils";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default async function sitemap() {
  let portfolios = getPortfolioPosts().map((post) => ({
    url: `${baseUrl}/portfolio/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/portfolio"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...portfolios];
}
