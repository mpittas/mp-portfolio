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
  const [currentImage, setCurrentImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (allPortfolios.length > 0) {
      setCurrentImage(allPortfolios[0].metadata.featuredImage);
      setIsHovered(true);
    }
  }, [allPortfolios]);

  const handleHover = (featuredImage: string) => {
    setCurrentImage(featuredImage);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // We're not changing the currentImage or isHovered state here
    // This ensures the last hovered image stays visible
  };

  return (
    <div className="pb-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-8 xl:px-24 flex flex-wrap ">
          {/* Col 1 */}
          <div className="w-full xl:w-5/12 hidden xl:block">
            <div className="sticky top-0 pt-24 pr-24">
              <AnimatedImageReveal
                featuredImage={currentImage}
                isHovered={isHovered}
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
              currentImage={currentImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectSection;
