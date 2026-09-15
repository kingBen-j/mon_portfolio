import Image from "next/image";
import Badge from "./Badge";

export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    category,
    description,
    stack = [],
    year,
    repo_url: repoUrl,
    demo_url: demoUrl,
    image,
  } = project;

  const href = demoUrl || repoUrl || null;
  const Wrapper = href ? "a" : "div";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 transition-all duration-700 hover:border-blue-deep hover:bg-panel-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover opacity-70 transition-all duration-1000 group-hover:scale-[1.04] group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-3xl font-bold text-line-2">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />

        {category && (
          <span className="absolute left-4 top-4 rounded-md border border-line-2 bg-ink/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-blue-soft backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {year && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-2">
            {year}
          </p>
        )}

        <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors duration-500 group-hover:text-blue-soft">
          {title}
        </h3>

        {description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{description}</p>
        )}

        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}

        {href && (
          <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mute-2 transition-colors duration-500 group-hover:text-blue">
            {demoUrl ? "Voir la démo" : "Voir le code"}
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </p>
        )}
      </div>
    </Wrapper>
  );
}
