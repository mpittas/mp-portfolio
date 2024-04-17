import Link from "next/link"
import { formatDate, getPortfolioPosts } from "@/utils/utils"
import PortfolioPostsItems from "./PortfolioPostItems"

export function PortfolioPosts() {
  let allPortfolios = getPortfolioPosts()

  return <PortfolioPostsItems allPortfolios={allPortfolios} />
}
