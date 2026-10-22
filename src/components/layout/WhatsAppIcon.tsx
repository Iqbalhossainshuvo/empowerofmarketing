/** Simple speech-bubble-with-phone glyph (original drawing, not the WhatsApp logo). */
export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9 8.6c0 3.3 2.9 6.4 6.3 6.4l1.2-1.5-2-1-1 .9c-1.2-.5-2.3-1.6-2.8-2.8l.9-1-1-2z" />
    </svg>
  );
}
