// Facts about the book. Chapter themes are short labels (not quoted text) — translated
// display copy lives in messages/*.json under Book.chapters.
export const book = {
  title: "Empire of Marketing",
  subtitle: "The Practical A–Z Marketing Field Guide",
  author: "Md. Iqbal Hossain",
  edition: "First English Edition, 2026",
  formats: ["kindle", "paperback", "hardcover"] as const,
};

export const chapterLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const journeySteps = [
  "problem",
  "customer",
  "offer",
  "attention",
  "conversion",
  "experience",
  "retention",
  "referral",
  "growth",
] as const;
