import { siteFallback } from "@/data/profile";
import { resolveApiUrl } from "./api-url.mjs";

const API_BASE = resolveApiUrl(process.env.NEXT_PUBLIC_API_URL);

/**
 * Récupère le contenu du site depuis l'API Django.
 * Si le backend est injoignable, on retombe sur les données locales :
 * le portfolio reste affichable en toutes circonstances.
 */
export async function getSiteContent() {
  try {
    // En développement on ne met jamais en cache : ce qu'on saisit dans
    // l'admin Django doit apparaître au rafraîchissement suivant.
    // En production, ISR rafraîchit les pages toutes les 60 secondes.
    const cacheOptions =
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } };

    const res = await fetch(`${API_BASE}/api/site/`, cacheOptions);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    return { ...siteFallback, ...data, source: "django" };
  } catch {
    return { ...siteFallback, source: "local" };
  }
}

export { API_BASE };
