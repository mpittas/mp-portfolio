import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, extname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const PROJECTS = [
  { slug: "oatme-logo-package-design", title: "Oatme - Logo & Package Design", year: "2025", tags: ["Logo", "Packaging"] },
  { slug: "logofolio-2024-2025", title: "Logofolio 2024-2025", year: "2025", tags: ["Logo"] },
  { slug: "calendula-logo-design-visual-identity", title: "Calendula - Logo Design & Visual Identity", year: "2025", tags: ["Logo", "Identity"] },
  { slug: "xopark-rebranding-visual-identity", title: "XOPark - Rebranding, Visual Identity", year: "2025", tags: ["Rebranding", "Identity"] },
  { slug: "iab-mixx-awards-2025-visual-identity", title: "IAB Mixx Awards 2025 - Visual Identity", year: "2025", tags: ["Identity"] },
  { slug: "gstroy-rebranding-visual-identity", title: "GStroy - Rebranding, Visual Identity", year: "2025", tags: ["Rebranding", "Identity"] },
  { slug: "logofolio-2023-2024", title: "Logofolio 2023-2024", year: "2024", tags: ["Logo"] },
  { slug: "bglobal-editorial-and-masthead-design", title: "BGlobal - Editorial and Masthead Design", year: "2024", tags: ["Editorial"] },
  { slug: "logofolio-2022-2023", title: "Logofolio 2022-2023", year: "2023", tags: ["Logo"] },
  { slug: "theatres-night-bulgaria-2021", title: "Theatres Night Bulgaria 2021 - Visual Identity", year: "2021", tags: ["Identity"] },
  { slug: "skaklya-tourism-club-visual-identity", title: "Skaklya Tourism Club - Visual Identity", year: "2023", tags: ["Identity"] },
  { slug: "logofolio-2021-2022", title: "Logofolio 2021-2022", year: "2022", tags: ["Logo"] },
  { slug: "azsamfree-visual-identity", title: "AzSamFree - Visual Identity", year: "2022", tags: ["Identity"] },
  { slug: "vitablend-visual-identity", title: "Vitablend - Visual Identity", year: "2022", tags: ["Identity"] },
  { slug: "logofolio-2020-2021", title: "Logofolio 2020-2021", year: "2021", tags: ["Logo"] },
  { slug: "mothmankiller-the-flow-track-visualizers", title: "MOTHMANKILLER The Flow - Track Visualizers", year: "2021", tags: ["Motion"] },
  { slug: "the-bridge-fest-online-2020", title: "The Bridge Fest 2020 Online", year: "2020", tags: ["Identity"] },
  { slug: "na-baba-ti-terlitsite-social-campaign", title: "Na baba ti terlitsite - Social Campaign", year: "2020", tags: ["Campaign"] },
  { slug: "the-alchemist-label-design-photography", title: "The Alchemist - Label Design & Product Photography", year: "2020", tags: ["Packaging", "Photography"] },
  { slug: "logofolio-2019-2020", title: "Logofolio 2019-2020", year: "2020", tags: ["Logo"] },
  { slug: "tryavna-visual-identity", title: "TRYAVNA - Visual Identity", year: "2019", tags: ["Identity"] },
  { slug: "the-bridge-fest-visual-identity", title: "THE BRIDGE Fest '19 - Visual Identity", year: "2019", tags: ["Identity"] },
  { slug: "jahmmi-raw-session-album-identity-identity", title: "JAHMMI Raw Session Album - Identity Design", year: "2019", tags: ["Identity", "Music"] },
  { slug: "forma-digital-agency-brand-identity", title: "FORM_A Digital Agency - Brand Identity", year: "2019", tags: ["Identity"] },
  { slug: "scar-zatvor-album-cover-design", title: "SCAR Zatvor Album - Cover Design", year: "2018", tags: ["Music"] },
  { slug: "logofolio-2018-2019", title: "Logofolio 2018-2019", year: "2019", tags: ["Logo"] },
  { slug: "communication-during-crisis-handbook-editorial", title: "COMMUNICATION DURING CRISIS Handbook - Editorial Design", year: "2018", tags: ["Editorial"] },
  { slug: "university-botanical-garden-visual-identity", title: "UNIVERSITY BOTANICAL GARDEN - Visual Identity", year: "2018", tags: ["Identity"] },
  { slug: "the-bridge-fest-advertising-visual-identity", title: "THE BRIDGE Fest '18 - Advertising & Visual Identity", year: "2018", tags: ["Identity", "Advertising"] },
  { slug: "zapali-campaign-advertising", title: "#ZAPALI Campaign - Advertising", year: "2018", tags: ["Campaign"] },
  { slug: "snowboar-magazine", title: "SNOWBOAR Magazine", year: "2017", tags: ["Editorial"] },
  { slug: "logofolio-2017-2018", title: "Logofolio 2017-2018", year: "2018", tags: ["Logo"] },
];

