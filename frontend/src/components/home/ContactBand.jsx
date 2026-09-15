import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import WhatsAppCta from "@/components/ui/WhatsAppCta";
import { WHATSAPP_DISPLAY } from "@/data/profile";

export default function ContactBand() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="halo opacity-70" />

      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-panel-2 via-panel to-ink px-7 py-14 sm:px-14 sm:py-20">
          <div className="gridlines opacity-30" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">Canal ouvert</p>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Une idée à <span className="accent">concrétiser</span> ?
                <br />
                <span className="accent-serif">Parlons-en simplement.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-mute">
                Le plus direct reste WhatsApp : un message, une réponse en moins de 24 h.
                Pas de formulaire interminable, juste une conversation.
              </p>
              <p className="mt-4 font-mono text-sm text-blue-soft">{WHATSAPP_DISPLAY}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <WhatsAppCta
                message="Bonjour BenDev, j'aimerais discuter d'un projet avec vous."
                label="Écrire sur WhatsApp"
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-ink/60 px-6 py-3.5 text-sm text-mute transition-all duration-500 hover:border-blue-deep hover:text-chalk"
              >
                Autres moyens de contact
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
