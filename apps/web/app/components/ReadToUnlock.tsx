"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { subscribeAndSend } from "../actions/subscribe";

export default function ReadToUnlock({
  children,
  slug,
  title,
}: {
  children: React.ReactNode;
  slug: string;
  title: string;
}) {
  const [hasRead, setHasRead] = useState(false);
  const endMarkerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHasRead(true),
      { threshold: 1.0 }
    );
    if (endMarkerRef.current) observer.observe(endMarkerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    formData.set("slug", slug);

    startTransition(async () => {
      const result = await subscribeAndSend(formData);
      setStatus(result.ok ? "success" : "error");
    });
  };

  return (
    <div>
      {children}
      <div ref={endMarkerRef} aria-hidden="true" className="h-px" />

      <div
        className={`mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center transition-all duration-500 dark:border-primary/30 dark:bg-primary/10 ${
          hasRead ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {status === "success" ? (
          <p className="text-sm text-secondary dark:text-white/70">
            Merci ! Le document vient de vous être envoyé par email.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-secondary dark:text-white/70">
              Vous avez terminé la lecture — entrez votre email pour recevoir ce document.
            </p>
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
              />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-ink disabled:opacity-60"
              >
                {isPending ? "Envoi…" : "Recevoir"}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-3 text-xs text-red-500">Une erreur est survenue, réessayez.</p>
            )}
            <p className="mt-3 text-xs text-secondary/70 dark:text-white/40">
              En soumettant ce formulaire, vous acceptez de recevoir ce document par email.
            </p>
          </>
        )}
      </div>
    </div>
  );
}