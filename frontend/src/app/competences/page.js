import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Empty from "@/components/ui/Empty";
import SkillGroupCard from "@/components/ui/SkillGroupCard";
import ContactBand from "@/components/home/ContactBand";
import { getSiteContent } from "@/lib/api";

export const metadata = {
  title: "Compétences",
  description:
    "Les technologies, langages et environnements maîtrisés par BenDev.",
};

export default async function SkillsPage() {
  const { skillGroups } = await getSiteContent();
  const hasSkills = skillGroups.length > 0 && (skillGroups[0].items || []).length > 0;
  const total = skillGroups.reduce((sum, g) => sum + (g.items || []).length, 0);

  return (
    <>
      <PageHeader
        kicker="Stack technique // Savoir-faire"
        title="Ce que je sais"
        accent="faire."
        intro="Un socle qui va de l'infrastructure réseau jusqu'à l'interface utilisateur, avec la même attention portée à la clarté et à la stabilité."
        meta={[
          { label: "Domaines", value: String(skillGroups.length || "—") },
          { label: "Technologies", value: String(total || "—") },
        ]}
      />

      <Section className="border-t border-line">
        {hasSkills ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title + i} delay={(i % 3) * 110}>
                <SkillGroupCard group={group} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty label="Compétences à renseigner" />
        )}
      </Section>

      <ContactBand />
    </>
  );
}
