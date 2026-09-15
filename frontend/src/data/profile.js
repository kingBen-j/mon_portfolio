/* ------------------------------------------------------------------
   BenDev — source de contenu locale.

   Ce fichier est le FALLBACK : si l'API Django ne répond pas
   (backend éteint, build statique...), le site affiche ces données.
   Quand le backend tourne, c'est lui qui prend le dessus.

   Les valeurs marquées « À COMPLÉTER » attendent encore tes informations.
------------------------------------------------------------------ */

export const WHATSAPP_NUMBER = "2250711025713"; // +225 07 11 02 57 13
export const WHATSAPP_DISPLAY = "+225 07 11 02 57 13";

export const whatsappLink = (
  message = "Bonjour BenDev, je vous contacte depuis votre portfolio."
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const profile = {
  brand: "BenDev",
  brandPrefix: "Ben",
  brandSuffix: "Dev",
  baseline: "L'informatique au service de vos idées",

  fullName: "Coulibaly Israel",
  role: "Développeur Web · Freelance",
  location: "Abidjan, Côte d'Ivoire",
  email: "coulibalyisrael727@gmail.com",
  availability: "Freelance · Disponible",
  photo: "/brand/portrait.jpg", // hero de l'accueil
  photoAbout: "/brand/portrait-apropos.jpg", // page À propos

  heroLine: ["Je transforme vos", "idées", "en réalité."],
  heroIntro:
    "Développeur web freelance basé à Abidjan. Amoureux de l'informatique depuis l'enfance, je conçois des sites et des applications qui tiennent la route.",

  about: {
    intro:
      "Amoureux de l'informatique depuis l'enfance, étudiant en Sciences Informatiques à Abidjan et développeur web freelance — autodidacte depuis 2025.",
    paragraphs: [
      "L'informatique m'accompagne depuis tout petit. Ce qui a commencé par de la curiosité — comprendre comment les choses fonctionnent derrière l'écran — est devenu mon métier. Je conçois et développe des sites et des applications web, du premier échange jusqu'à la mise en ligne.",
      "Le développement web est ma passion principale, mais je m'intéresse de près au réseau et à la sécurité. Un produit ne tient pas seulement à son interface : il tient aussi à l'infrastructure qui le porte et à ce qui le protège.",
      "Je me forme en autodidacte depuis 2025. Ce que je sais faire, je l'ai appris en construisant : documentation, essais, erreurs, et des projets menés jusqu'au bout. L'université m'apporte les fondations théoriques depuis 2024, la pratique fait le reste — et les deux se nourrissent l'une l'autre.",
      "En freelance, je travaille en direct avec vous. Pas d'intermédiaire, pas de jargon inutile : on parle de votre idée, je vous dis ce qui est faisable, et on la transforme en réalité.",
    ],
    interests: ["Musique", "Basket", "Foi"],
  },

  stats: [
    { value: "—", label: "À COMPLÉTER", note: "" },
    { value: "—", label: "À COMPLÉTER", note: "" },
    { value: "—", label: "À COMPLÉTER", note: "" },
    { value: "—", label: "À COMPLÉTER", note: "" },
  ],

  socials: [
    {
      label: "GitHub",
      url: "https://github.com/Kingben-j",
      handle: "@Kingben-j",
    },
  ],
};

export const skillGroups = [
  {
    title: "Fondations du web",
    kicker: "STRUCTURE & STYLE",
    summary:
      "La base de tout ce que je construis : un balisage propre et une mise en page qui tient sur tous les écrans.",
    items: [
      { name: "HTML & CSS", level: 60 },
      { name: "JavaScript", level: 30 },
    ],
  },
  {
    title: "Interfaces & mobile",
    kicker: "CÔTÉ UTILISATEUR",
    summary:
      "Construire des interfaces réactives, sur le web comme sur mobile, à partir de composants réutilisables.",
    items: [
      { name: "React JS", level: 35 },
      { name: "Flutter", level: 30 },
      { name: "React Native", level: 20 },
    ],
  },
  {
    title: "Intelligence artificielle",
    kicker: "SYSTÈMES INTELLIGENTS",
    summary:
      "Concevoir des systèmes qui raisonnent et agissent : intégration de modèles de langage, agents autonomes et automatisation de tâches complexes.",
    items: [{ name: "IA & développement agentique", level: 55 }],
  },
  {
    title: "Back-end & logique",
    kicker: "CÔTÉ SERVEUR",
    summary:
      "Modéliser les données, écrire les règles métier et exposer des API que le front peut consommer sereinement.",
    items: [
      { name: "Python", level: 45 },
      { name: "Django", level: 40 },
    ],
  },
  {
    title: "Outils & infrastructure",
    kicker: "ENVIRONNEMENT",
    summary:
      "Versionner, déployer et comprendre ce qui se passe entre le code et la machine qui le fait tourner.",
    items: [
      { name: "Git / GitHub", level: 50 },
      { name: "Réseau & architecture", level: 35 },
      { name: "Docker", level: 25 },
    ],
  },
];

export const projects = [
  {
    title: "HoopCI — le sport de rue ivoirien",
    category: "PWA · Plateforme sportive",
    description:
      "Application web progressive dédiée au sport de rue à Abidjan. Elle référence les tournois de basket et de football, et surtout : elle permet aux joueurs qui n'évoluent dans aucun club d'exister officiellement. Profil, niveau reconnu, visibilité auprès des recruteurs — le talent ne dépend plus d'une licence.",
    stack: [], // À COMPLÉTER — quelles technos ?
    year: "", // À COMPLÉTER
    repo_url: "", // À COMPLÉTER
    demo_url: "", // À COMPLÉTER
    image: "/projets/hoopci.jpg",
  },
  {
    title: "The Safe Place — podcasts chrétiens",
    category: "Plateforme de contenus",
    description:
      "Un refuge numérique pour la foi : podcasts, vidéos et méditations bibliques à écouter quand on veut, et émissions en direct à suivre depuis la même interface. Pensé pour édifier et fortifier au quotidien, sans détour par cinq applications différentes.",
    stack: [], // À COMPLÉTER — quelles technos ?
    year: "", // À COMPLÉTER
    repo_url: "", // À COMPLÉTER
    demo_url: "", // À COMPLÉTER
    image: "/projets/safe-place.jpg",
  },
  {
    title: "Capture de trames — PAP vs CHAP",
    category: "Réseau & Sécurité",
    description:
      "Simulateur interactif qui compare deux protocoles d'authentification PPP : PAP, qui transmet le mot de passe en clair, et CHAP, qui protège l'échange par challenge/response. Terminaux client et serveur côte à côte, trames décortiquées en direct, journal de trafic et matrice de sécurité.",
    stack: [], // À COMPLÉTER — quelles technos ?
    year: "", // À COMPLÉTER
    repo_url: "", // À COMPLÉTER
    demo_url: "", // À COMPLÉTER
    image: "/projets/pap-chap.png",
  },
];

export const education = [
  {
    period: "2025 — en cours",
    degree: "Apprentissage en autodidacte",
    school: "",
    city: "",
    description:
      "Développement web, frameworks et outils appris seul : documentation officielle, essais répétés, et des projets réels menés jusqu'à la mise en ligne. C'est de là que vient l'essentiel de mes compétences pratiques.",
    highlights: [],
  },
  {
    period: "2024 — en cours",
    degree: "Sciences Informatiques (SI) — 3ᵉ année",
    school: "UIST",
    city: "Abidjan, Côte d'Ivoire",
    description:
      "Formation universitaire en sciences informatiques : algorithmique, développement, bases de données, réseaux et sécurité. Actuellement en troisième année (2026). Les projets menés en parallèle prolongent directement ce qui est étudié en cours.",
    highlights: [], // À COMPLÉTER — matières marquantes
  },
  {
    period: "2024",
    degree: "Baccalauréat",
    school: "", // À COMPLÉTER — nom du lycée
    city: "",
    description:
      "Obtention du baccalauréat, puis entrée à l'université la même année.",
    highlights: [],
  },
];

export const certifications = [];

export const services = [
  {
    title: "Développement web",
    description:
      "Sites vitrines, plateformes et applications web. De la maquette au déploiement, avec un code lisible et maintenable.",
  },
  {
    title: "Réseau & infrastructure",
    description:
      "Comprendre et maîtriser ce qui se passe sous l'interface : ce qui fait tenir une application debout une fois en ligne.",
  },
  {
    title: "Sécurité",
    description:
      "Penser la protection des données dès la conception plutôt que de la rajouter après coup.",
  },
];

export const siteFallback = {
  profile,
  skillGroups,
  projects,
  education,
  certifications,
  services,
};
