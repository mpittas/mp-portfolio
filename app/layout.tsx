import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";
import "./globals.css";

const valley = localFont({
  src: "./fonts/ValleySans-Variable.woff2",
  variable: "--font-valley",
  weight: "100 900",
  display: "swap",
  fallback: ["Helvetica", "sans-serif"],
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
      className={`${valley.variable} h-full antialiased`}
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
