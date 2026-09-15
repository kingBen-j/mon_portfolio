import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Empty from "@/components/ui/Empty";
import ProjectCard from "@/components/ui/ProjectCard";
import ContactBand from "@/components/home/ContactBand";
import { getSiteContent } from "@/lib/api";

export const metadata = {
  title: "Projets",
  description:
    "Sélection de réalisations web, logicielles et réseau signées BenDev.",
};

export default async function ProjectsPage() {
  const { projects } = await getSiteContent();

  return (
    <>
      <PageHeader
        kicker="Portfolio // Réalisations"
        title="Les projets"
        accent="livrés."
        intro="Chaque projet part d'un besoin concret. Voici ceux dont je peux parler publiquement."
        meta={[{ label: "Total", value: String(projects.length || "—") }]}
      />

      <Section className="border-t border-line">
        {projects.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.title + i} delay={(i % 3) * 110}>
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
