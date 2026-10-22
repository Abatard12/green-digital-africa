"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { useLanguage } from "../../i18n/LanguageContext";
import { serviceCategories } from "@/app/lib/content";

export default function ServiceCategoryPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLanguage();
  const category = serviceCategories.find((c) => c.slug === params.slug);
  if (!category) return notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.servicesPage.eyebrow} title={category.title[lang]} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <Reveal direction="left">
              <Link href="/" className="text-sm text-primary hover:text-ink dark:hover:text-white">
                ← {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
              </Link>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {category.items.map((item, i) => (
                <li key={item.fr}>
                  <Reveal delay={Math.min(i, 5) * 80} className="h-full">
                    <div className="card-hover flex h-full items-start gap-3 rounded-xl border border-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-secondary dark:text-white/70">{item[lang]}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}