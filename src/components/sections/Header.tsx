"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import HackingText from "@/components/anim/HackingText";
import CodeErrorMsg from "@/components/widgets/CodeErrorMsg";

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
};

export default function Header() {
  const { theme, setTheme } = useTheme();

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
            <div className="flex gap-x-10 items-center">
              <div className="opacity-90 relative top-[-5px]">
                <Link href="/">
                  <Image
                    src="/images/logo-dark.svg"
                    width={90}
                    height={20}
                    alt="Picture of the author"
                    className="relative top-1 dark:hidden"
                  />
                  <Image
                    src="/images/logo-light.svg"
                    width={90}
                    height={20}
                    alt="Picture of the author"
                    className="relative top-1 hidden dark:block"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex gap-x-10">
                {Object.entries(navItems).map(([path, { name }]) => {
                  return (
                    <Link
                      key={path}
                      href={path}
                      className=" transition-colors flex align-middle"
                    >
                      <HackingText text={name} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              aria-label="theme toggler"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-colors"
            >
              <span className="hidden dark:block">
                <HackingText text="Go light" />
              </span>
              <span className="dark:hidden">
                <HackingText text="Dark Side" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
