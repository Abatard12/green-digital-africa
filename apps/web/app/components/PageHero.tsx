type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-surface-alt py-10 dark:bg-ink lg:py-12">
      <div className="container mx-auto max-w-content px-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</span>
        <h1 className="mt-3 font-heading text-3xl font-bold text-ink dark:text-white lg:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl	 text-secondary dark:text-white/60">{subtitle}</p>}
      </div>
    </section>
  );
}
