"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import DropdownNav from "./DropdownNav";
import { serviceCategories, jobCategories, poles } from "../lib/content";

type MobileItem = { href: string; label: string };

function MobileAccordion({
  label,
  active,
  isOpen,
  onToggle,
  items,
  currentPath,
  onNavigate,
}: {
  label: string;
  active: boolean;
  isOpen: boolean;
  onToggle: () => void;
  items: MobileItem[];
  currentPath: string;
  onNavigate: () => void;
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between py-2 font-medium ${
          active ? "text-primary dark:text-[#C9F27A]" : "text-ink/70 dark:text-white/70"
        }`}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="space-y-1 py-1 pl-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`block py-1.5 text-sm ${
                currentPath === item.href
                  ? "font-semibold text-primary dark:text-[#C9F27A]"
                  : "text-ink/60 dark:text-white/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const servicesActive = pathname.startsWith("/services");
  const jobsActive = pathname.startsWith("/emplois");
  const polesActive = pathname.startsWith("/nos-poles");

  const desktopLinkClass = (active: boolean) =>
    `whitespace-nowrap border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
      active
        ? "border-[#C9F27A] text-[#C9F27A]"
        : "border-transparent text-white/80 hover:text-white"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `block py-2 font-medium ${
      active ? "text-primary dark:text-[#C9F27A]" : "text-ink/70 dark:text-white/70"
    }`;

  const servicesItems = serviceCategories.map((c) => ({
    href: `/services/${c.slug}`,
    label: c.title[lang],
  }));
  const jobsItems = jobCategories.map((j) => ({
    href: `/emplois/${j.slug}`,
    label: j.title[lang],
  }));
  const polesItems = poles.map((p) => ({
    href: `/nos-poles/${p.slug}`,
    label: p.title[lang],
  }));

  const toggleMobileSection = (key: string) => {
    setMobileSection((prev) => (prev === key ? null : key));
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20">
      {/* Ligne 1 : logo + actions */}
      <div className="border-b border-black/5 bg-white dark:border-white/10 dark:bg-ink">
        <div className="container mx-auto flex max-w-content items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold text-brand lg:text-xl"
          >
            <Image src="/logo.webp" alt="Green Digital Africa" width={32} height={32} className="rounded-full" />
            Green Digital Africa
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/devenir-partenaire"
              className="hidden whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-ink lg:inline-block"
            >
              {t.nav.partner}
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="Changer de thème"
              className="rounded-full border border-black/10 p-2 text-ink/70 hover:text-primary dark:border-white/10 dark:text-white/70"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              aria-label="Changer de langue"
              className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium dark:border-white/10"
            >
              <span className={lang === "fr" ? "text-primary" : "text-ink/40 dark:text-white/40"}>FR</span>
              <span className="text-ink/20 dark:text-white/20">/</span>
              <span className={lang === "en" ? "text-primary" : "text-ink/40 dark:text-white/40"}>EN</span>
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  className="stroke-ink dark:stroke-white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Ligne 2 : bande de navigation pleine largeur */}
      <div className="hidden bg-primary lg:block">
        <div className="container mx-auto flex max-w-content items-center justify-center gap-10 px-4 py-3.5">
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={desktopLinkClass(isActive("/"))}
          >
            {t.nav.home}
          </Link>

          <DropdownNav label={t.nav.services} items={servicesItems} active={servicesActive} />

          <Link
            href="/actualites"
            aria-current={isActive("/actualites") ? "page" : undefined}
            className={desktopLinkClass(isActive("/actualites"))}
          >
            {t.nav.news}
          </Link>

          <DropdownNav label={t.nav.jobs} items={jobsItems} active={jobsActive} />

          <Link
            href="/partenaires"
            aria-current={isActive("/partenaires") ? "page" : undefined}
            className={desktopLinkClass(isActive("/partenaires"))}
          >
            {t.nav.partners}
          </Link>

          <DropdownNav label={t.nav.poles} items={polesItems} active={polesActive} />

          <Link
            href="/a-propos"
            aria-current={isActive("/a-propos") ? "page" : undefined}
            className={desktopLinkClass(isActive("/a-propos"))}
          >
            {t.nav.about}
          </Link>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-black/5 bg-white px-4 py-4 dark:border-white/10 dark:bg-ink lg:hidden">
          <ul className="space-y-1">
            <li>
              <Link href="/" onClick={closeMenu} className={mobileLinkClass(isActive("/"))}>
                {t.nav.home}
              </Link>
            </li>

            <MobileAccordion
              label={t.nav.services}
              active={servicesActive}
              isOpen={mobileSection === "services"}
              onToggle={() => toggleMobileSection("services")}
              items={servicesItems}
              currentPath={pathname}
              onNavigate={closeMenu}
            />

            <li>
              <Link href="/actualites" onClick={closeMenu} className={mobileLinkClass(isActive("/actualites"))}>
                {t.nav.news}
              </Link>
            </li>

            <MobileAccordion
              label={t.nav.jobs}
              active={jobsActive}
              isOpen={mobileSection === "jobs"}
              onToggle={() => toggleMobileSection("jobs")}
              items={jobsItems}
              currentPath={pathname}
              onNavigate={closeMenu}
            />

            <li>
              <Link href="/partenaires" onClick={closeMenu} className={mobileLinkClass(isActive("/partenaires"))}>
                {t.nav.partners}
              </Link>
            </li>

            <MobileAccordion
              label={t.nav.poles}
              active={polesActive}
              isOpen={mobileSection === "poles"}
              onToggle={() => toggleMobileSection("poles")}
              items={polesItems}
              currentPath={pathname}
              onNavigate={closeMenu}
            />

            <li>
              <Link href="/a-propos" onClick={closeMenu} className={mobileLinkClass(isActive("/a-propos"))}>
                {t.nav.about}
              </Link>
            </li>

            <li>
              <Link
                href="/devenir-partenaire"
                onClick={closeMenu}
                className="mt-2 inline-block rounded-full bg-primary px-5 py-2.5 font-medium text-white"
              >
                {t.nav.partner}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}