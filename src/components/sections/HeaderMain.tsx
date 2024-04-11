import Image from "next/image";
import Link from "next/link";
import CodeErrorMsg from "@/components/widgets/CodeErrorMsg";

export default function HeaderMain() {
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
                width={80}
                height={20}
                alt="Picture of the author"
              />
            </Link>

            <nav className="text-sm relative top-1">
              <ul className="flex gap-x-8">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/playground">Playground</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
