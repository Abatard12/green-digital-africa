"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";

export default function ConnexionPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/espace-membre");
      } else {
        setError(true);
      }
    });
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-24">
        <h1 className="font-heading text-2xl font-bold text-ink dark:text-white">
          {lang === "fr" ? "Connexion" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink dark:text-white">Email</label>
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
              {lang === "fr" ? "Mot de passe" : "Password"}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {lang === "fr" ? "Email ou mot de passe incorrect." : "Incorrect email or password."}
            </p>
          )}

          <div className="text-right">
            <Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:text-ink dark:hover:text-white">
              {lang === "fr" ? "Mot de passe oublié ?" : "Forgot password?"}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-ink disabled:opacity-60"
          >
            {isPending
              ? lang === "fr" ? "Connexion…" : "Signing in…"
              : lang === "fr" ? "Se connecter" : "Sign in"}
          </button>

          <p className="text-center text-sm text-secondary dark:text-white/60">
            {lang === "fr" ? "Pas encore de compte ?" : "No account yet?"}{" "}
            <Link href="/inscription" className="text-primary hover:text-ink dark:hover:text-white">
              {lang === "fr" ? "S'inscrire" : "Sign up"}
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}