export type Actualite = {
  slug: string;
  date: string;
  title: string;
  summary: string;
};

// Données de départ — à terme, ça viendra d'une base de données
// plutôt que d'un tableau codé en dur.
export const actualites: Actualite[] = [
  {
    slug: "lancement-observatoire-risque",
    date: "2026-09-12",
    title: "Lancement de l'Observatoire du Risque",
    summary: "Un nouvel outil de veille cyber pour les organisations ouest-africaines.",
  },
  {
    slug: "bilan-cyber-women-2026",
    date: "2026-09-03",
    title: "Bilan de la première cohorte Cyber Women Green Tech",
    summary: "Retour sur 3 mois de formation et les prochaines étapes du programme.",
  },
  {
    slug: "eco-score-v2",
    date: "2026-08-20",
    title: "Eco-Score v2 : de nouveaux indicateurs",
    summary: "L'outil intègre désormais la mesure de l'empreinte des usages mobiles.",
  },
];
