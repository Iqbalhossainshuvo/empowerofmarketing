/** Page-section backdrop: drifting grid + coloured auras. Purely decorative. */
export function Backdrop({ tone = "blue" }: { tone?: "blue" | "violet" | "mint" }) {
  const a = { blue: "bg-blue/40", violet: "bg-violet/35", mint: "bg-mint/20" }[tone];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-bg" />
      <div className={`aura ${a} -top-40 start-1/2 size-[36rem] -translate-x-1/2`} />
    </div>
  );
}
