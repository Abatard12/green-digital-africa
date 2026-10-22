"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { signup } from "../actions/auth";
import { useLanguage } from "../i18n/LanguageContext";

const errorMessages: Record<string, { fr: string; en: string }> = {
  invalid_name: { fr: "Nom trop court.", en: "Name too short." },
  invalid_email: { fr: "Adresse email invalide.", en: "Invalid email address." },
  weak_password: { fr: "Le mot de passe doit contenir au moins 8 caractères.", en: "Password must be at least 8 characters." },
  email_taken: { fr: "Cet email est déjà utilisé.", en: "This email is already in use." },
  unknown: { fr: "Une erreur est survenue.", en: "Something went wrong." },
};

export default function InscriptionPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);

    startTransition(async () => {
      const result = await signup(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      // Connexion automatique après inscription
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (loginResult?.ok) {
        router.push("/espace-membre");
      } else {
        router.push("/connexion");
      }
    });
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-24">
        <h1 className="font-heading text-2xl font-bold text-ink dark:text-white">
          {lang === "fr" ? "Créer un compte" : "Create an account"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink dark:text-white">
              {lang === "fr" ? "Nom complet" : "Full name"}
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
            />
          </div>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-white/20 dark:bg-white/5 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {(errorMessages[error] ?? errorMessages.unknown)[lang]}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-ink disabled:opacity-60"
          >
            {isPending
              ? lang === "fr" ? "Création…" : "Creating…"
              : lang === "fr" ? "Créer mon compte" : "Create my account"}
          </button># 

          <p className="text-center text-sm text-secondary dark:text-white/60">
            {lang === "fr" ? "Déjà un compte ?" : "Already have an account?"}{" "}
            <Link href="/connexion" className="text-primary hover:text-ink dark:hover:text-white">
              {lang === "fr" ? "Se connecter" : "Sign in"}
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}