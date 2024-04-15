import "./global.css"
import "./anim.css"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import Header from "@/components/sections/Header"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "@/components/sections/Footer"
import { baseUrl } from "@/seo/sitemap"

const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Next.js Portfolio Starter",
    template: "%s | Next.js Portfolio Starter",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(" ")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      // className={cx("text-black bg-white dark:text-white dark:bg-black")}
    >
      <body className={`antialiased ${spacemono.className} bg-slate-50`}>
        <div>
          <main className="">
            <Header />
            {children}
            {/* <Footer /> */}
            <Analytics />
            <SpeedInsights />
          </main>
        </div>
      </body>
    </html>
  )
}
