import type { Metadata, Viewport } from "next";
import {
  Sofia_Sans,
  Sofia_Sans_Condensed,
  Sofia_Sans_Extra_Condensed,
} from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";
import "./globals.css";

const display = Sofia_Sans_Extra_Condensed({
  variable: "--font-neke-display",
  subsets: ["latin", "cyrillic"],
  weight: ["800"],
});

const body = Sofia_Sans({
  variable: "--font-neke-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
});

const spec = Sofia_Sans_Condensed({
  variable: "--font-neke-spec",
  subsets: ["latin", "cyrillic"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.intro,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    type: "website",
  },
  icons: {
    icon: site.logo,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${spec.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-board text-ink">
        <SmoothScroll />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
