"use client";

const JS = "https://assets.calendly.com/assets/external/widget.js";
const CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyApi = {
  initPopupWidget: (opts: { url: string; utm?: Record<string, string> }) => void;
};
declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

let loading: Promise<boolean> | null = null;

/** Loads Calendly's widget on demand. Resolves true when ready, false if it failed. */
export function loadCalendly(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Calendly) return Promise.resolve(true);
  if (loading) return loading;
  loading = new Promise<boolean>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CSS;
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = JS;
    script.async = true;
    script.onload = () => resolve(!!window.Calendly);
    script.onerror = () => {
      loading = null; // allow a later retry
      script.remove();
      resolve(false);
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function isCalendlyReady(): boolean {
  return typeof window !== "undefined" && !!window.Calendly;
}
