"use client"
import {useState} from "react"
import PortfolioPosts from "@/components/portfolio/PortfolioPosts"
import AnimatedImageReveal from "@/components/anim/AnimatedImageReveal"
import {PortfolioPost} from "@/types"

const ClientProjectSection = ({
  allPortfolios,
}: {
  allPortfolios: PortfolioPost[]
}) => {
  const [hoveredImage, setHoveredImage] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = (featuredImage: string) => {
    setHoveredImage(featuredImage)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div>
      <div className="max-w-[1920px] mx-auto">
        <div className="px-8 xl:px-24 grid grid-cols-1 lg:grid-cols-12 p-4 gap-12 xl:gap-36">
          {/* Col 1 */}
          <div className="col-span-12 lg:col-span-5 hidden xl:block">
            <div className="sticky top-0 pt-24">
              <AnimatedImageReveal
                featuredImage={hoveredImage}
                isHovered={isHovered}
              />
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
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProjectSection
