"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import CodeErrorMsg from "@/components/widgets/CodeErrorMsg"

const navItems = {
  "/about": {
    name: "about",
  },
  "/portfolio": {
    name: "portfolio",
  },
  "/playground": {
    name: "playground",
  },
}

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <CodeErrorMsg>
        {
          "ReferenceError: 'sleep' is not defined at deadlineApproaching.js:24:7 - Did you mean 'coffee'?"
        }
      </CodeErrorMsg>
      <div className="header py-6">
        <div className="container mx-auto">
          <div className="flex gap-x-8">
            <Link href="/">
              <Image
                src="/logo.svg"
                width={90}
                height={20}
                alt="Picture of the author"
                className="relative top-1"
              />
            </Link>

            <button
              aria-label="theme toggler"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-red-200"
            >
              <span>
                <span className="hidden dark:block">Light</span>
                <span className="dark:hidden">Dark</span>
              </span>
            </button>

            <nav className="flex">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-red-800 flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
