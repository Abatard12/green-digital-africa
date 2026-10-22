"use client";

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type ContactFormProps = {
  variant?: "page" | "compact";
};

const phonePattern = /^\+?[0-9\s().-]{6,20}$/;

export default function ContactForm({ variant = "page" }: ContactFormProps) {
  const { t } = useLanguage();
  const isCompact = variant === "compact";

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "invalidPhone">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phonePattern.test(form.phone.trim())) {
      setStatus("invalidPhone");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Envoi échoué");

      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = isCompact
    ? "w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
    : "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-secondary/60 focus:border-primary focus:outline-none dark:border-white/15 dark:bg-ink dark:text-white";

  const labelClass = "mb-1 block text-sm font-medium text-ink dark:text-white";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isCompact
          ? "flex flex-col gap-4"
          : "flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-white/5 md:p-8"
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {!isCompact && (
            <label htmlFor="firstName" className={labelClass}>
              {t.form.firstName} *
            </label>
          )}
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder={isCompact ? `${t.form.firstName} *` : undefined}
            required
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          {!isCompact && (
            <label htmlFor="lastName" className={labelClass}>
              {t.form.lastName} *
            </label>
          )}
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder={isCompact ? `${t.form.lastName} *` : undefined}
            required
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {!isCompact && (
            <label htmlFor="email" className={labelClass}>
              {t.form.email} *
            </label>
          )}
          <input
            id="email"
            name="email"
            type="email"
            placeholder={isCompact ? `${t.form.email} *` : undefined}
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          {!isCompact && (
            <label htmlFor="phone" className={labelClass}>
              {t.form.phone} *
            </label>
          )}
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder={isCompact ? `${t.form.phone} *` : undefined}
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        {!isCompact && (
          <label htmlFor="message" className={labelClass}>
            {t.form.message} *
          </label>
        )}
        <textarea
          id="message"
          name="message"
          rows={isCompact ? 3 : 5}
          placeholder={isCompact ? `${t.form.message} *` : undefined}
          required
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={
          isCompact
            ? "mt-1 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-ink disabled:opacity-60"
            : "mt-2 w-full rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-ink disabled:opacity-60 sm:w-auto"
        }
      >
        {status === "sending" ? t.form.sending : t.form.send}
      </button>

      {status === "success" && <p className="text-sm text-primary">{t.form.success}</p>}
      {status === "error" && <p className="text-sm text-red-500">{t.form.error}</p>}
      {status === "invalidPhone" && <p className="text-sm text-red-500">{t.form.invalidPhone}</p>}
    </form>
  );
}