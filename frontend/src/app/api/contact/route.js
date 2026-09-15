import { API_BASE } from "@/lib/api";

/**
 * Relais du formulaire de contact vers Django.
 *
 * Le navigateur parle à ce point d'entrée, servi par la même origine que le
 * site : aucune requête cross-origin, donc aucun CORS à configurer entre le
 * front et l'API une fois les deux en ligne.
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ detail: "Requête invalide." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await res.json().catch(() => ({}));
    return Response.json(body, { status: res.status });
  } catch {
    // L'API est injoignable : le front bascule quand même sur WhatsApp,
    // le message n'est simplement pas archivé.
    return Response.json(
      { detail: "API injoignable, message non enregistré." },
      { status: 502 }
    );
  }
}
