import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Empty from "@/components/ui/Empty";
import Badge from "@/components/ui/Badge";
import ContactBand from "@/components/home/ContactBand";
import { getSiteContent } from "@/lib/api";

export const metadata = {
  title: "Formation",
  description: "Parcours académique et certifications de BenDev.",
};

export default async function EducationPage() {
  const { education, certifications } = await getSiteContent();

  return (
    <>
      <PageHeader
        kicker="Parcours // Apprentissage"
        title="Là où tout s'est"
        accent="construit."
        intro="Les diplômes donnent les bases, la pratique fait le reste. Voici le chemin parcouru."
        meta={[
          { label: "Formations", value: String(education.length || "—") },
          { label: "Certifications", value: String(certifications.length || "—") },
        ]}
      />

      <Section className="border-t border-line">
        {education.length ? (
          <ol className="relative ml-1 border-l border-line pl-8 sm:pl-12">
            {education.map((item, i) => (
              <Reveal as="li" key={(item.degree || "") + i} delay={i * 110}>
                <div className="relative pb-14 last:pb-0">
                  {/* Point sur la timeline */}
                  <span className="absolute -left-[41px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[57px]">
                    <span className="absolute h-3 w-3 rounded-full bg-blue/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_10px_2px_rgba(53,167,255,0.6)]" />
                  </span>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-deep">
                    {item.period}
                  </p>

                  <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.degree}
                  </h2>

                  {(item.school || item.city) && (
                    <p className="mt-2 text-sm text-mute">
                      <span className="text-chalk">{item.school}</span>
                      {item.school && item.city ? " — " : ""}
                      {item.city}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute">
                      {item.description}
                    </p>
                  )}

                  {(item.highlights || []).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <Badge key={h}>{h}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        ) : (
          <Empty label="Formation à renseigner" />
        )}
      </Section>

      {certifications.length > 0 && (
        <Section
          kicker="Validations externes"
          title="Certifications &"
          accent="attestations."
          className="border-t border-line"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title + i} delay={(i % 3) * 110}>
                <article className="group h-full rounded-2xl border border-line bg-panel/50 p-7 transition-all duration-700 hover:border-blue-deep hover:bg-panel-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-2">
                    {cert.year}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight transition-colors duration-500 group-hover:text-blue-soft">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm text-mute">{cert.issuer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <ContactBand />
    </>
  );
}
