import Link from "next/link";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import ContactBand from "@/components/home/ContactBand";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Empty from "@/components/ui/Empty";
import StatsBand from "@/components/ui/StatsBand";
import ProjectCard from "@/components/ui/ProjectCard";
import SkillGroupCard from "@/components/ui/SkillGroupCard";
import { getSiteContent } from "@/lib/api";

export default async function HomePage() {
  const { profile, stats, skillGroups, projects, services } = await getSiteContent();
  const marqueeItems = buildMarquee(skillGroups);
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero profile={profile} />

      <Marquee items={marqueeItems} />

      <StatsBand stats={profile.stats || stats || []} />

      {/* ---------- Ce que je fais ---------- */}
      <Section
        kicker="Champs d'intervention"
        title="Du réseau au"
        accent="produit fini."
        description="Une même exigence à chaque étage : une infrastructure saine en dessous, une interface claire au-dessus."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title + i} delay={i * 110}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-panel/50 p-7 transition-all duration-700 hover:border-blue-deep hover:bg-panel-2">
                <span className="font-mono text-xs text-blue-deep">
                  0{i + 1} /
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-blue-soft">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Compétences ---------- */}
      <Section
        kicker="Synergie technique"
        title="Les outils que je"
        accent="maîtrise."
        aside={
          <Link
            href="/competences"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mute-2 transition-colors duration-500 hover:text-blue"
          >
            Tout le détail
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        }
        className="border-t border-line"
      >
        {skillGroups.length && skillGroups[0].items?.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.slice(0, 3).map((group, i) => (
              <Reveal key={group.title + i} delay={i * 110}>
                <SkillGroupCard group={group} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty label="Compétences à renseigner" />
        )}
      </Section>

      {/* ---------- Projets ---------- */}
      <Section
        kicker="Réalisations récentes"
        title="Quelques"
        accent="projets."
        aside={
          <Link
            href="/projets"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mute-2 transition-colors duration-500 hover:text-blue"
          >
            Tout le portfolio
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        }
        className="border-t border-line"
      >
        {featured.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.title + i} delay={i * 110}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty label="Projets à renseigner" />
        )}
      </Section>

      <ContactBand />
    </>
  );
}

function buildMarquee(skillGroups) {
  const fromSkills = skillGroups
    .flatMap((g) => g.items || [])
    .map((i) => (typeof i === "string" ? i : i.name))
    .filter(Boolean);

  if (fromSkills.length >= 6) return fromSkills.slice(0, 14);

  return [
    "Développement web",
    "Applications métier",
    "Réseaux & infrastructure",
    "Bases de données",
    "Déploiement",
    "Maintenance",
  ];
}
