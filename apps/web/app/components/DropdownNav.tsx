"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type DropdownItem = { href: string; label: string };

type DropdownNavProps = {
  label: string;
  items: DropdownItem[];
  active?: boolean;
};

export default function DropdownNav({ label, items, active = false }: DropdownNavProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
          active
            ? "border-[#C9F27A] text-[#C9F27A]"
            : "border-transparent text-white/80 hover:text-white"
        }`}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-30 min-w-[260px] -translate-x-1/2 pt-3">
          <ul className="overflow-hidden rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 dark:bg-ink dark:ring-white/10">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2.5 text-sm normal-case transition-colors hover:bg-surface dark:hover:bg-white/5 ${
                    pathname === item.href
                      ? "font-semibold text-primary dark:text-[#C9F27A]"
                      : "text-ink/80 dark:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}