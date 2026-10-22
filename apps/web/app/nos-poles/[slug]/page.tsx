"use client";

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../i18n/LanguageContext";
import { poles } from "@/app/lib/content";

export default function PoleDetailPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLanguage();
  const pole = poles.find((p) => p.slug === params.slug);
  if (!pole) return notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.polesPage.eyebrow} title={pole.title[lang]} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4 max-w-2xl">
            <a href="/" className="text-sm text-primary hover:text-ink dark:hover:text-white">
              ← {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
            </a>
            <p className="mt-6 text-sm italic text-secondary/70 dark:text-white/40">
              {lang === "fr"
                ? "Contenu détaillé de ce pôle à venir."
                : "Detailed content for this unit coming soon."}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}