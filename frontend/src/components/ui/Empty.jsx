/**
 * Affiché tant qu'une section n'a pas encore reçu son contenu réel.
 * Évite d'inventer des informations à la place de l'utilisateur.
 */
export default function Empty({ label = "Contenu à compléter" }) {
  return (
    <div className="rounded-xl border border-dashed border-line-2 bg-panel/40 px-6 py-10 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute-2">{label}</p>
    </div>
  );
}
