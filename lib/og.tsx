import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";
import type { Project } from "@/lib/types";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BOARD = "#0a0a0a";
const INK = "#f2f2f0";
const MUTE = "#8c8c8c";

async function publicDataUri(src: string) {
  const file = await readFile(join(process.cwd(), "public", src));
  const type = /\.png$/i.test(src) ? "image/png" : "image/jpeg";
  return `data:${type};base64,${file.toString("base64")}`;
}

function Byline() {
  return (
    <div
      style={{
        display: "flex",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: INK,
      }}
    >
      {site.name}
    </div>
  );
}

export async function projectOgImage(project: Project) {
  const poster = project.coverPoster ?? project.cover;
  const image =
    poster && !/\.(mp4|webm|mov)$/i.test(poster)
      ? await publicDataUri(poster)
      : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BOARD,
          color: INK,
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            width={ogSize.width}
            height={ogSize.height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 28%, rgba(10,10,10,0.35) 52%, rgba(10,10,10,0.96) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Byline />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: INK,
              }}
            >
              {project.year ?? ""}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: project.title.length > 16 ? 76 : 120,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#cfcfcb",
              }}
            >
              {project.tags.join("  ·  ")}
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

export async function siteOgImage(heading = site.name, sub = site.role) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: BOARD,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: MUTE,
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            {heading}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 40,
              fontWeight: 500,
              color: MUTE,
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
