import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mhughesstudio.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MH Studio · bespoke websites for local businesses, built fast",
    template: "%s · MH Studio",
  },
  description:
    "MH Studio is a full-stack web studio building bespoke websites for local businesses. Designed around your customers, shipped in days, looked after for the long run.",
  openGraph: {
    title: "MH Studio · bespoke websites for local businesses, built fast",
    description:
      "Bespoke websites for local businesses. Designed around your customers, shipped in days.",
    url: SITE_URL,
    siteName: "MH Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class to
    // <html> before hydration (progressive-enhancement flag for reveals). That
    // is an intentional server/client attribute difference on this one element,
    // so we tell React not to flag it. Scope is <html>'s own attributes only.
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script
          // Set the js flag before paint so reveal animations never flash.
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
