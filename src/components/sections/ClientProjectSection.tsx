"use client";
import { useState } from "react";
import PortfolioPosts from "@/components/portfolio/PortfolioPosts";
import AnimatedImageReveal from "@/components/anim/AnimatedImageReveal";
import { PortfolioPost } from "@/types";

const ClientProjectSection = ({
  allPortfolios,
}: {
  allPortfolios: PortfolioPost[];
}) => {
  const [hoveredImage, setHoveredImage] = useState("");

  const handleHover = (featuredImage: string) => {
    setHoveredImage(featuredImage);
  };

  return (
    <div>
      <div className=" max-w-[1920px] mx-auto">
        <div className="px-24 grid grid-cols-1 lg:grid-cols-12 p-4 gap-36">
          {/* Col 1 */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-0 pt-24">
              <AnimatedImageReveal featuredImage={hoveredImage} />
            </div>
          </div>

          {/* Col 2 */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-x-2 pb-4">
              <div className="px-2 uppercase font-semibold text-neutral-400 dark:text-neutral-600">
                Latest projects
              </div>
            </div>
            <PortfolioPosts
              allPortfolios={allPortfolios}
              onHover={handleHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectSection;
