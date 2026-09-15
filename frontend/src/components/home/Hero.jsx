import Image from "next/image";
import Link from "next/link";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import WhatsAppCta from "@/components/ui/WhatsAppCta";

export default function Hero({ profile }) {
  const [before, highlight, after] = profile.heroLine;

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
      <div className="halo" />
      <div className="gridlines" />
      <div className="pointer-events-none absolute -right-40 top-24 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* ---------- Colonne texte ---------- */}
        <div>
          <Reveal>
            <Kicker>
              {profile.role !== "À COMPLÉTER" ? profile.role : "Développeur · Réseau"}
              {profile.location !== "À COMPLÉTER" && ` // ${profile.location}`}
            </Kicker>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-7 text-[2.75rem] font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
              {before}
              <br />
              <span className="accent">{highlight}</span>{" "}
              <span className="accent-serif">{after}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              {profile.heroIntro}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WhatsAppCta
                message="Bonjour BenDev, j'ai vu votre portfolio et j'aimerais échanger sur un projet."
                label="Démarrer une discussion"
              />
              <Link
                href="/projets"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/50 px-6 py-3.5 text-sm text-chalk transition-all duration-500 hover:border-blue-deep hover:text-blue-soft"
              >
                Voir mes projets
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-12 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-mute-2">
              <span className="accent-serif text-base">L&apos;informatique</span> au service
              de <span className="text-blue">vos idées</span> — du premier schéma réseau à
              la mise en production.
            </p>
          </Reveal>
        </div>

        {/* ---------- Colonne portrait ---------- */}
        <Reveal delay={250}>
          <figure className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-[26px] border border-line/60" />
            <CornerBrackets />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line-2 bg-panel">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.fullName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-[50%_32%] saturate-[0.85] contrast-[1.05]"
                />
              ) : (
                <PortraitPlaceholder />
              )}

              {/* Fondu vers le fond du site + très léger refroidissement.
                  Volontairement discret : un portrait doit rester naturel. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-blue-deep/10 mix-blend-soft-light" />
              <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />
            </div>

            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-mute-2">
              <span>
                {profile.fullName !== "À COMPLÉTER" ? profile.fullName : "Portrait"}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
                {profile.availability !== "À COMPLÉTER"
                  ? profile.availability
                  : "Disponible"}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function CornerBrackets() {
  const common = "absolute h-5 w-5 border-blue-deep";
  return (
    <>
      <span className={`${common} -left-3 -top-3 border-l border-t`} />
      <span className={`${common} -right-3 -top-3 border-r border-t`} />
      <span className={`${common} -bottom-3 -left-3 border-b border-l`} />
      <span className={`${common} -bottom-3 -right-3 border-b border-r`} />
    </>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-panel-2 to-ink">
      <span className="font-mono text-5xl font-bold text-blue-deep/70">&lt;/&gt;</span>
      <p className="px-8 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-mute-2">
        Portrait à déposer
        <br />
        <span className="text-blue-deep">public/brand/portrait.jpg</span>
      </p>
    </div>
  );
}
