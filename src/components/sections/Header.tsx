"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import CodeErrorMsg from "@/components/widgets/CodeErrorMsg"

const navItems = {
  "/about": {
    name: "About",
  },
  "/portfolio": {
    name: "Portfolio",
  },
  "/playground": {
    name: "Playground",
  },
}

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* <CodeErrorMsg>
        {
          "ReferenceError: 'sleep' is not defined at deadlineApproaching.js:24:7 - Did you mean 'coffee'?"
        }
      </CodeErrorMsg> */}
      <div className="header py-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-8 items-center">
              <Link href="/">
                <Image
                  src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                  width={90}
                  height={20}
                  alt="Picture of the author"
                  className="relative top-1"
                />
              </Link>

              <nav className="flex">
                {Object.entries(navItems).map(([path, { name }]) => {
                  return (
                    <Link
                      key={path}
                      href={path}
                      className="flex align-middle relative py-1 px-2 m-1 text-zinc-600 dark:text-zinc-300"
                    >
                      {name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <button
              aria-label="theme toggler"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-zinc-600 dark:text-zinc-300"
            >
              <span className="hidden dark:block">Light</span>
              <span className="dark:hidden">Dark</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
