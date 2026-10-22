export type Realisation = {
  slug: string;
  title: string;
  summary: string;
};

// Données de départ — à terme, ça viendra d'une base de données
// plutôt que d'un tableau codé en dur.
export const realisations: Realisation[] = [
  {
    slug: "diagnostic-cyber-pme",
    title: "Diagnostic cyber pour une PME de Cotonou",
    summary: "Audit de sécurité et plan de remédiation en 6 semaines.",
  },
  {
    slug: "eco-score-banque",
    title: "Déploiement de l'Eco-Score dans une banque régionale",
    summary: "Mesure et réduction de l'empreinte numérique des services en ligne.",
  },
  {
    slug: "formation-cyber-women",
    title: "Programme Cyber Women Green Tech — première cohorte",
    summary: "20 femmes formées aux fondamentaux de la cybersécurité.",
  },
];
