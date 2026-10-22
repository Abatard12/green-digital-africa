"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const slides = t.home.heroSlides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden text-white">
      {/* Images de fond */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image src={slide.image} alt={slide.title} fill priority={i === 0} className="object-cover" />
            <div className="absolute inset-0 bg-ink/60" />
          </div>
        ))}
      </div>

      {/* Contenu */}
      <div className="container relative mx-auto flex min-h-[380px] max-w-content flex-col items-center justify-center px-4 py-14 text-center lg:min-h-[460px]">
        <div className="grid max-w-2xl">
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <h1 className="font-heading text-3xl font-bold lg:text-5xl">{slide.title}</h1>
              <p className="mx-auto mt-4 max-w-xl text-white/80">{slide.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-6 inline-block rounded-full bg-primary px-7 py-3.5 font-medium text-white hover:bg-white hover:text-ink"
        >
          {t.home.heroCta}
        </Link>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}