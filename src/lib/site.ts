/**
 * Central contact config. Used by nav, hero, offer, footer and the final CTA.
 *
 * Email-only for launch (no phone yet): a WhatsApp Business channel can be
 * added later as a fast follow.
 *
 * SWAP CONTACT_EMAIL: replace with a dedicated studio address when set up
 * (e.g. hello@mhstudio.co.uk). A non-Gmail address converts better on cold outreach.
 */
export const CONTACT_EMAIL = "millerbhughes1@gmail.com";

export const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Website enquiry via MH Studio"
)}&body=${encodeURIComponent(
  "Hi Miller,\n\nMy business is ____ and the problem with my current site is ____.\nWhat I need from a new site: ____\n\nThanks,"
)}`;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;
