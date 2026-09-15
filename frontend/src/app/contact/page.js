import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteContent } from "@/lib/api";
import { WHATSAPP_DISPLAY } from "@/data/profile";

export const metadata = {
  title: "Contact",
  description:
    "Écrivez directement à BenDev sur WhatsApp pour lancer votre projet.",
};

export default async function ContactPage() {
  const { profile } = await getSiteContent();

  return (
    <>
      <PageHeader
        kicker="Canal ouvert // Réponse < 24 h"
        title="Parlons de"
        accent="votre projet."
        intro="Le plus simple reste WhatsApp : un message, une réponse, et on avance. Le formulaire ci-dessous prépare ce message pour vous."
        meta={[
          { label: "WhatsApp", value: WHATSAPP_DISPLAY },
          { label: "Statut", value: profile.availability },
        ]}
      />

      <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------- Colonne latérale ---------- */}
          <div className="space-y-5">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-blue-deep/40 bg-gradient-to-br from-panel-2 to-ink p-8">
                <div className="gridlines opacity-25" />
                <div className="relative">
                  <p className="kicker">Voie rapide</p>
                  <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">
                    Un message <span className="accent">WhatsApp</span>,
                    <br />
                    <span className="accent-serif">et c&apos;est parti.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-mute">
                    Pas d&apos;attente, pas d&apos;intermédiaire. J&apos;échange
                    directement avec vous sur votre besoin.
                  </p>
                  <p className="mt-5 font-mono text-sm text-blue-soft">
                    {WHATSAPP_DISPLAY}
                  </p>
                  <WhatsAppCta
                    message="Bonjour BenDev, je vous écris depuis votre portfolio."
                    label="Ouvrir la conversation"
                    className="mt-7 w-full"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="rounded-2xl border border-line bg-panel/50 p-7">
                <p className="kicker">Autres canaux</p>
                <ul className="mt-5 space-y-4">
                  <ContactRow label="E-mail" value={profile.email} href={mailto(profile.email)} />
                  {(profile.socials || []).map((s) => (
                    <ContactRow
                      key={s.label}
                      label={s.label}
                      value={s.handle}
                      href={s.url}
                    />
                  ))}
                  <ContactRow label="Localisation" value={profile.location} />
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-2xl border border-line bg-panel/30 p-7">
                <p className="text-sm leading-relaxed text-mute">
                  <span className="text-chalk">Aucun suivi publicitaire.</span> Vos
                  informations servent uniquement à vous répondre — rien n&apos;est
                  revendu ni partagé.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Formulaire ---------- */}
          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({ label, value, href }) {
  const content = (
    <span className="text-sm text-chalk transition-colors duration-500 group-hover:text-blue-soft">
      {value}
    </span>
  );

  return (
    <li className="group flex items-center justify-between gap-4 border-b border-line/70 pb-4 last:border-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute-2">
        {label}
      </span>
      {href && href !== "#" ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

function mailto(email) {
  return email && email.includes("@") ? `mailto:${email}` : null;
}
