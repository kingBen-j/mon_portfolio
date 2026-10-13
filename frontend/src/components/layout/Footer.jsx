import Link from "next/link";
import Logo from "./Logo";
import { WHATSAPP_DISPLAY, whatsappLink, profile } from "@/data/profile";

const LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/competences", label: "Compétences" },
  { href: "/projets", label: "Projets" },
  { href: "/formation", label: "Formation" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2 px-5 pb-10 pt-20 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-deep to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">
              Développement web, logiciel et infrastructure réseau. Chaque projet est
              pensé pour être <span className="accent-serif">lisible, stable et durable</span>.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="kicker mb-1">Navigation</p>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-mute transition-colors duration-500 hover:text-blue-soft"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="kicker mb-1">Contact direct</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-mono text-sm text-blue-soft transition-colors duration-500 hover:text-blue"
            >
              {WHATSAPP_DISPLAY}
            </a>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-mute transition-colors duration-500 hover:text-chalk"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Statut : <span className="text-blue-deep">disponible</span> · Réponse &lt; 24 h
          </span>
          <span>© {year} BenDev — conçu et codé avec soin.</span>
        </div>
      </div>
    </footer>
  );
}
