/**
 * Blueprint frame — a precise "drafted website" rendered as an SVG scene. The
 * hero's imagery: conveys the studio's promise (bespoke sites, drawn to spec)
 * via measurement ticks, registration corners and a clean wireframed layout.
 * Pure SVG, no raster dependency. Decorative to AT (aria-hidden) — the message
 * is carried in copy.
 */
export function BlueprintFrame({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 440 340"
      fill="none"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* measurement guides */}
      <g stroke="var(--border)" strokeWidth="1">
        <line x1="20" y1="34" x2="420" y2="34" strokeDasharray="2 5" />
        <line x1="20" y1="34" x2="20" y2="320" strokeDasharray="2 5" />
      </g>
      <g stroke="var(--primary)" strokeWidth="1.5">
        <line x1="20" y1="26" x2="20" y2="42" />
        <line x1="420" y1="26" x2="420" y2="42" />
        <line x1="12" y1="34" x2="28" y2="34" />
      </g>
      <text x="220" y="22" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="var(--muted)">
        1440 · FLUID
      </text>

      {/* browser window */}
      <g>
        <rect x="40" y="48" width="360" height="266" rx="10" fill="white" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="40" y="48" width="360" height="34" rx="10" fill="var(--panel)" />
        <rect x="40" y="74" width="360" height="8" fill="var(--panel)" />
        <circle cx="58" cy="65" r="3.5" fill="var(--border)" />
        <circle cx="70" cy="65" r="3.5" fill="var(--border)" />
        <circle cx="82" cy="65" r="3.5" fill="var(--primary)" />
        <rect x="150" y="60" width="140" height="10" rx="5" fill="white" stroke="var(--border)" />

        {/* nav row */}
        <rect x="58" y="98" width="40" height="8" rx="4" fill="var(--ink)" />
        <rect x="270" y="98" width="22" height="8" rx="4" fill="var(--border)" />
        <rect x="300" y="98" width="22" height="8" rx="4" fill="var(--border)" />
        <rect x="332" y="96" width="50" height="14" rx="7" fill="var(--primary)" />

        {/* hero headline blocks */}
        <rect x="58" y="132" width="190" height="15" rx="4" fill="var(--ink)" />
        <rect x="58" y="154" width="150" height="15" rx="4" fill="var(--ink)" />
        <rect x="58" y="182" width="170" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
        <rect x="58" y="194" width="120" height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
        <rect x="58" y="214" width="72" height="20" rx="10" fill="var(--primary)" />
        <rect x="138" y="214" width="64" height="20" rx="10" fill="white" stroke="var(--border)" />

        {/* hero image panel with crop mark */}
        <rect x="272" y="128" width="110" height="120" rx="6" fill="var(--panel)" stroke="var(--border)" />
        <path d="M272 128 L382 248 M382 128 L272 248" stroke="var(--border)" strokeWidth="1" opacity="0.6" />
        <path d="M268 124h10M268 124v10M386 252h-10M386 252v-10" stroke="var(--primary)" strokeWidth="1.5" />

        {/* three cards */}
        <rect x="58" y="268" width="96" height="30" rx="6" fill="white" stroke="var(--border)" />
        <rect x="166" y="268" width="96" height="30" rx="6" fill="white" stroke="var(--border)" />
        <rect x="274" y="268" width="96" height="30" rx="6" fill="white" stroke="var(--border)" />
        <rect x="66" y="278" width="30" height="5" rx="2.5" fill="var(--muted)" opacity="0.5" />
        <rect x="174" y="278" width="30" height="5" rx="2.5" fill="var(--muted)" opacity="0.5" />
        <rect x="282" y="278" width="30" height="5" rx="2.5" fill="var(--muted)" opacity="0.5" />
      </g>
    </svg>
  );
}
