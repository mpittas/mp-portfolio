// FigmaEmbed.tsx
import React from "react"

interface FigmaEmbedProps {
  url: string
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ url }) => (
  <iframe
    width="100%"
    height="450"
    src={`https://www.figma.com/embed?url=${url}`}
    allowFullScreen
  ></iframe>
)

export default FigmaEmbed
