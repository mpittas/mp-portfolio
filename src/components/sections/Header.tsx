import Image from "next/image"
import Link from "next/link"
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

            <nav className="flex">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
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
