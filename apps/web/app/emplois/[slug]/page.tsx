"use client";

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../i18n/LanguageContext";
import { jobCategories } from "@/app/lib/content";

export default function JobCategoryPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLanguage();
  const job = jobCategories.find((j) => j.slug === params.slug);
  if (!job) return notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.jobsPage.eyebrow} title={job.title[lang]} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4 max-w-2xl">
            <a href="/" className="text-sm text-primary hover:text-ink dark:hover:text-white">
              ← {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
            </a>
            <p className="mt-6 text-secondary dark:text-white/70">{job.description[lang]}</p>

            <p className="mt-6 text-sm italic text-secondary/70 dark:text-white/40">
              {lang === "fr"
                ? "Détails des postes à venir."
                : "Position details coming soon."}
            </p>

            <a
              href={`mailto:contact@greendigital.africa?subject=${encodeURIComponent(
                `Candidature — ${job.title.fr}`
              )}`}
              className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-ink"
            >
              {t.jobsPage.applyCta}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}