function decode(html) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(html) {
  return decode(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pickSrcset(srcset, prefer = 1920) {
  if (!srcset) return null;
  const parts = srcset
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const m = p.match(/^(https?:\S+)\s+(\d+)w$/);
      return m ? { url: m[1], w: Number(m[2]) } : null;
    })
    .filter(Boolean);
  if (!parts.length) return null;
  const exact = parts.find((p) => p.w === prefer);
  if (exact) return exact.url;
  return parts.sort((a, b) => b.w - a.w)[0].url;
}

function extFromUrl(url, fallback = ".jpg") {
  const clean = url.split("?")[0];
  const ext = extname(clean).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".svg"].includes(ext)) return ext;
  return fallback;
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "text/html" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "*/*", referer: "https://nikolayneke.com/" } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  await mkdir(dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

function parseModules(html) {
  const canvas = html.match(/id="project-modules"([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/i)?.[1] ?? html;
  const blocks = canvas.split(/<div class="project-module /i).slice(1);
  const modules = [];

  for (const block of blocks) {
    const head = block.slice(0, 180);
    if (/\bimage\b/.test(head)) {
      const original = block.match(/js-lightbox[^>]*data-src="([^"]+)"/)?.[1];
      const display =
        pickSrcset(block.match(/data-srcset="([^"]+)"/)?.[1]) ||
        block.match(/class="js-lazy[^"]*"[\s\S]*?data-src="([^"]+)"/)?.[1] ||
        original;
      const width = Number(block.match(/\bwidth="(\d+)"/)?.[1] || 1920);
      const pad = block.match(/padding-bottom:\s*([\d.]+)%/);
      const ratio = pad ? Number(pad[1]) / 100 : null;
      if (display || original) {
        modules.push({
          type: "image",
          src: decode(display || original),
          original: original ? decode(original) : null,
          width,
          ratio,
        });
      }
    } else if (/\bvideo\b/.test(head)) {
      const iframe = block.match(/iframe[^>]*src="([^"]+)"/)?.[1];
      const ccv = iframe?.match(/\/ccv\/([^/?]+)/)?.[1];
      if (iframe) {
        modules.push({
          type: "video",
          embed: decode(iframe),
          ccvId: ccv || null,
          src: ccv
            ? `https://cdn.myportfolio.com/v1/ccvproxy/${ccv}?width=1920&type=mp4`
            : decode(iframe),
        });
      }
    } else if (/\btext\b/.test(head)) {
      const inner = block.match(/class="[^"]*module-text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
      const text = inner ? stripTags(inner[1]) : "";
      if (text) modules.push({ type: "text", html: inner[1], text });
    }
  }
  return modules;
}

function parseMeta(html) {
  const title =
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ||
    html.match(/property="og:title" content="([^"]+)"/)?.[1] ||
    "";
  const description = html.match(/name="description"\s+content="([^"]+)"/)?.[1] || "";
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1] || "";
  const keywords = html.match(/name="keywords"\s+content="([^"]+)"/)?.[1] || "";
  return {
    title: stripTags(title).replace(/^Nikolay 'Neke' Malinov - /, ""),
    description: decode(description),
    ogImage: decode(ogImage),
    keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
  };
}

async function saveAsset(url, slug, index, kind) {
  const ext = kind === "video" ? ".mp4" : extFromUrl(url, kind === "image" ? ".png" : ".bin");
  const name = `${String(index).padStart(2, "0")}${ext}`;
  const rel = `/media/projects/${slug}/${name}`;
  const destPath = join("public", "media", "projects", slug, name);
  await download(url, destPath);
  return rel;
}

