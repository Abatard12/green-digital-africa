"use client";

import PageHero from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";

type Realisation = {
  slug: string;
  title: string;
  summary: string;
};

export default function RealisationsList({ projects }: { projects: Realisation[] }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero eyebrow={t.realisations.eyebrow} title={t.realisations.title} />
      <section className="py-10 lg:py-14">
        <div className="container mx-auto max-w-content px-4">
          {projects.length === 0 ? (
            <p className="text-center text-secondary dark:text-white/60">
              {/* S'affiche si l'API NestJS n'est pas encore démarrée */}
              Aucune réalisation à afficher pour le moment.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.slug}
                  className="rounded-2xl border border-black/5 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="mb-2 font-heading font-semibold text-ink dark:text-white">{p.title}</h3>
                  <p className="text-sm text-secondary dark:text-white/60">{p.summary}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary">
                    {t.realisations.viewMore} →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
