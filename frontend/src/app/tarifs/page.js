import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WHATSAPP_NUMBER } from "@/data/profile";

export const metadata = {
  title: "Tarifs",
  description:
    "Comparez les forfaits de maintenance et d’accompagnement des sites web de BenDev, à partir de 15 000 FCFA par mois.",
};

const PLANS = [
  {
    id: "essentielle",
    name: "Maintenance Essentielle",
    monthly: "15 000",
    annual: "150 000",
    services: [
      "Vérification régulière du bon fonctionnement du site.",
      "Mises à jour techniques simples.",
      "Sauvegardes périodiques.",
      "Corrections de petits bugs.",
      "Assistance technique de base.",
    ],
  },
  {
    id: "professionnelle",
    name: "Maintenance Professionnelle",
    monthly: "30 000",
    annual: "300 000",
    recommended: true,
    services: [
      "Toutes les prestations de l’offre Essentielle.",
      "Sauvegardes plus fréquentes.",
      "Surveillance de sécurité et mises à jour.",
      "Corrections de bugs plus poussées.",
      "Jusqu’à 2 heures de petites modifications de contenu par mois.",
      "Assistance prioritaire.",
    ],
  },
  {
    id: "premium",
    name: "Maintenance Premium",
    monthly: "60 000",
    annual: "600 000",
    services: [
      "Toutes les prestations de l’offre Professionnelle.",
      "Surveillance renforcée de la disponibilité du site.",
      "Optimisation des performances.",
      "Jusqu’à 5 heures de petites évolutions par mois.",
      "Assistance prioritaire renforcée.",
      "Rapport mensuel des interventions.",
    ],
  },
];

const CONDITIONS = [
  "Les forfaits annuels correspondent à 10 mois facturés au lieu de 12.",
  "L’hébergement, le nom de domaine, les licences payantes et les services tiers ne sont pas inclus, sauf indication contraire dans un devis.",
  "Les heures de modification incluses ne sont pas cumulables d’un mois à l’autre.",
  "Les nouvelles fonctionnalités, les refontes et les interventions exceptionnelles font l’objet d’un devis distinct.",
  "La restauration d’une sauvegarde et les interventions urgentes doivent être définies précisément dans les conditions contractuelles.",
  "Le périmètre exact de chaque forfait est validé avant la signature du contrat.",
];

export default function PricingPage() {
  return (
    <div style={{ "--color-mute-2": "var(--color-mute)" }}>
      <PageHeader
        kicker="Un suivi dans la durée"
        title="Des tarifs"
        accent="clairs."
        intro="Votre site est en ligne. Gardons-le fonctionnel, à jour et adapté à vos besoins, avec un accompagnement défini ensemble."
        meta={[
          { label: "Devise", value: "FCFA" },
          { label: "Forfaits", value: "Mensuels ou annuels" },
        ]}
      />

      <Section
        id="maintenance"
        kicker="Après la mise en ligne"
        title="Maintenance & accompagnement des sites web"
        description="Trois niveaux de suivi, selon les besoins de votre site. En annuel : 10 mois facturés au lieu de 12."
        className="border-t border-line bg-ink-2"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <article
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              aria-describedby="maintenance-conditions"
              className={`relative flex min-w-0 flex-col rounded-2xl border p-6 transition-colors duration-500 sm:p-7 ${
                plan.recommended
                  ? "border-blue-deep bg-panel-2"
                  : "border-line bg-panel/50 hover:border-blue-deep"
              }`}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <span className="font-mono text-xs text-blue-soft" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {plan.recommended && <Badge>Recommandé</Badge>}
              </div>

              <h3
                id={`plan-${plan.id}`}
                className="mt-5 text-xl font-semibold tracking-tight lg:min-h-14"
              >
                {plan.name}
              </h3>

              <div className="mt-6 border-b border-line pb-6">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-bold tracking-tight text-chalk">
                    {plan.monthly}
                  </span>
                  <span className="text-sm text-mute">FCFA/mois</span>
                </p>
                <p className="mt-3 text-sm text-blue-soft">
                  {plan.annual} FCFA/an
                </p>
              </div>

              <ul className="my-7 flex-1 space-y-4 text-sm leading-relaxed text-mute">
                {plan.services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
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
                    <span>{service}</span>
                  </li>
                ))}
              </ul>

              {WHATSAPP_NUMBER ? (
                <WhatsAppCta
                  message={`Bonjour BenDev, je souhaite choisir le forfait ${plan.name}. Pouvez-vous m’accompagner pour définir le périmètre et les conditions du contrat ?`}
                  label={
                    <>
                      Choisir ce forfait
                      <span className="sr-only">
                        {` : ${plan.name} (WhatsApp, nouvel onglet)`}
                      </span>
                    </>
                  }
                  variant={plan.recommended ? "solid" : "outline"}
                  className="w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-soft"
                />
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-medium text-chalk transition-colors hover:border-blue-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-soft"
                >
                  Choisir ce forfait
                  <span className="sr-only">{` : ${plan.name}`}</span>
                </Link>
              )}
            </article>
          ))}
        </div>

        <aside
          aria-labelledby="maintenance-conditions"
          className="mt-10 rounded-2xl border border-line bg-panel/50 p-6 sm:mt-12 sm:p-8"
        >
          <p className="kicker text-blue-soft">Avant de commencer</p>
          <h3 id="maintenance-conditions" className="mt-3 text-xl font-semibold">
            Conditions des forfaits
          </h3>
          <ul className="mt-6 grid list-disc gap-x-10 gap-y-4 pl-5 text-sm leading-relaxed text-mute marker:text-blue-soft md:grid-cols-2">
            {CONDITIONS.map((condition) => (
              <li key={condition} className="pl-1">{condition}</li>
            ))}
          </ul>
        </aside>
      </Section>
    </div>
  );
}
