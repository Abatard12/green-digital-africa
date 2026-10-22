"use client";

import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import Reveal from "./components/Reveal";
import { useLanguage } from "./i18n/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBand />

        {/* Aperçu activités */}
        <section className="bg-surface py-10 dark:bg-ink lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <Reveal>
              <div className="mx-auto max-w-xl text-center">
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {t.home.sectionsEyebrow}
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-ink dark:text-white">
                  {t.home.servicesPreviewTitle}
                </h2>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.services.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="card-hover h-full rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-white/5">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                    <h5 className="mb-2 font-heading font-semibold text-ink dark:text-white">{item.title}</h5>
                    <p className="text-sm text-secondary dark:text-white/60">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-6 text-center">
                <Link href="/services" className="font-medium text-primary hover:text-ink dark:hover:text-white">
                  {t.nav.services} →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Aperçu secteurs */}
        <section className="bg-surface-alt py-10 dark:bg-white/5 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <Reveal>
              <h2 className="text-center font-heading text-3xl font-bold text-ink dark:text-white">
                {t.home.secteursPreviewTitle}
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.secteurs.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="card-hover h-full rounded-2xl bg-white p-6 shadow-sm dark:bg-ink">
                    <h5 className="mb-2 font-heading font-semibold text-ink dark:text-white">{item.title}</h5>
                    <p className="text-sm text-secondary dark:text-white/60">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-6 text-center">
                <Link href="/secteurs" className="font-medium text-primary hover:text-ink dark:hover:text-white">
                  {t.nav.secteurs} →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-primary py-10 text-white">
          <div className="container mx-auto max-w-content px-4 text-center">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold lg:text-3xl">{t.home.ctaTitle}</h2>
              <Link
                href="/devenir-partenaire"
                className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-medium text-primary transition hover:scale-105 hover:bg-ink hover:text-white"
              >
                {t.home.ctaButton}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}