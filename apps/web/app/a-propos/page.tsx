"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";
import Image from "next/image";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.about.eyebrow} title={t.about.title} />
        <section className="py-10 lg:py-14">
          <div className="container mx-auto max-w-content px-4">
            <p className="mx-auto max-w-2xl text-center text-secondary dark:text-white/60">{t.about.intro}</p>

            <div className="mt-10 space-y-10">
              {/* Mission */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                                <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl lg:mx-0">
                  <Image src="/mission.jpg" alt={t.about.missionTitle} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-ink dark:text-white">
                    {t.about.missionTitle}
                  </h3>
                  <div className="mt-3 h-1 w-14 rounded bg-primary" />
                  <p className="mt-4 text-secondary dark:text-white/60">{t.about.missionText}</p>
                </div>
              </div>

              {/* Vision */}
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <h3 className="font-heading text-2xl font-semibold text-ink dark:text-white">
                    {t.about.visionTitle}
                  </h3>
                  <div className="mt-3 h-1 w-14 rounded bg-primary" />
                  <p className="mt-4 text-secondary dark:text-white/60">{t.about.visionText}</p>
                </div>
                                <div className="relative order-1 mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl lg:order-2 lg:mx-0">
                  <Image src="/vision.jpg" alt={t.about.visionTitle} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}