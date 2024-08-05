import TitleBig from "@/components/widgets/TitleBig";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative px-8 xl:px-24 pt-12 pb-16 mb-24 border-b border-neutral-300 dark:border-neutral-800">
      <div className="max-w-[1000px] mx-auto text-center flex flex-col gap-y-6">
        <TitleBig>
          Welcome to the Intersection of Code and Creativity: A{" "}
          <span className="text-black dark:text-white">
            Frontend Developer's Journey
          </span>{" "}
          into UI/UX Excellence"
        </TitleBig>
        <Link
          href="/"
          className="underline uppercase text-sm font-medium text-neutral-600 dark:text-neutral-400"
        >
          More about me
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
