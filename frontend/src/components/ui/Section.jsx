import Kicker from "./Kicker";
import Reveal from "./Reveal";

export default function Section({
  kicker,
  title,
  accent,
  description,
  children,
  aside,
  id,
  className = "",
}) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {kicker && <Kicker>{kicker}</Kicker>}
              {title && (
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
                  {title}
                  {accent && <span className="accent"> {accent}</span>}
                </h2>
              )}
            </div>
            {(description || aside) && (
              <div className="max-w-md text-sm leading-relaxed text-mute md:text-right">
                {description}
                {aside}
              </div>
            )}
          </div>
        </Reveal>

        <div className="pt-12 sm:pt-16">{children}</div>
      </div>
    </section>
  );
}
