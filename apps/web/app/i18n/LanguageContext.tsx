"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Lang, translations } from "./translations";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? readonly Widen<U>[]
  : { readonly [K in keyof T]: Widen<T[K]> };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Widen<typeof translations["fr"]>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("gda-lang");
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("gda-lang", next);
    } catch {
      // stockage indisponible, on ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage doit être utilisé à l'intérieur de LanguageProvider");
  }
  return ctx;
}
