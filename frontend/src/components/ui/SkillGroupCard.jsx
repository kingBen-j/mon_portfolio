import Badge from "./Badge";

export default function SkillGroupCard({ group, index = 0 }) {
  const { title, kicker, summary, items = [] } = group;

  // Un niveau chiffré donne une barre ; sans niveau, on retombe sur un badge.
  const normalized = items.map((item) =>
    typeof item === "string" ? { name: item, level: 0 } : item
  );
  const withLevel = normalized.filter((i) => i.level > 0);
  const withoutLevel = normalized.filter((i) => !i.level);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/50 p-7 transition-all duration-700 hover:border-blue-deep hover:bg-panel-2">
      <span className="pointer-events-none absolute right-5 top-5 font-mono text-5xl font-bold text-line/70 transition-colors duration-700 group-hover:text-blue-ghost">
        {String(index + 1).padStart(2, "0")}
      </span>

      <p className="kicker">{kicker || `Domaine ${index + 1}`}</p>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>

      {summary && <p className="mt-3 text-sm leading-relaxed text-mute">{summary}</p>}

      {withLevel.length > 0 && (
        <ul className="mt-7 flex-1 space-y-5">
          {withLevel.map((item) => (
            <li key={item.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-chalk">{item.name}</span>
                <span className="font-mono text-[11px] text-blue-deep">
                  {item.level}%
                </span>
              </div>
              <div className="level-track mt-2">
                <span
                  className="level-fill"
                  style={{ "--level": `${item.level}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {withoutLevel.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {withoutLevel.map((item) => (
            <Badge key={item.name}>{item.name}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
