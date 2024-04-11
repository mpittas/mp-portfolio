import { BlogPosts } from "@/components/content/BlogPosts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Portfolio view
      </h1>
      <BlogPosts />
    </section>
  );
}
