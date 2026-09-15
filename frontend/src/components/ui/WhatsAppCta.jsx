import { WhatsAppGlyph } from "@/components/layout/Header";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/data/profile";

export default function WhatsAppCta({
  message,
  label = "Discuter sur WhatsApp",
  variant = "solid",
  showNumber = false,
  className = "",
}) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-500";

  const styles =
    variant === "solid"
      ? "bg-blue text-ink hover:bg-blue-soft hover:shadow-[0_0_38px_-6px_rgba(53,167,255,0.75)]"
      : "border border-line bg-panel/60 text-chalk hover:border-blue-deep hover:text-blue-soft";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsAppGlyph className="h-[18px] w-[18px]" />
      <span>{label}</span>
      {showNumber && (
        <span className="hidden font-mono text-xs opacity-70 sm:inline">
          {WHATSAPP_DISPLAY}
        </span>
      )}
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </a>
  );
}
