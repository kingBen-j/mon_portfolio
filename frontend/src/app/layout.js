import { Inter, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "BenDev — L'informatique au service de vos idées",
    template: "%s · BenDev",
  },
  description:
    "Portfolio de Coulibaly Israel — développeur web freelance à Abidjan. Je transforme vos idées en réalité.",
};

export const viewport = {
  themeColor: "#04070d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          {/* Les animations d'apparition dépendent de JS : sans lui, tout reste visible. */}
          <style>{`body{}.reveal{opacity:1!important;transform:none!important}.level-fill{transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${plexMono.variable} ${instrument.variable} grain antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
