"use client";
import { useState, useEffect } from "react";
import PortfolioPosts from "@/components/portfolio/PortfolioPosts";
import AnimatedImageReveal from "@/components/anim/AnimatedImageReveal";
import { PortfolioPost } from "@/types";

const ClientProjectSection = ({
  allPortfolios,
}: {
  allPortfolios: PortfolioPost[];
}) => {
  const [hoveredImage, setHoveredImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (allPortfolios.length > 0) {
      setHoveredImage(allPortfolios[0].metadata.featuredImage);
      setIsHovered(true);
    }
  }, [allPortfolios]);

  const handleHover = (featuredImage: string) => {
    setHoveredImage(featuredImage);
    setIsHovered(true);
    setInitialLoad(false);
  };

  const handleMouseLeave = () => {
    if (!initialLoad) {
      setIsHovered(false);
    }
  };

  return (
    <div className="pb-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-8 xl:px-24 flex flex-wrap ">
          {/* Col 1 */}
          <div className="w-full xl:w-5/12 hidden xl:block">
            <div className="sticky top-0 pt-24 pr-24">
              <AnimatedImageReveal
                featuredImage={hoveredImage}
                isHovered={isHovered || initialLoad}
              />
            </div>
          </div>

          {/* Col 2 */}
          <div className="w-full xl:w-7/12">
            <div className="flex items-center gap-x-2 pb-4">
              <div className="px-2 uppercase font-semibold text-neutral-400 dark:text-neutral-600">
                Latest projects
              </div>
            </div>
            <PortfolioPosts
              allPortfolios={allPortfolios}
              onHover={handleHover}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectSection;
