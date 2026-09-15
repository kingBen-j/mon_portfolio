import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import StatsBand from "@/components/ui/StatsBand";
import ContactBand from "@/components/home/ContactBand";
import { getSiteContent } from "@/lib/api";

export const metadata = {
  title: "À propos",
  description: "Le parcours, la méthode et les convictions derrière BenDev.",
};

const METHOD = [
  {
    title: "Écouter",
    text: "Comprendre le besoin réel avant d'écrire la moindre ligne de code. Les bonnes questions évitent les mauvaises architectures.",
  },
  {
    title: "Cadrer",
    text: "Poser le périmètre, le calendrier et les choix techniques. Vous savez où va le projet et pourquoi.",
  },
  {
    title: "Construire",
    text: "Développement par itérations courtes, avec des points réguliers. Rien n'avance dans le noir.",
  },
  {
    title: "Livrer",
    text: "Mise en production, documentation et accompagnement. Un projet livré doit rester maintenable sans moi.",
  },
];

export default async function AboutPage() {
  const { profile } = await getSiteContent();
  const about = profile.about || {};
  // Portrait dédié à cette page, avec repli sur celui de l'accueil.
  const portrait = profile.photoAbout || profile.photo;

  return (
    <>
      <PageHeader
        kicker="Identité // Parcours"
        title="Derrière"
        accent="BenDev."
        intro={about.intro}
        meta={[
          { label: "Nom", value: profile.fullName },
          { label: "Rôle", value: profile.role },
          { label: "Basé à", value: profile.location },
        ]}
      />

      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ---------- Portrait ---------- */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line-2 bg-panel">
                {portrait ? (
                  <Image
                    src={portrait}
                    alt={profile.fullName}
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover object-[50%_38%] saturate-[0.9] contrast-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-b from-panel-2 to-ink">
                    <span className="font-mono text-5xl font-bold text-blue-deep/60">
                      &lt;/&gt;
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
              </div>

              <dl className="mt-6 space-y-3 rounded-xl border border-line bg-panel/40 p-5 font-mono text-[11px] uppercase tracking-[0.16em] text-mute-2">
                <div className="flex justify-between gap-4">
                  <dt>Statut</dt>
                  <dd className="text-blue-soft">{profile.availability}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Localisation</dt>
                  <dd className="text-chalk">{profile.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Réponse</dt>
                  <dd className="text-chalk">&lt; 24 h</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* ---------- Récit ---------- */}
          <div>
            <Reveal delay={90}>
              <p className="text-2xl leading-relaxed tracking-tight text-chalk sm:text-3xl">
                <span className="accent-serif">L&apos;informatique</span> au service de{" "}
                <span className="accent">vos idées</span>.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {(about.paragraphs || []).map((paragraph, i) => (
                <Reveal key={i} delay={140 + i * 90}>
                  <p className="text-base leading-[1.85] text-mute">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {(about.interests || []).length > 0 && (
              <Reveal delay={400}>
                <div className="mt-14 border-t border-line pt-8">
                  <p className="kicker">Hors écran</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {about.interests.map((interest) => (
                      <Badge key={interest}>{interest}</Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <StatsBand stats={profile.stats || []} />

      {/* ---------- Méthode ---------- */}
      <Section
        kicker="Méthode de travail"
        title="Comment je"
        accent="procède."
        description="Une progression simple, sans zone d'ombre, du premier échange à la mise en ligne."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <article className="group h-full rounded-2xl border border-line bg-panel/50 p-7 transition-all duration-700 hover:border-blue-deep hover:bg-panel-2">
                <span className="font-mono text-xs text-blue-deep">ÉTAPE 0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors duration-500 group-hover:text-blue-soft">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
