"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";

export default function PartnersPage() {
  const { lang, t } = useLanguage();
  const [domain, setDomain] = useState<"tech" | "durabilite">("tech");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const domainLabel = domain === "tech" ? t.partnersPage.domainTech : t.partnersPage.domainDurabilite;

  const mailtoHref = `mailto:contact@greendigital.africa?subject=${encodeURIComponent(
    `Candidature partenaire — ${domainLabel}`
  )}&body=${encodeURIComponent(`Nom : ${name}\nEmail : ${email}\nDomaine : ${domainLabel}\n\n${message}`)}`;

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t.partnersPage.eyebrow} title={t.partnersPage.title} />

        {/* Ils nous font confiance — logos à ajouter quand disponibles */}
        <section className="py-16">
          <div className="container mx-auto max-w-content px-4 text-center text-sm text-secondary dark:text-white/50">
            {lang === "fr" ? "Logos de nos partenaires à venir." : "Partner logos coming soon."}
          </div>
        </section>

        {/* Devenir partenaire */}
        <section className="bg-surface py-10 lg:py-14 dark:bg-white/5">
          <div className="container mx-auto max-w-content px-4">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-2xl font-bold text-ink dark:text-white">
                {t.partnersPage.becomeTitle}
              </h2>
              <p className="mt-3 text-secondary dark:text-white/60">{t.partnersPage.becomeText}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailtoHref;
              }}
              className="mx-auto mt-10 max-w-lg space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-ink dark:text-white">
                  {t.partnersPage.nameLabel}
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink dark:text-white">
                  {t.partnersPage.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink dark:text-white">
                  {t.partnersPage.domainLabel}
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as "tech" | "durabilite")}
                  className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
                >
                  <option value="tech">{t.partnersPage.domainTech}</option>
                  <option value="durabilite">{t.partnersPage.domainDurabilite}</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink dark:text-white">
                  {t.partnersPage.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-ink"
              >
                {t.partnersPage.submit}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}