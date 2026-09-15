/**
 * Normalise l'URL de l'API.
 *
 * Render fournit l'hôte d'un service sans protocole (« bendev-api.onrender.com »)
 * quand on branche une variable avec `fromService`. On complète donc le schéma
 * nous-mêmes, plutôt que d'obliger à recopier l'URL complète à la main.
 *
 * Utilisé à la fois par next.config.mjs (Node) et par src/lib/api.js (bundle).
 */

export const DEFAULT_API_URL = "http://127.0.0.1:8000";

const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)(:\d+)?$/i;

export function resolveApiUrl(raw) {
  const value = (raw || "").trim();
  if (!value) return DEFAULT_API_URL;

  const withScheme = /^https?:\/\//i.test(value)
    ? value
    : `${LOCAL_HOSTS.test(value) ? "http" : "https"}://${value}`;

  return withScheme.replace(/\/+$/, "");
}

export function isLocalApi(apiUrl) {
  try {
    return LOCAL_HOSTS.test(new URL(apiUrl).host);
  } catch {
    return false;
  }
}