async function scrapeProject(project) {
  const url = `https://nikolayneke.com/${project.slug}`;
  console.log(`→ ${project.slug}`);
  const html = await fetchText(url);
  const meta = parseMeta(html);
  const modules = parseModules(html);
  const outModules = [];
  let mediaIndex = 0;

  for (const mod of modules) {
    if (mod.type === "text") {
      outModules.push({ type: "text", text: mod.text });
      continue;
    }
    try {
      const rel = await saveAsset(mod.src, project.slug, mediaIndex, mod.type);
      mediaIndex += 1;
      outModules.push({
        type: mod.type,
        src: rel,
        original: mod.original || mod.embed || null,
        ratio: mod.ratio || (mod.type === "video" ? 0.5625 : null),
      });
    } catch (err) {
      console.warn(`  skip media: ${err.message}`);
      outModules.push({
        type: mod.type,
        src: mod.src,
        remote: true,
        original: mod.original || mod.embed || null,
        ratio: mod.ratio || null,
      });
    }
  }

  const coverRemote = meta.ogImage || modules.find((m) => m.type === "image")?.src;
  let cover = outModules.find((m) => m.type === "image")?.src || null;
  if (coverRemote && !cover) {
    try {
      cover = await saveAsset(coverRemote, project.slug, mediaIndex, "image");
    } catch {
      cover = coverRemote;
    }
  }

  return {
    ...project,
    url,
    title: meta.title || project.title,
    seoDescription: meta.description,
    keywords: meta.keywords,
    cover,
    modules: outModules,
  };
}

async function scrapeSiteChrome() {
  const home = await fetchText("https://nikolayneke.com/");
  const about = await fetchText("https://nikolayneke.com/about-me");
  const contact = await fetchText("https://nikolayneke.com/contact");

  const logo = home.match(/e2e-site-logo-text[\s\S]*?<img src="([^"]+)"/)?.[1];
  const heroVideo =
    home.match(/ccvproxy\/([^"?]+)/)?.[1] ||
    home.match(/\/ccv\/([^/?"]+)/)?.[1];
  const googleForm = contact.match(/docs\.google\.com\/forms\/[^"']+/)?.[0];

  const site = {
    name: "Nikolay 'Neke' Malinov",
    shortName: "Neké",
    role: "Digital Media Designer",
    introHeading: "Hello there!",
    intro:
      "I'm Nikolay Malinov or as my friends call me Neké. My mission is to take care of brands. I'm part-time Senior Graphic Designer and full-time dad, specializing in Logo Design & Visual Identity, with expertise in Art Direction and Creative Leading.",
    aboutHeading: "Nikolay Malinov",
    aboutSub: "Digital Media Designer. Also known as Neké.",
    aboutBody: stripTags(
      about.match(/<main[\s\S]*?<\/main>/i)?.[0] || about,
    ),
    cvUrl:
      "https://drive.google.com/file/d/1kJAPh8gKMW5QyaE1wlwBoVkXw3etEJgf/view?usp=sharing",
    contactHeading: "CONTACT",
    contactBody:
      "I'd love to hear about that cool idea of yours. So go ahead, drop me a line. Or, if you already have a project in mind, simply fill out this Google Form and I will get back to you asap.",
    googleForm: googleForm ? `https://${googleForm}` : null,
    socials: [
      { label: "Behance", href: "https://www.behance.net/nikolayneke" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nikolaymalinov" },
      { label: "Instagram", href: "https://www.instagram.com/nikolay.neke" },
    ],
  };

  if (logo) {
    try {
      site.logo = await saveAsset(decode(logo), "_site", 0, "image");
    } catch {
      site.logo = decode(logo);
    }
  }
  if (heroVideo) {
    const src = `https://cdn.myportfolio.com/v1/ccvproxy/${heroVideo}?width=1920&type=mp4`;
    try {
      site.heroVideo = await saveAsset(src, "_site", 1, "video");
    } catch {
      site.heroVideo = src;
    }
  }

  return site;
}

async function map() {
  const limit = 3;
  const results = [];
  for (let i = 0; i < PROJECTS.length; i += limit) {
    const chunk = PROJECTS.slice(i, i + limit);
    const done = await Promise.all(chunk.map(scrapeProject));
    results.push(...done);
  }
  return results;
}

const site = await scrapeSiteChrome();
const projects = await map();

await mkdir(new URL("../content", import.meta.url), { recursive: true });
await writeFile(
  new URL("../content/site.json", import.meta.url),
  JSON.stringify(site, null, 2),
);
await writeFile(
  new URL("../content/projects.json", import.meta.url),
  JSON.stringify(projects, null, 2),
);

const missing = projects.filter((p) => p.modules.length === 0).map((p) => p.slug);
console.log(`\nSaved ${projects.length} projects. Empty: ${missing.length ? missing.join(", ") : "none"}`);
const mediaCount = projects.reduce(
  (n, p) => n + p.modules.filter((m) => m.type !== "text").length,
  0,
);
console.log(`Media modules: ${mediaCount}`);
