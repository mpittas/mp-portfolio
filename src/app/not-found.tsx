import PageWrap from "@/components/layout/PageWrap";

export default function NotFound() {
  return (
    <PageWrap>
      <section className="py-12">
        <h1 className="mb-8 text-5xl font-semibold">404 - Page Not Found</h1>
        <p className="mb-4">The page you are looking for does not exist.</p>
      </section>
    </PageWrap>
  );
}
