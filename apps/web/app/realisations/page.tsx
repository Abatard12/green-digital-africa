"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";

const projects = [
  { slug: "diagnostic-cyber-pme", image: "/audit 2.jpg", title: "Diagnostic cyber pour une PME de Cotonou", summary: "Audit de sécurité et plan de remédiation en 6 semaines." },
  { slug: "eco-score-banque", image: "/éco-score-banque.jpg", title: "Déploiement de l'Eco-Score dans une banque régionale", summary: "Mesure et réduction de l'empreinte numérique des services en ligne." },
  { slug: "formation-cyber-women", image: "/cyber.jpg", title: "Programme Cyber Women Green Tech — première cohorte", summary: "20 femmes formées aux fondamentaux de la cybersécurité." },
];

export default function RealisationsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.realisations.eyebrow} title={t.realisations.title} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.slug}
                  className="overflow-hidden rounded-2xl border border-black/5 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-heading font-semibold text-ink dark:text-white">{p.title}</h3>
                    <p className="text-sm text-secondary dark:text-white/60">{p.summary}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-primary">
                      {t.realisations.viewMore} →
                    </span>
                  </div>
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