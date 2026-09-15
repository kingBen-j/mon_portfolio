import Link from "next/link"; 
//permet de créer un lien vers la page d'accueil du site. Le composant Link est fourni par Next.js et permet de naviguer entre les pages sans recharger la page entière, ce qui améliore les performances et l'expérience utilisateur.
/**
 * Marque BenDev : chevrons bleus, « Ben » blanc, « Dev » bleu.
 * Reprend le logo fourni. Pour utiliser l'image à la place,
 * dépose le fichier dans public/brand/logo.png et passe image={true}.
 */
export default function Logo({ compact = false, className = "" }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="BenDev — retour à l'accueil"
    >
      <span className="font-mono text-xl font-bold text-blue transition-transform duration-500 group-hover:-translate-y-px sm:text-2xl">
        &lt;/&gt;
      </span>
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-tight sm:text-xl">
          Ben<span className="text-blue">Dev</span>
        </span>
        {!compact && (
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-mute-2">
            L&apos;informatique au service de{" "}
            <span className="text-blue-deep">vos idées</span>
          </span>
        )}
      </span>
    </Link>
  );
}
