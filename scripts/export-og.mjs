// Saves every Open Graph image as a PNG in og-previews/ (for LinkedIn project thumbnails etc).
// Needs a running server: `npm run dev` (or `npm run build && npm start`).
// Usage: npm run export:og [-- http://localhost:3000]
import { mkdir, writeFile } from "node:fs/promises";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const out = new URL("../og-previews/", import.meta.url);
await mkdir(out, { recursive: true });

// Project slugs come from the live /work page so they always match the published catalog.
const html = await (await fetch(`${base}/work`)).text();
const slugs = [...new Set([...html.matchAll(/href="\/work\/([a-z0-9-]+)"/g)].map((m) => m[1]))];

const targets = [
  { name: "home", path: "/opengraph-image" },
  ...slugs.map((slug) => ({ name: slug, path: `/work/${slug}/opengraph-image` })),
];

for (const { name, path } of targets) {
  const res = await fetch(base + path);
  if (!res.ok) {
    console.error(`FAIL ${name}: ${res.status} ${path}`);
    continue;
  }
  await writeFile(new URL(`${name}.png`, out), Buffer.from(await res.arrayBuffer()));
  console.log(`ok   ${name}.png`);
}
