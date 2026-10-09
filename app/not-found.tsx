import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap py-24 md:py-36">
      <p className="eyebrow">404</p>
      <h1 className="display-xl mt-4 max-w-[12ch]">This page wandered off.</h1>
      <p className="lede copy mt-6 text-mute">
        The link may be old, or the page may have moved.
      </p>
      <Link href="/" className="btn btn-primary mt-9">
        Back to the work
      </Link>
    </main>
  );
}
