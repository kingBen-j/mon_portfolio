export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[11px] tracking-wide text-mute transition-colors duration-500 hover:border-blue-deep hover:text-blue-soft">
      {children}
    </span>
  );
}
