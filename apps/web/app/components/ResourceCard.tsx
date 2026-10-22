import { resources } from "../lib/resources";
import { Resource } from "../lib/resources";

export default function ResourceCard({ resource, lang }: { resource: Resource; lang: "fr" | "en" }) {
  return (
    <a
      href={`/actualites/journaux/${resource.slug}`}
      className="group flex flex-col rounded-2xl border border-black/5 p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
        {resource.type === "journal" ? "Journal" : "Offre"}
      </span>

      <h3 className="mt-2 font-heading text-lg font-semibold text-ink dark:text-white">
        {resource.title[lang]}
      </h3>

      <p className="mt-2 text-sm text-secondary dark:text-white/60">
        {resource.excerpt[lang]}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-secondary/70 dark:text-white/40">
          {new Date(resource.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-primary group-hover:text-ink dark:group-hover:text-white">
          {lang === "fr" ? "En savoir plus" : "Learn more"}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </a>
  );
}