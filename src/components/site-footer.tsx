import Link from "next/link";
import { Wordmark } from "./wordmark";
import { ContactBand } from "./contact-band";
import { NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="#top" aria-label="MH Studio, home" className="text-ink">
              <Wordmark />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Full-stack web studio. Bespoke sites for local businesses, built
              from scratch and shipped fast.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <ContactBand className="mt-10" />

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <span className="mark-label">MH Studio · Full-stack web design · UK</span>
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} MH Studio
          </span>
        </div>
      </div>
    </footer>
  );
}
