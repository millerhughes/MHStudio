import { LogoMark } from "./logo-mark";

/**
 * MH Studio wordmark. Founder-initials lockup with the isometric MH-cube logo
 * glyph — an outline cube carrying the M and H on its two front faces. Signals
 * design, depth and precision, carrying forward the earlier proof-mark lineage.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        fontSize: "1.15rem",
        lineHeight: 1,
      }}
    >
      <LogoMark size={18} />
      <span>
        MH
        <span style={{ fontWeight: 500, color: "var(--muted)", marginLeft: "0.18em" }}>
          Studio
        </span>
      </span>
    </span>
  );
}
