import "./global.css"
import React, { useEffect } from "react"
import type { Metadata } from "next"

import { Space_Mono } from "next/font/google"
import localFont from "next/font/local"

import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { baseUrl } from "@/seo/sitemap"

import BlurryBackground from "@/components/anim/BlurryBackground"

const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-spacemono",
})

const clashDisplay = localFont({
  variable: "--font-clashdisplay",
  src: [
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/clashdisplay/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Marios Pittas ☉",
    template: "%s | Marios Pittas ☉",
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
      <body
        className={`${clashDisplay.className} ${clashDisplay.variable} antialiased text-lg bg-neutral-200 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-950 `}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <div className="hidden xl:block">
            <BlurryBackground />
          </div>
          <div className="opacity-100">
            <div className="bg" />
          </div>
          <main className="min-h-screen">
            <div className="relative">
              <div className="relative z-[1]">
                <Header />
              </div>
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
