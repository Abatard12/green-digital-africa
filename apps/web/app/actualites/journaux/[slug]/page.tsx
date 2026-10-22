import { resources } from "@/app/lib/resources";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ReadToUnlock from "@/app/components/ReadToUnlock";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export default function JournalDetailPage({ params }: { params: { slug: string } }) {
  const resource = resources.find((r) => r.slug === params.slug);
  if (!resource) return notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-24">
        <a href="/actualites" className="text-sm text-primary hover:text-ink">
          ← Retour aux actualités
        </a>

        <h1 className="mt-4 font-heading text-3xl font-bold text-ink dark:text-white">
          {resource.title.fr}
        </h1>
        <p className="mt-2 text-sm text-secondary dark:text-white/60">{resource.date}</p>

        <ReadToUnlock slug={resource.slug} title={resource.title.fr}>
  <article className="prose prose-ink mt-10 dark:prose-invert">
    {resource.content.fr.split("\n\n").map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </article>
</ReadToUnlock>
      </main>
      <Footer />
    </>
  );
}