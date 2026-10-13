import Link from "next/link";
import Section from "@/components/ui/Section";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WHATSAPP_NUMBER } from "@/data/profile";

const OFFERS = [
  {
    number: 2,
    id: "site-vitrine",
    name: "Site vitrine",
    price: "150 000",
    audience: "Pour les indépendants, artisans et petites entreprises.",
    featuresLabel: "Inclus",
    features: [
      "3 à 5 pages.",
      "Accueil, À propos, Services et Contact.",
      "Design responsive.",
      "Formulaire de contact.",
      "Intégration WhatsApp.",
      "Optimisation SEO de base.",
    ],
  },
  {
    number: 3,
    id: "site-professionnel",
    name: "Site professionnel",
    price: "300 000",
    audience:
      "Pour les PME et les entreprises qui veulent une présence en ligne plus complète.",
    featuresLabel: "Inclus",
    features: [
      "5 à 10 pages selon les besoins.",
      "Design personnalisé.",
      "Présentation détaillée des services.",
      "Formulaire de contact avancé.",
      "Intégration WhatsApp.",
      "Blog si nécessaire.",
      "SEO de base et optimisation des performances.",
    ],
  },
  {
    number: 4,
    id: "boutique-e-commerce",
    name: "Boutique e-commerce",
    price: "400 000",
    startingAt: true,
    audience: "Pour les entreprises qui souhaitent vendre en ligne.",
    featuresLabel: "Inclus selon le périmètre convenu",
    features: [
      "Catalogue de produits.",
      "Fiches produits.",
      "Panier et commandes.",
      "Gestion des produits et des stocks.",
      "Interface d’administration.",
      "Intégration d’un moyen de paiement si nécessaire, après validation des coûts et des contraintes techniques.",
    ],
  },
  {
    number: 5,
    id: "application-web",
    name: "Application web sur mesure",
    price: "500 000",
    startingAt: true,
    quotation: true,
    audience:
      "Pour les projets complexes nécessitant des fonctionnalités métier.",
    featuresLabel: "Exemples de fonctionnalités",
    features: [
      "Authentification et gestion des utilisateurs.",
      "Tableaux de bord.",
      "API et base de données.",
      "Gestion des rôles et permissions.",
      "Automatisations et fonctionnalités personnalisées.",
    ],
    note: "Le prix définitif dépend du cahier des charges, des fonctionnalités et de la complexité du projet.",
  },
];

export default function CreationOffers() {
  return (
    <Section
      id="creation-sites"
      kicker="Votre projet commence ici"
      title="Création de sites"
      accent="& applications web"
      description="Du site vitrine à l’application sur mesure, une offre adaptée à votre activité et à vos besoins."
      className="border-t border-line"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {OFFERS.map((offer) => (
          <article
            key={offer.id}
            aria-labelledby={`offer-${offer.id}`}
            className="flex min-w-0 flex-col rounded-2xl border border-line bg-panel/50 p-6 transition-colors duration-500 hover:border-blue-deep sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-soft">
              Offre {offer.number}
            </p>
            <h3
              id={`offer-${offer.id}`}
              className="mt-4 text-2xl font-semibold tracking-tight"
            >
              {offer.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mute md:min-h-12">
              {offer.audience}
            </p>

            <div className="mt-6 border-b border-line pb-6">
              <p className="min-h-5 text-sm text-blue-soft">
                {offer.startingAt ? "À partir de" : "Prix du site"}
              </p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-4xl font-bold tracking-tight text-chalk">
                  {offer.price}
                </span>
                <span className="text-sm text-mute">FCFA</span>
                {offer.quotation && (
                  <span className="text-sm text-blue-soft">sur devis</span>
                )}
              </p>
            </div>

            <h4 className="mt-6 text-sm font-medium text-chalk">
              {offer.featuresLabel}
            </h4>
            <ul className="mb-7 mt-4 flex-1 space-y-3 text-sm leading-relaxed text-mute">
              {offer.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-soft"
                    aria-hidden="true"
                  >
                    <path d="m4 10 4 4 8-8" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {offer.note && (
              <p className="mb-6 border-l-2 border-blue-deep pl-4 text-sm leading-relaxed text-mute">
                {offer.note}
              </p>
            )}

            {WHATSAPP_NUMBER ? (
              <WhatsAppCta
                message={`Bonjour BenDev, je suis intéressé par l’offre ${offer.name}. Pouvons-nous échanger sur mon projet et définir son périmètre ?`}
                label={
                  <>
                    Discuter de cette offre
                    <span className="sr-only">
                      {` : ${offer.name} (WhatsApp, nouvel onglet)`}
                    </span>
                  </>
                }
                variant="outline"
                className="w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-soft"
              />
            ) : (
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-medium text-chalk transition-colors hover:border-blue-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-soft"
              >
                Discuter de cette offre
                <span className="sr-only">{` : ${offer.name}`}</span>
              </Link>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
