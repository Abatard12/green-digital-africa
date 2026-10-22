"use client";

import { useLanguage } from "../i18n/LanguageContext";
import CountUp from "./CountUp";

// ⚠️ Remplace ces valeurs par tes vrais chiffres.
// « 4 activités » et « 3 programmes » correspondent au contenu actuel du site ;
// les deux autres lignes sont de simples exemples.
const stats = [
  { end: 4, suffix: "", label: { fr: "Domaines d'activité", en: "Areas of activity" } },
  { end: 3, suffix: "", label: { fr: "Programmes phares", en: "Flagship programs" } },
  { end: 20, suffix: "+", label: { fr: "Femmes formées", en: "Women trained" } },
  { end: 15, suffix: "+", label: { fr: "Organisations accompagnées", en: "Organizations supported" } },
];

export default function StatsBand() {
  const { lang } = useLanguage();

  return (
    <section className="bg-primary py-10 text-white">
      <div className="container mx-auto max-w-content px-4">
        <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label.fr}>
              <p className="font-heading text-4xl font-bold lg:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/80">{s.label[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}