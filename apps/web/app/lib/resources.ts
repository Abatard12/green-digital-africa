export type ResourceType = "journal" | "offre";

export interface Resource {
  slug: string;
  type: ResourceType;
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };   // teaser — affiché dans la liste "Actualités"
  content: { fr: string; en: string };    // texte complet — affiché sur la page article
  date: string;                            // format ISO, ex. "2026-01-15"
  file: string;                             // chemin dans /public
  sizeLabel?: string;
}

export const resources: Resource[] = [
  {
    slug: "journal-2026-01",
    type: "journal",
    title: {
      fr: "Journal Green Digital Africa/GOT LORE — Janvier 2026",
      en: "Green Digital Africa Journal/ GOT LORE — January 2026",
    },
    excerpt: {
      fr: "Les résultats du premier trimestre de l'Eco-Score, les coulisses du programme Cyber Women Green Tech, et ce qui change pour les PME en 2026.",
      en: "First-quarter Eco-Score results, behind the scenes of Cyber Women Green Tech, and what's changing for SMEs in 2026.",
    },
    content: {
      fr: "Le Lore de Westeros — Maisons, Personnages, Devises.\n\nLes Sept Couronnes — Grandes Maisons.\n\nCe document présente le lore de l'univers de Game of Thrones / A Song of Ice and Fire : les grandes maisons de Westeros, leurs devises, leurs sièges, leurs membres clés, ainsi que plusieurs maisons vassales, factions et personnages notables sans allégeance fixe.",
      en: "First paragraph of the journal here.\n\nSecond paragraph, developing the next topic.\n\nConclusion of the article.",
    },
    date: "2026-01-15",
    file: "/documents/gotlore.pdf",
    sizeLabel: "409 Ko",
  },
  {
    slug: "offre-audit-green-it",
    type: "offre",
    title: {
      fr: "Offre — Audit Green IT pour PME/Mangaka",
      en: "Offer — Green IT Audit for SMEs/Mangaka",
    },
    excerpt: {
      fr: "Détail de notre accompagnement d'audit numérique responsable, avec biographie mangaka.",
      en: "Details of our responsible digital audit support, with mangaka biography.",
    },
    content: {
      fr: "Ce document réunit environ une centaine de mangaka japonais reconnus pour des œuvres mainstream.\n\nAuteur old school.\n\nAuteur Seinen et New Gen.",
      en: "Full presentation of the audit offer here.\n\nService steps.\n\nTerms and pricing.",
    },
    date: "2026-02-01",
    file: "/documents/biographie.pdf",
    sizeLabel: "246 Ko",
  },
];

