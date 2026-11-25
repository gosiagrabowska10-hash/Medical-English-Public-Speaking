export const site = {
  name: "The Medical Speaking Academy",
  shortName: "Medical Speaking Academy",
  tagline: "Your Expertise Deserves to Be Heard.",
  secondary: "Speak with Confidence. Communicate with Authority. Inspire Through Knowledge.",
  description:
    "An independent international academy teaching medical public speaking and professional English communication to doctors and medical professionals whose first language is not English.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en",
  // Contact details are intentionally empty until the Academy provides verified information.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  program: {
    name: "Medical Public Speaking Professional Program",
    weeks: 10,
    modules: 12,
    lessons: 30,
    workshops: 6,
    priceAmount: 1490,
    priceCurrency: "PLN",
  },
} as const;

export const mainNav = [
  { href: "/about", label: "Academy" },
  { href: "/methodology", label: "Method" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/ai-teachers", label: "AI Faculty" },
  { href: "/speaking-studio", label: "Speaking Studio" },
  { href: "/pricing", label: "Admissions" },
] as const;

export const footerNav = {
  Academy: [
    { href: "/about", label: "About the Academy" },
    { href: "/founder", label: "Founder" },
    { href: "/methodology", label: "Methodology" },
    { href: "/instructors", label: "Faculty" },
    { href: "/contact", label: "Contact" },
  ],
  Program: [
    { href: "/curriculum", label: "Curriculum" },
    { href: "/ai-teachers", label: "AI Faculty" },
    { href: "/speaking-studio", label: "Speaking Studio" },
    { href: "/pricing", label: "Tuition & Admissions" },
    { href: "/faq", label: "Questions" },
  ],
  Insights: [
    { href: "/blog", label: "Journal" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
} as const;
