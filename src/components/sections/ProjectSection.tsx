import ClientProjectSection from "@/components/sections/ClientProjectSection"
import { getPortfolioPosts } from "@/utils/utils"
import { PortfolioPost } from "@/types"

const ProjectsSection = () => {
  const allPortfolios: PortfolioPost[] = getPortfolioPosts()

  return <ClientProjectSection allPortfolios={allPortfolios} />
}

export default ProjectsSection
