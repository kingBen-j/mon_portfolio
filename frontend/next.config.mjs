import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveApiUrl, isLocalApi } from "./src/lib/api-url.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_URL = resolveApiUrl(process.env.NEXT_PUBLIC_API_URL);
const api = new URL(API_URL);

// Django tourne en local pendant le développement. Next 16 refuse par défaut
// d'optimiser une image servie depuis une IP locale (protection anti-SSRF) :
// on ne lève cette protection que lorsque l'API est effectivement locale.
const apiIsLocal = isLocalApi(API_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Évite que Turbopack remonte au-dessus du projet pour chercher un lockfile.
  turbopack: { root: __dirname },

  images: {
    dangerouslyAllowLocalIP: apiIsLocal,

    // Les visuels (portrait, captures de projets) sont servis par Django.
    // Le motif suit automatiquement NEXT_PUBLIC_API_URL en production.
    remotePatterns: [
      {
        protocol: api.protocol.replace(":", ""),
        hostname: api.hostname,
        port: api.port,
        pathname: "/media/**",
      },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/media/**" },
    ],
  },
};

export default nextConfig;
