// File: lib/mdx.ts
import {serialize} from "next-mdx-remote/serialize"
import grayMatter from "gray-matter"
import fs from "fs"
import path from "path"

export async function getMdxContent(filePath: string) {
  const fullPath = path.join(process.cwd(), "content", filePath)
  const mdxContent = fs.readFileSync(fullPath, "utf8")
  const {content, data} = grayMatter(mdxContent)

  const mdxSource = await serialize(content, {scope: data})
  return mdxSource
}
