import Reveal from "./Reveal";

export default function StatsBand({ stats = [] }) {
  // Les chiffres non encore renseignés ne sont pas affichés :
  // mieux vaut pas de bandeau qu'un bandeau de tirets.
  const filled = stats.filter(
    (s) => s.value && s.value !== "—" && !String(s.label).startsWith("À COMPLÉTER")
  );
  if (!filled.length) return null;

  return (
    <section className="border-y border-line bg-ink-2 px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {filled.map((stat, i) => (
          <Reveal key={stat.label + i} delay={i * 90}>
            <div className="group">
              <p className="text-4xl font-bold tracking-tight text-chalk transition-colors duration-700 group-hover:text-blue sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-deep">
                {stat.label}
              </p>
              {stat.note && (
                <p className="mt-2 text-sm leading-relaxed text-mute">{stat.note}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
