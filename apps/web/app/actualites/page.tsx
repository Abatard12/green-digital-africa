"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ResourceCard from "../components/ResourceCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { resources } from "../lib/resources";

const articles = [
  { slug: "lancement-observatoire-risque", image: "/risque.jpg", date: "12 sept. 2026", title: "Lancement de l'Observatoire du Risque", summary: "Un nouvel outil de veille cyber pour les organisations ouest-africaines." },
  { slug: "bilan-cyber-women-2026", image: "/bilan.jpg", date: "3 sept. 2026", title: "Bilan de la première cohorte Cyber Women Green Tech", summary: "Retour sur 3 mois de formation et les prochaines étapes du programme." },
  { slug: "eco-score-v2", image: "/score v2.webp", date: "20 août 2026", title: "Eco-Score v2 : de nouveaux indicateurs", summary: "L'outil intègre désormais la mesure de l'empreinte des usages mobiles." },
];

export default function ActualitesPage() {
  const { lang, t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.actualites.eyebrow} title={t.actualites.title} />

        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a, i) => (
                <Reveal key={a.slug} delay={i * 100}>
                  <div className="card-hover h-full overflow-hidden rounded-2xl border border-black/5 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="relative aspect-[4/3]">
                      <Image src={a.image} alt={a.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary">{a.date}</span>
                      <h3 className="mb-2 mt-1 font-heading font-semibold text-ink dark:text-white">{a.title}</h3>
                      <p className="text-sm text-secondary dark:text-white/60">{a.summary}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary">
                        {t.actualites.readMore} →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Journaux téléchargeables */}
        <section className="bg-surface-alt py-10 dark:bg-white/5 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <Reveal>
              <div className="mx-auto mb-8 max-w-xl text-center">
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {lang === "fr" ? "À télécharger" : "Downloadable"}
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-ink dark:text-white">
                  {lang === "fr" ? "Nos journaux et offres" : "Our journals and offers"}
                </h2>
                <div className="mx-auto mt-4 h-1 w-14 rounded bg-primary" />
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r, i) => (
                <Reveal key={r.slug} delay={Math.min(i, 5) * 100} className="h-full">
                  <ResourceCard resource={r} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}