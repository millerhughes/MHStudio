import Link from "next/link";
import { MAILTO, CONTACT_EMAIL } from "@/lib/site";

/**
 * Labelled contact actions laid out as ruled rows, never as card tiles. Hover
 * lifts the label and icon to the brand accent only. Email-only for launch (no
 * phone channel yet). Drop it inline anywhere a contact moment is wanted
 * (offer, footer).
 */
const channels = [
  { label: "Email me", sub: CONTACT_EMAIL, href: MAILTO, icon: "mail" as const },
];

export function ContactBand({ className }: { className?: string }) {
  return (
    <div
      className={[
        "flex flex-col divide-y divide-border border-y border-border",
        "sm:flex-row sm:divide-x sm:divide-y-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {channels.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group flex flex-1 items-center gap-3.5 py-4 sm:px-6"
        >
          <span className="text-ink/55 transition-colors group-hover:text-primary">
            <Icon name={c.icon} />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-primary">
              {c.label}
            </span>
            <span className="truncate text-sm text-muted">{c.sub}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function Icon({ name }: { name: "mail" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "shrink-0",
  };
  // Only the mail channel is live at launch (no phone yet).
  return (
    <svg {...common} aria-label={name}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}
