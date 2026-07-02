/**
 * Registration / crop marks — the signature "proof mark" device.
 * Four corner ticks framing a region, like a print proof. Structural, used to
 * frame key compositions, never as filler decoration.
 */
export function CropMarks({
  className,
  color = "var(--primary)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span aria-hidden className={className} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Corner pos="tl" color={color} />
      <Corner pos="tr" color={color} />
      <Corner pos="bl" color={color} />
      <Corner pos="br" color={color} />
    </span>
  );
}

function Corner({ pos, color }: { pos: "tl" | "tr" | "bl" | "br"; color: string }) {
  const base: React.CSSProperties = { position: "absolute", width: 10, height: 10 };
  const edges: Record<typeof pos, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    tr: { top: -1, right: -1, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    bl: { bottom: -1, left: -1, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    br: { bottom: -1, right: -1, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
  } as const;
  return <span aria-hidden style={{ ...base, ...edges[pos] }} />;
}

/**
 * A short forest-teal proofing underline, the maker's confirming stroke under a
 * key word. Slightly hand-drawn tilt.
 */
export function ProofMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block", width: "100%", height: "0.42em" }}
    >
      <path
        d="M2 8.5 C 30 4, 60 10, 92 5.5 S 116 7, 118 6"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
