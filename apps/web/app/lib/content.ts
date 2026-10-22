export interface Bilingual {
  fr: string;
  en: string;
}

// ---------- Services ----------
export interface ServiceCategory {
  slug: string;
  title: Bilingual;
  items: Bilingual[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "conseil-accompagnement",
    title: { fr: "Conseil & Accompagnement", en: "Consulting & Support" },
    items: [
      { fr: "Conseil en transformation numérique", en: "Digital transformation consulting" },
      { fr: "Conseil en stratégie digitale", en: "Digital strategy consulting" },
      { fr: "Conseil en systèmes d'information (SI)", en: "Information systems (IS) consulting" },
      { fr: "Audit et diagnostic des systèmes d'information", en: "Information systems audit and diagnosis" },
      { fr: "Accompagnement à la digitalisation des entreprises", en: "Business digitalization support" },
    ],
  },
  {
    slug: "project-management",
    title: { fr: "Project Management", en: "Project Management" },
    items: [
      { fr: "Management de projets digitaux", en: "Digital project management" },
      { fr: "Assistance à la maîtrise d'ouvrage (AMOA)", en: "Project owner assistance (AMOA)" },
      { fr: "Pilotage et coordination de projets IT", en: "IT project steering and coordination" },
      { fr: "Accompagnement au changement", en: "Change management support" },
      { fr: "Assistance à la conduite de transformation organisationnelle", en: "Organizational transformation support" },
    ],
  },
  {
    slug: "developpement-durable",
    title: { fr: "Développement durable & Transition écologique", en: "Sustainable Development & Ecological Transition" },
    items: [
      { fr: "Conseil en transformation numérique responsable", en: "Responsible digital transformation consulting" },
      { fr: "Accompagnement RSE et numérique responsable", en: "CSR and responsible digital support" },
      { fr: "Solutions de gestion des e-déchets (DEEE)", en: "E-waste management solutions (WEEE)" },
      { fr: "Sensibilisation au numérique responsable", en: "Responsible digital awareness" },
      { fr: "Réduction de l'empreinte carbone du numérique", en: "Reducing the digital carbon footprint" },
      { fr: "Mise en œuvre des meilleures pratiques du numérique responsable", en: "Implementing responsible digital best practices" },
      { fr: "Accompagnement des démarches de développement durable", en: "Sustainable development process support" },
      { fr: "Études et projets liés à l'environnement et au changement climatique", en: "Environmental and climate change studies and projects" },
      { fr: "Solutions digitales au service de la transition écologique", en: "Digital solutions for ecological transition" },
    ],
  },
];

// ---------- Nos pôles ----------
export interface Pole {
  slug: string;
  title: Bilingual;
}

export const poles: Pole[] = [
  { slug: "impression", title: { fr: "Pôle Impression", en: "Printing Unit" } },
  { slug: "projets-digitaux", title: { fr: "Pôle Projets Digitaux", en: "Digital Projects Unit" } },
  { slug: "transformation-digitale", title: { fr: "Pôle Transformation Digitale", en: "Digital Transformation Unit" } },
  { slug: "cybersecurite", title: { fr: "Pôle Cybersécurité", en: "Cybersecurity Unit" } },
  { slug: "green-digital-academy", title: { fr: "Pôle Green Digital Academy", en: "Green Digital Academy Unit" } },
];

// ---------- Emplois ----------
export interface JobCategory {
  slug: string;
  title: Bilingual;
  description: Bilingual;
}

export const jobCategories: JobCategory[] = [
  {
    slug: "consultants",
    title: { fr: "Consultants", en: "Consultants" },
    description: {
      fr: "Postes de consultant sur nos différents pôles d'expertise.",
      en: "Consultant positions across our areas of expertise.",
    },
  },
  {
    slug: "engagement-courte-duree",
    title: { fr: "Engagement de courte durée", en: "Short-term engagement" },
    description: {
      fr: "Missions ponctuelles sur des projets définis.",
      en: "One-off assignments on defined projects.",
    },
  },
  {
    slug: "stage",
    title: { fr: "Programme de stage", en: "Internship program" },
    description: {
      fr: "Stages pour étudiants et jeunes diplômés.",
      en: "Internships for students and recent graduates.",
    },
  },
  {
    slug: "jeunes-professionnels",
    title: { fr: "Programme des jeunes professionnels", en: "Young professionals program" },
    description: {
      fr: "Parcours d'intégration pour jeunes professionnels.",
      en: "Onboarding track for young professionals.",
    },
  },
];

// ---------- À propos ----------
export const about = {
  qui: {
    fr: "Green Digital Africa est une entreprise africaine à impact, positionnée à l'intersection de la transformation digitale, de la durabilité environnementale et de la résilience numérique. Nous développons des services et outils pour sécuriser les systèmes d'information tout en réduisant leur empreinte écologique.",
    en: "Green Digital Africa is an African impact company at the intersection of digital transformation, environmental sustainability and digital resilience. We develop services and tools to secure information systems while reducing their environmental footprint.",
  },
  valeurs: [
    {
      titre: { fr: "Innovation", en: "Innovation" },
      texte: {
        fr: "Nous croyons en l'innovation continue pour développer des solutions technologiques avancées et durables.",
        en: "We believe in continuous innovation to develop advanced, sustainable technology solutions.",
      },
    },
  ],
  mission: {
    fr: "Nous nous engageons à protéger les infrastructures climatiques et les systèmes d'information grâce à des solutions de technologie innovantes et durables. En intégrant les meilleures pratiques écologiques et technologiques, nous visons à créer un avenir plus sûr et plus vert pour nos clients et notre planète.",
    en: "We are committed to protecting climate infrastructure and information systems through innovative, sustainable technology solutions. By integrating ecological and technological best practices, we aim to create a safer, greener future for our clients and our planet.",
  },
  vision: {
    fr: "Être un leader africain en matière de technologies durables, en mettant en œuvre des technologies de pointe et des pratiques durables pour protéger notre environnement et les données critiques de nos clients. Nous aspirons à un monde où technologie et durabilité vont de pair, créant ainsi des communautés résilientes et prospères.",
    en: "To be an African leader in sustainable technologies, implementing cutting-edge technology and sustainable practices to protect our environment and our clients' critical data. We aspire to a world where technology and sustainability go hand in hand, creating resilient, thriving communities.",
  },
  activites: [
    { fr: "Cabinet conseil", en: "Consulting firm" },
    { fr: "Technologies de l'Information", en: "Information Technology" },
    { fr: "Télécommunications", en: "Telecommunications" },
    { fr: "Formations", en: "Training" },
    { fr: "Transformation Digitale", en: "Digital Transformation" },
    { fr: "Cybersécurité", en: "Cybersecurity" },
    { fr: "Management des Projets", en: "Project Management" },
    { fr: "Développement Durable", en: "Sustainable Development" },
    { fr: "Changement Climatique", en: "Climate Change" },
  ],
  slogan: {
    fr: "Allier Technologie et Durabilité",
    en: "Combine Technology and Sustainability",
  },
};