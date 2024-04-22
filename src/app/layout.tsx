import "./global.css"
import React, { useEffect } from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import Header from "@/components/sections/Header"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${spacemono.className}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <div className="opacity-90">
            <div className="bg" />
          </div>
          <main className="bg-neutral-900 text-neutral-200 dark:bg-red-900 min-h-screen">
            <div className="relative">
              <div className="relative z-[1]">
                <Header />
              </div>
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
