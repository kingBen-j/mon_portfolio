"use client";

import { useState } from "react";
import { WhatsAppGlyph } from "@/components/layout/Header";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/data/profile";
import { API_BASE } from "@/lib/api";

const SUBJECTS = [
  "Création d'un site web",
  "Application / logiciel sur mesure",
  "Réseau & infrastructure",
  "Maintenance ou dépannage",
  "Proposition de collaboration",
  "Autre demande",
];

const EMPTY = { name: "", email: "", subject: SUBJECTS[0], message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [saved, setSaved] = useState(true);

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const composed = buildWhatsAppMessage(form);
  const link = whatsappLink(composed);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    // 1. On archive le message côté Django (visible dans l'admin).
    let stored = true;
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      stored = res.ok;
    } catch {
      stored = false;
    }

    // 2. Puis on bascule la conversation sur WhatsApp.
    setSaved(stored);
    setStatus("sent");
    window.setTimeout(() => {
      window.location.href = link;
    }, 1400);
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-blue-deep/50 bg-panel-2 p-8 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-ghost">
          <WhatsAppGlyph className="h-6 w-6 text-blue" />
        </span>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          Message prêt — <span className="accent">direction WhatsApp</span>
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-mute">
          {saved
            ? "Votre demande a bien été enregistrée. "
            : "Votre demande part directement sur WhatsApp. "}
          L&apos;application s&apos;ouvre dans un instant avec le message déjà rédigé.
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-blue px-6 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:bg-blue-soft"
        >
          <WhatsAppGlyph className="h-[18px] w-[18px]" />
          Ouvrir WhatsApp maintenant
        </a>

        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setStatus("idle");
          }}
          className="mt-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-mute-2 transition-colors hover:text-chalk"
        >
          ← Rédiger un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-panel/50 p-7 sm:p-9"
    >
      <div className="flex items-start justify-between gap-6 border-b border-line pb-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Décrivez votre <span className="accent">besoin</span>
          </h3>
          <p className="mt-2 text-sm text-mute">
            Le message part ensuite sur WhatsApp, déjà rédigé.
          </p>
        </div>
        <span className="hidden shrink-0 rounded-md border border-line bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mute-2 sm:block">
          Direct
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Nom" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Votre nom"
            className={inputClass}
          />
        </Field>

        <Field label="E-mail" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="vous@exemple.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Type de demande">
          <select value={form.subject} onChange={update("subject")} className={inputClass}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="bg-ink">
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" required hint={`${form.message.length} / 2000`}>
          <textarea
            required
            rows={6}
            maxLength={2000}
            value={form.message}
            onChange={update("message")}
            placeholder="Expliquez votre projet, vos contraintes, vos délais..."
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-blue px-6 py-4 text-sm font-medium text-ink transition-all duration-500 hover:bg-blue-soft hover:shadow-[0_0_38px_-6px_rgba(53,167,255,0.75)] disabled:cursor-wait disabled:opacity-60"
      >
        <WhatsAppGlyph className="h-[18px] w-[18px]" />
        {status === "sending" ? "Préparation..." : "Envoyer sur WhatsApp"}
      </button>

      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-mute-2">
        Conversation directe · {WHATSAPP_DISPLAY}
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-sm text-chalk outline-none transition-colors duration-500 placeholder:text-mute-2 focus:border-blue-deep";

function Field({ label, children, required, hint }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-mute-2">
        <span>
          {label}
          {required && <span className="ml-1 text-blue-deep">*</span>}
        </span>
        {hint && <span>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function buildWhatsAppMessage({ name, email, subject, message }) {
  return [
    "Bonjour BenDev,",
    "",
    `Nom : ${name || "—"}`,
    `E-mail : ${email || "—"}`,
    `Sujet : ${subject}`,
    "",
    message || "—",
    "",
    "(Envoyé depuis votre portfolio)",
  ].join("\n");
}
