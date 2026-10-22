"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";

export default function SecteursPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.secteurs.eyebrow} title={t.secteurs.title} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.secteurs.items.map((item) => (
                <div key={item.title} className="rounded-2xl bg-surface p-6 shadow-sm dark:bg-white/5">
                  <h5 className="mb-2 font-heading font-semibold text-ink dark:text-white">{item.title}</h5>
                  <p className="text-sm text-secondary dark:text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
