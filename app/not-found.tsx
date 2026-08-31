import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-24 md:px-7">
      <p className="spec text-mute">Missing plate</p>
      <h1 className="display-title mt-4 text-[clamp(3rem,10vw,7rem)]">
        That work is not in the catalog.
      </h1>
      <Link
        href="/"
        className="spec mt-10 inline-block bg-ink px-7 py-4 text-board no-underline hover:bg-mute"
      >
        Back to work
      </Link>
    </main>
  );
}
