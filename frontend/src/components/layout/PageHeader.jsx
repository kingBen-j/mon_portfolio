import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";

export default function PageHeader({ kicker, title, accent, intro, meta }) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
      <div className="halo" />
      <div className="gridlines opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {title} <span className="accent">{accent}</span>
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={180}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
              {intro}
            </p>
          </Reveal>
        )}

        {meta && (
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mute-2">
              {meta.map((m) => (
                <span key={m.label}>
                  {m.label} <span className="text-blue-soft">{m.value}</span>
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
