export const site = {
  name: "Empower of Marketing",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://empowerofmarketing.vercel.app").replace(/\/$/, ""),
  whatsapp: "966510356264",
  whatsappDisplay: "+966 51 035 6264",
  email: "empireofmarketing4@gmail.com",
  calendlyUrl: "https://calendly.com/iqbalshuvo/discuss-problem-solution-growth",
  amazonUrl: "https://www.amazon.com/dp/B0H71PC4QF",
  social: {
    linkedin: "https://www.linkedin.com/in/mdiqbalhossainmarketingspecialist",
    medium: "https://medium.com/@mdiqbalhossain203050",
    x: null as string | null,
  },
} as const;
