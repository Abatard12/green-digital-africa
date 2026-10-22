"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import { useLanguage } from "../i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />
        <section className="bg-surface py-16 dark:bg-ink lg:py-24">
          <div className="container mx-auto max-w-2xl px-4">
            <ContactForm variant="page" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
