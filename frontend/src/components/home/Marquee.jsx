/**
 * Bandeau défilant : rappelle les vieux bandeaux d'information,
 * volontairement lent pour rester apaisant.
 */
export default function Marquee({ items = [] }) {
  if (!items.length) return null;
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-2 to-transparent" />

      <div className="marquee-track flex w-max items-center gap-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-xs uppercase tracking-[0.22em] text-mute-2"
          >
            {item}
            <span className="text-blue-deep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
