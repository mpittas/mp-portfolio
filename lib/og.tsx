import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";
import type { Project } from "@/lib/types";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BG = "#f4f2ec";
const INK = "#151513";
const MUTE = "#66655e";
const ACCENT = "#ff5a36";

async function publicDataUri(src: string) {
  const file = await readFile(join(process.cwd(), "public", src));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

function Brand() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: 30,
        fontWeight: 700,
        color: INK,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 18,
          height: 18,
          borderRadius: 9,
          background: ACCENT,
        }}
      />
      {site.name}
    </div>
  );
}

export async function projectOgImage(project: Project) {
  const image =
    project.cover.type === "media"
      ? await publicDataUri(project.cover.media.src)
      : null;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: INK,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: image ? 560 : 1200,
          padding: "56px 60px",
        }}
      >
        <Brand />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              background: project.kind === "concept" ? ACCENT : "#fbfaf7",
              border: project.kind === "concept" ? "none" : `2px solid #dad7cd`,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {project.kind === "concept" ? "Concept" : "Shipped product"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: image
                ? Math.min(104, Math.floor(440 / (project.title.length * 0.58)))
                : 104,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 28,
              lineHeight: 1.3,
              color: MUTE,
              maxWidth: image ? 460 : 900,
            }}
          >
            {project.tagline}
          </div>
        </div>
      </div>
      {image ? (
        <div style={{ display: "flex", width: 640, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            width={640}
            height={630}
            style={{ width: 640, height: 630, objectFit: "cover" }}
          />
        </div>
      ) : null}
    </div>,
    ogSize,
  );
}

export async function siteOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 72px",
        background: BG,
        color: INK,
      }}
    >
      <Brand />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            color: MUTE,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.045em",
            maxWidth: 980,
          }}
        >
          {site.headline}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
