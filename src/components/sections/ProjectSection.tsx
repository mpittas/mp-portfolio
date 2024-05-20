import Image from "next/image";
import PortfolioPosts from "@/components/portfolio/PortfolioPosts";

const ProjectsSection = () => {
  return (
    <div className="px-24 grid grid-cols-1 lg:grid-cols-12 gap-24 p-4">
      {/* Col 1 */}
      <div className="bg-neutral-300 dark:bg-neutral-900 h-[400px] rounded-lg  min-h-[200px] col-span-12 lg:col-span-5 pr-image"></div>

      {/* Col 2 */}
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center gap-x-2 pb-4">
          <div className="px-2 uppercase font-semibold text-neutral-400 dark:text-neutral-600">
            Latest projects
          </div>
          <div className="mix-blend-difference">
            <Image
              src="/images/arrow-double-pixel.svg"
              width={8}
              height={8}
              alt="arrow-right"
              className="opacity-40 relative top-[-2px]"
            />
          </div>
        </div>
        <PortfolioPosts />
      </div>
    </div>
  );
};

export default ProjectsSection;
