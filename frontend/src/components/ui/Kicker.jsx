export default function Kicker({ children, dot = true, className = "" }) {
  return (
    <p className={`kicker flex items-center gap-2.5 ${className}`}>
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_10px_2px_rgba(53,167,255,0.6)]" />
      )}
      {children}
    </p>
  );
}
