"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";
import ContactForm from "./ContactForm";
import Image from "next/image";

const links = [
  { href: "/a-propos", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/secteurs", key: "secteurs" as const },
  { href: "/realisations", key: "realisations" as const },
  { href: "/actualites", key: "actualites" as const },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink py-10 text-white">
      <div className="container mx-auto max-w-content px-4">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[1fr_0.8fr_1.6fr]">
          <div>
            <p className="flex items-center gap-2 font-heading text-lg font-bold text-brand">
              <Image src="/logo.webp" alt="Green Digital Africa" width={28} height={28} className="rounded-full" />
              Green Digital Africa
            </p>
            <p className="mt-3 text-sm text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.quickLinks}
            </h5>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">
              {t.footer.contactUs}
            </h5>
            <ContactForm variant="compact" />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Green Digital Africa — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
