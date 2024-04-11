import { PortfolioPosts } from "@/components/content/PortfolioPosts";

export const metadata = {
  title: "My Portfolio",
  description: "Take a look at my projects.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Portfolio view
      </h1>
      <PortfolioPosts />
    </section>
  );
}
