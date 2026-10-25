// Generates one clean, on-brand illustration per service and solution into public/images/.
// Run: node scripts/make-illustrations.mjs   (pure SVG, no dependencies)
import { mkdirSync, writeFileSync } from "node:fs";

const W = 800;
const H = 600;
const C = {
  bg: "#0a0f1e",
  panel: "#111a33",
  panel2: "#18223f",
  line: "#2a3658",
  muted: "#55648a",
  text: "#c9d3ea",
  mint: "#7cf5b4",
  sky: "#60a5fa",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  gold: "#f5c46b",
  pink: "#f472b6",
};

const defs = `
<defs>
  <linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${C.violet}"/><stop offset=".55" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.mint}"/></linearGradient>
  <linearGradient id="gv" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.blue}" stop-opacity=".35"/><stop offset="1" stop-color="${C.mint}"/></linearGradient>
  <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2647"/><stop offset="1" stop-color="#111a33"/></linearGradient>
  <radialGradient id="halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.sky}" stop-opacity=".45"/><stop offset="1" stop-color="${C.sky}" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.violet}" stop-opacity=".4"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity=".55"/></filter>
</defs>`;

const frame = (inner, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<title>${title}</title>${defs}
<rect width="${W}" height="${H}" rx="36" fill="${C.bg}"/>
<rect width="${W}" height="${H}" rx="36" fill="url(#grid)"/>
<circle cx="600" cy="140" r="260" fill="url(#halo)"/>
<circle cx="170" cy="500" r="240" fill="url(#halo2)"/>
${inner}
</svg>`;

// ---------- helpers ----------
const card = (x, y, w, h, r = 20, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#card)" stroke="${C.line}" filter="url(#shadow)" ${extra}/>`;
const bar = (x, y, w, h = 10, color = C.line, r = 5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${color}"/>`;
const dot = (x, y, r, color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const browser = (x, y, w, h) =>
  card(x, y, w, h, 22) +
  `<path d="M${x} ${y + 44}H${x + w}" stroke="${C.line}"/>` +
  dot(x + 26, y + 22, 6, "#f87171") + dot(x + 46, y + 22, 6, C.gold) + dot(x + 66, y + 22, 6, C.mint) +
  bar(x + 96, y + 16, w - 130, 12, C.panel2, 6);
const person = (x, y, s = 1, color = C.sky) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-26" r="16" fill="${color}"/><path d="M-28 22c0-20 12-32 28-32s28 12 28 32z" fill="${color}" opacity=".85"/></g>`;
const check = (x, y, r = 16) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.mint}"/><path d="M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.32} ${r * 0.6}-${r * 0.62}" fill="none" stroke="${C.bg}" stroke-width="${r * 0.22}" stroke-linecap="round" stroke-linejoin="round"/>`;
const sparkle = (x, y, s = 1, color = C.mint) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0-14C2-4 4-2 14 0 4 2 2 4 0 14-2 4-4 2-14 0-4-2-2-4 0-14z" fill="${color}" filter="url(#glow)"/>`;

// ---------- illustrations ----------
const art = {
  "services/digital-marketing": {
    title: "Digital marketing: paid ads, SEO and analytics dashboard",
    body: () => {
      const bars = [70, 110, 95, 150, 190, 240];
      return (
        browser(80, 90, 440, 320) +
        bars.map((h, i) => `<rect x="${120 + i * 58}" y="${370 - h}" width="38" height="${h}" rx="9" fill="url(#gv)"/>`).join("") +
        `<path d="M139 300L197 262L255 280L313 214L371 172L429 118" fill="none" stroke="${C.mint}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>` +
        dot(429, 118, 9, C.mint) +
        // target
        card(470, 250, 230, 230, 28) +
        [70, 50, 30].map((r, i) => `<circle cx="585" cy="365" r="${r}" fill="none" stroke="${i % 2 ? C.sky : C.violet}" stroke-width="8"/>`).join("") + dot(585, 365, 12, C.mint) +
        `<path d="M690 260L600 352" stroke="${C.text}" stroke-width="6" stroke-linecap="round"/><path d="M690 260l-6 26 26-6z" fill="${C.text}"/>` +
        // seo magnifier chip
        card(560, 96, 170, 112, 22) +
        `<circle cx="604" cy="146" r="22" fill="none" stroke="${C.sky}" stroke-width="7"/><path d="M620 162l18 18" stroke="${C.sky}" stroke-width="8" stroke-linecap="round"/>` +
        bar(652, 132, 56, 10, C.line) + bar(652, 152, 40, 10, C.mint) +
        sparkle(120, 470, 1.2) + sparkle(740, 70, 0.8, C.violet)
      );
    },
  },
  "services/traditional-marketing": {
    title: "Traditional marketing: storefront, posters, billboard and WhatsApp offers",
    body: () =>
      // billboard
      card(80, 80, 300, 170, 18) +
      `<rect x="100" y="100" width="260" height="130" rx="10" fill="url(#g)" opacity=".85"/>` +
      bar(122, 130, 150, 18, "#ffffff") + bar(122, 162, 110, 12, "#ffffff", 6) + `<circle cx="318" cy="168" r="30" fill="#ffffff" opacity=".25"/>` +
      `<rect x="222" y="250" width="16" height="140" fill="${C.line}"/>` +
      // storefront
      card(400, 180, 320, 300, 18) +
      `<path d="M400 230h320v44c-20 18-40 18-53 0-13 18-40 18-53 0-13 18-40 18-53 0-13 18-40 18-53 0-13 18-40 18-54 0-13 18-40 18-54 0z" fill="${C.violet}"/>` +
      `<path d="M453 230v44M506 230v44M559 230v44M612 230v44M666 230v44" stroke="#ffffff" stroke-opacity=".25" stroke-width="4"/>` +
      `<rect x="430" y="310" width="120" height="140" rx="8" fill="${C.panel2}" stroke="${C.line}"/>` +
      `<rect x="580" y="310" width="110" height="80" rx="8" fill="${C.sky}" opacity=".25"/>` +
      bar(594, 330, 70, 10, C.mint) + bar(594, 350, 50, 10, "#ffffff") +
      // megaphone
      `<g transform="translate(130 430)"><path d="M0 0l90-40v100L0 20z" fill="${C.gold}"/><rect x="-26" y="-8" width="30" height="36" rx="8" fill="${C.gold}"/><path d="M108-20c14 16 14 44 0 60" fill="none" stroke="${C.gold}" stroke-width="6" stroke-linecap="round"/><path d="M124-36c24 28 24 76 0 104" fill="none" stroke="${C.gold}" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/></g>` +
      // qr
      `<g transform="translate(600 410)">${card(0, 0, 90, 90, 14)}${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ((r + c) % 2 === 0 ? `<rect x="${14 + c * 22}" y="${14 + r * 22}" width="18" height="18" rx="3" fill="${C.text}"/>` : ""))).join("")}</g>` +
      sparkle(740, 120, 1, C.gold),
  },
  "services/business-growth": {
    title: "Business growth: rising sales chart, funnel and operations system",
    body: () => {
      const steps = [80, 130, 190, 260, 330];
      return (
        card(70, 90, 420, 400, 26) +
        steps.map((h, i) => `<rect x="${110 + i * 70}" y="${450 - h}" width="50" height="${h}" rx="10" fill="url(#gv)"/>`).join("") +
        `<path d="M110 380C200 360 260 300 330 230S440 140 470 110" fill="none" stroke="${C.mint}" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>` +
        `<path d="M470 110l-30 4 20 24z" fill="${C.mint}"/>` +
        // funnel
        card(520, 90, 210, 220, 24) +
        `<path d="M560 130h130l-40 60v50l-50 30v-80z" fill="url(#g)"/>` +
        dot(585, 112, 6, C.text) + dot(625, 108, 6, C.text) + dot(665, 114, 6, C.text) +
        `<circle cx="625" cy="290" r="9" fill="${C.mint}"/>` +
        // gear
        card(520, 330, 210, 160, 24) +
        `<g transform="translate(590 410)"><circle r="34" fill="none" stroke="${C.sky}" stroke-width="12" stroke-dasharray="14 9"/><circle r="16" fill="${C.sky}"/></g>` +
        `<g transform="translate(670 395)"><circle r="20" fill="none" stroke="${C.violet}" stroke-width="9" stroke-dasharray="9 6"/><circle r="8" fill="${C.violet}"/></g>` +
        check(690, 455, 14)
      );
    },
  },
  "services/business-setup": {
    title: "Business setup: launch roadmap from idea to first customers",
    body: () =>
      `<path d="M110 470C230 470 220 330 350 330S470 210 600 200" fill="none" stroke="${C.line}" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>` +
      [[110, 470], [350, 330], [600, 200]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="20" fill="${C.bg}" stroke="${i === 2 ? C.mint : C.sky}" stroke-width="7"/>`).join("") +
      // flag
      `<path d="M600 200v-90" stroke="${C.text}" stroke-width="6" stroke-linecap="round"/><path d="M603 112h66l-16 22 16 22h-66z" fill="${C.mint}"/>` +
      // rocket
      `<g transform="translate(250 230) rotate(40)" filter="url(#shadow)">
        <path d="M0-110c34 30 44 80 30 130H-30C-44-30-34-80 0-110z" fill="#e8ecf5"/>
        <circle cx="0" cy="-40" r="16" fill="${C.blue}" stroke="${C.sky}" stroke-width="5"/>
        <path d="M-30 0l-30 40 34-6zM30 0l30 40-34-6z" fill="${C.violet}"/>
        <path d="M-18 20h36l-6 20h-24z" fill="${C.line}"/>
        <path d="M-12 44q12 60 0 70q-12-10 0-70zM12 44q0 50-12 70" fill="${C.gold}" filter="url(#glow)"/>
      </g>` +
      // checklist card
      card(470, 320, 250, 170, 22) +
      [0, 1, 2].map((i) => (i < 2 ? check(506, 362 + i * 44, 13) : `<circle cx="506" cy="${362 + i * 44}" r="13" fill="none" stroke="${C.muted}" stroke-width="4"/>`) + bar(534, 356 + i * 44, i === 2 ? 110 : 150, 12, i < 2 ? C.text : C.line)).join("") +
      sparkle(700, 90, 1.1) + sparkle(130, 140, 0.8, C.violet),
  },
  "services/ai-automation": {
    title: "AI automation: AI assistant connected to workflows and instant replies",
    body: () => {
      const nodes = [[150, 150], [150, 300], [150, 450], [650, 150], [650, 300], [650, 450]];
      return (
        nodes.map(([x, y]) => `<path d="M400 300C${x < 400 ? 300 : 500} 300 ${x < 400 ? 260 : 540} ${y} ${x} ${y}" fill="none" stroke="url(#g)" stroke-width="4" opacity=".8"/>`).join("") +
        nodes.map(([x, y], i) => card(x - 60, y - 36, 120, 72, 18) + `<circle cx="${x - 30}" cy="${y}" r="14" fill="${[C.sky, C.violet, C.mint][i % 3]}"/>` + bar(x - 8, y - 12, 50, 9, C.text) + bar(x - 8, y + 4, 34, 9, C.line)).join("") +
        `<circle cx="400" cy="300" r="120" fill="url(#halo)"/>` +
        `<rect x="330" y="230" width="140" height="140" rx="36" fill="url(#g)" filter="url(#glow)"/>` +
        `<rect x="350" y="250" width="100" height="100" rx="26" fill="${C.bg}"/>` +
        `<circle cx="382" cy="292" r="10" fill="${C.mint}"/><circle cx="418" cy="292" r="10" fill="${C.mint}"/><path d="M380 322q20 14 40 0" fill="none" stroke="${C.mint}" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M400 230v-24" stroke="${C.sky}" stroke-width="6" stroke-linecap="round"/>` + dot(400, 200, 9, C.sky) +
        sparkle(470, 210, 0.9) + sparkle(320, 400, 0.7, C.violet)
      );
    },
  },
  "services/video-editing": {
    title: "Marketing video editing: video player, editing timeline and vertical reels",
    body: () =>
      card(70, 80, 450, 280, 24) +
      `<rect x="92" y="102" width="406" height="210" rx="14" fill="url(#g)" opacity=".55"/>` +
      `<circle cx="295" cy="207" r="44" fill="${C.bg}" opacity=".7"/><path d="M282 184v46l38-23z" fill="#ffffff"/>` +
      bar(92, 330, 406, 8, C.line, 4) + bar(92, 330, 250, 8, C.mint, 4) + dot(342, 334, 10, C.mint) +
      // timeline
      card(70, 390, 450, 130, 22) +
      [[100, 140, C.violet], [250, 110, C.sky], [370, 120, C.mint]].map(([x, w, c]) => `<rect x="${x}" y="414" width="${w}" height="34" rx="8" fill="${c}" opacity=".85"/>`).join("") +
      [[100, 200, C.gold], [310, 180, C.pink]].map(([x, w, c]) => `<rect x="${x}" y="462" width="${w}" height="34" rx="8" fill="${c}" opacity=".7"/>`).join("") +
      `<path d="M300 404v108" stroke="#ffffff" stroke-width="3"/><path d="M292 400h16l-8 10z" fill="#ffffff"/>` +
      // phone reel
      `<g transform="translate(560 90)">${card(0, 0, 170, 330, 30)}<rect x="12" y="14" width="146" height="302" rx="20" fill="url(#g)" opacity=".4"/>
        <circle cx="85" cy="150" r="30" fill="${C.bg}" opacity=".6"/><path d="M76 136v28l24-14z" fill="#fff"/>
        ${bar(26, 250, 100, 10, "#ffffff")}${bar(26, 270, 70, 10, "#ffffff")}
        <path d="M138 214c0-10 14-10 14 0 0 10-14 18-14 18s-14-8-14-18c0-10 14-10 14 0z" fill="${C.pink}"/></g>` +
      sparkle(740, 470, 1),
  },
  "solutions/web-development": {
    title: "Website development: responsive business website on desktop and mobile",
    body: () =>
      browser(70, 80, 520, 380) +
      `<rect x="100" y="150" width="240" height="22" rx="8" fill="${C.text}"/>` + bar(100, 186, 190, 12, C.muted) + bar(100, 208, 160, 12, C.muted) +
      `<rect x="100" y="240" width="110" height="38" rx="19" fill="${C.mint}"/>` +
      `<rect x="370" y="150" width="190" height="140" rx="14" fill="url(#g)" opacity=".7"/>` +
      [0, 1, 2].map((i) => `<rect x="${100 + i * 160}" y="320" width="140" height="110" rx="12" fill="${C.panel2}" stroke="${C.line}"/>` + bar(116 + i * 160, 340, 60, 10, C.sky) + bar(116 + i * 160, 360, 100, 8, C.line) + bar(116 + i * 160, 376, 80, 8, C.line)).join("") +
      // code chip
      card(560, 330, 170, 120, 22) +
      `<text x="645" y="406" text-anchor="middle" font-family="ui-monospace,monospace" font-size="48" font-weight="700" fill="url(#g)">&lt;/&gt;</text>` +
      // phone
      `<g transform="translate(610 90)">${card(0, 0, 120, 220, 24)}<rect x="12" y="20" width="96" height="40" rx="8" fill="url(#g)" opacity=".7"/>${bar(12, 72, 80, 10, C.text)}${bar(12, 90, 60, 8, C.muted)}<rect x="12" y="112" width="96" height="60" rx="8" fill="${C.panel2}"/><rect x="12" y="184" width="54" height="20" rx="10" fill="${C.mint}"/></g>`,
  },
  "solutions/ui-ux-design": {
    title: "UI/UX design: app screens, wireframes and user flow",
    body: () => {
      const phone = (x, y, accent, rot = 0) =>
        `<g transform="translate(${x} ${y}) rotate(${rot})">${card(0, 0, 170, 320, 28)}
          <rect x="14" y="24" width="142" height="90" rx="14" fill="${accent}" opacity=".7"/>
          ${bar(14, 130, 110, 12, C.text)}${bar(14, 152, 80, 10, C.muted)}
          <rect x="14" y="180" width="66" height="60" rx="12" fill="${C.panel2}" stroke="${C.line}"/><rect x="90" y="180" width="66" height="60" rx="12" fill="${C.panel2}" stroke="${C.line}"/>
          <rect x="14" y="262" width="142" height="36" rx="18" fill="${C.mint}"/></g>`;
      return (
        `<path d="M250 300C300 220 360 220 410 300S520 380 570 300" fill="none" stroke="${C.line}" stroke-width="5" stroke-dasharray="4 12" stroke-linecap="round"/>` +
        phone(90, 140, C.violet, -6) + phone(315, 100, C.sky) + phone(540, 140, C.blue, 6) +
        // cursor
        `<path d="M470 360l0 70 18-18 14 30 14-7-14-29h26z" fill="#ffffff" stroke="${C.bg}" stroke-width="4" filter="url(#shadow)"/>` +
        [C.mint, C.sky, C.violet, C.gold].map((c, i) => `<circle cx="${330 + i * 40}" cy="500" r="14" fill="${c}"/>`).join("")
      );
    },
  },
  "solutions/graphic-design": {
    title: "Graphic design: logo, brand colors, pen tool and social media designs",
    body: () =>
      card(70, 80, 400, 400, 26) +
      `<path d="M120 400C150 200 330 160 420 160" fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M120 400L210 220M420 160L300 150" stroke="${C.muted}" stroke-width="3" stroke-dasharray="6 6"/>` +
      `<rect x="110" y="390" width="20" height="20" fill="${C.bg}" stroke="${C.mint}" stroke-width="4"/><rect x="410" y="150" width="20" height="20" fill="${C.bg}" stroke="${C.mint}" stroke-width="4"/>` +
      dot(210, 220, 9, C.sky) + dot(300, 150, 9, C.sky) +
      // pen nib
      `<g transform="translate(330 320) rotate(-35)" filter="url(#shadow)"><path d="M0-70l34 50-34 90-34-90z" fill="#e8ecf5"/><circle cx="0" cy="0" r="9" fill="${C.bg}"/><path d="M0 9v58" stroke="${C.bg}" stroke-width="4"/></g>` +
      // shapes
      card(500, 80, 230, 190, 24) +
      `<circle cx="560" cy="170" r="40" fill="${C.violet}"/><path d="M640 130l46 80h-92z" fill="${C.mint}"/><rect x="560" y="220" width="0" height="0"/>` +
      // palette
      card(500, 290, 230, 190, 24) +
      [C.mint, C.sky, C.violet, C.gold, C.pink, "#e8ecf5"].map((c, i) => `<rect x="${528 + (i % 3) * 62}" y="${318 + Math.floor(i / 3) * 70}" width="48" height="54" rx="10" fill="${c}"/>`).join(""),
  },
  "solutions/documents": {
    title: "Document services: company profiles, proposals, CVs and forms",
    body: () =>
      `<g transform="rotate(-8 300 300)">${card(150, 120, 280, 360, 22)}</g>` +
      `<g transform="rotate(5 340 300)">${card(220, 100, 280, 360, 22)}</g>` +
      card(260, 90, 300, 400, 22) +
      `<rect x="290" y="124" width="120" height="16" rx="8" fill="url(#g)"/>` +
      [0, 1, 2, 3, 4, 5].map((i) => bar(290, 170 + i * 30, i % 3 === 2 ? 170 : 240, 10, i === 0 ? C.text : C.line)).join("") +
      `<rect x="290" y="360" width="110" height="80" rx="10" fill="${C.panel2}" stroke="${C.line}"/>` + bar(306, 380, 70, 8, C.sky) + bar(306, 398, 50, 8, C.line) +
      `<path d="M440 420c20-30 40 10 60-20" fill="none" stroke="${C.sky}" stroke-width="5" stroke-linecap="round"/>` +
      // seal
      `<g transform="translate(600 420)"><circle r="56" fill="${C.mint}" opacity=".18"/>${check(0, 0, 38)}</g>` +
      // pen
      `<g transform="translate(620 170) rotate(35)"><rect x="-12" y="-110" width="24" height="170" rx="10" fill="${C.violet}"/><path d="M-12 60h24l-12 34z" fill="#e8ecf5"/></g>` +
      sparkle(140, 110, 1),
  },
  "solutions/travel-ticketing": {
    title: "Travel and ticketing: flights, boarding pass, hotel booking and visa support",
    body: () =>
      `<circle cx="250" cy="330" r="170" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>` +
      `<ellipse cx="250" cy="330" rx="170" ry="60" fill="none" stroke="${C.line}" stroke-width="2"/><ellipse cx="250" cy="330" rx="70" ry="170" fill="none" stroke="${C.line}" stroke-width="2"/>` +
      `<path d="M110 260C200 120 420 90 560 170" fill="none" stroke="url(#g)" stroke-width="5" stroke-dasharray="3 14" stroke-linecap="round"/>` +
      dot(110, 260, 10, C.sky) +
      // plane
      `<g transform="translate(560 165) rotate(28)" filter="url(#glow)"><path d="M-46 0c0-8 6-10 16-10h22l26-36h14l-12 36h28l10-14h10l-6 24 6 24h-10l-10-14h-28l12 36H18L-8 10h-22c-10 0-16-2-16-10z" fill="#ffffff"/></g>` +
      // boarding pass
      `<g transform="translate(440 300) rotate(-4)">${card(0, 0, 290, 150, 20)}<rect x="0" y="0" width="290" height="44" rx="20" fill="url(#g)" opacity=".85"/>
        <rect x="0" y="24" width="290" height="20" fill="url(#g)" opacity=".85"/>
        ${bar(22, 64, 60, 18, C.text, 6)}<path d="M100 73h60" stroke="${C.muted}" stroke-width="3" stroke-dasharray="5 5"/>${bar(178, 64, 60, 18, C.text, 6)}
        ${bar(22, 104, 90, 10, C.line)}${bar(22, 122, 60, 10, C.line)}
        <path d="M212 96v44" stroke="${C.line}" stroke-dasharray="4 4"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${228 + i * 7}" y="100" width="${i % 2 ? 3 : 5}" height="36" fill="${C.text}"/>`).join("")}</g>` +
      // hotel
      `<g transform="translate(560 470)">${card(0, 0, 170, 90, 16)}${[0, 1, 2, 3].map((i) => `<rect x="${16 + i * 38}" y="18" width="24" height="22" rx="4" fill="${C.gold}" opacity=".8"/>`).join("")}${bar(16, 56, 90, 10, C.line)}</g>`,
  },
  "solutions/training": {
    title: "Training: marketing, sales and AI tools workshop with presentation",
    body: () =>
      card(170, 70, 460, 290, 22) +
      `<path d="M400 360v60M330 440l70-20 70 20" stroke="${C.line}" stroke-width="8" stroke-linecap="round"/>` +
      [90, 130, 170, 120].map((h, i) => `<rect x="${220 + i * 60}" y="${320 - h}" width="40" height="${h}" rx="8" fill="url(#gv)"/>`).join("") +
      `<path d="M460 270l40-50 40 20 50-80" fill="none" stroke="${C.mint}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>` +
      bar(460, 110, 120, 14, C.text) + bar(460, 134, 90, 10, C.muted) +
      // audience
      person(140, 500, 1.1, C.sky) + person(270, 520, 1.1, C.violet) + person(530, 520, 1.1, C.mint) + person(660, 500, 1.1, C.sky) +
      // cap
      `<g transform="translate(680 150)" filter="url(#shadow)"><path d="M-70 0L0-34 70 0 0 34z" fill="${C.violet}"/><path d="M-40 16v34c26 18 54 18 80 0V16L0 34z" fill="#5b3fc4"/><path d="M58 6v46" stroke="${C.gold}" stroke-width="5"/>${dot(58, 56, 8, C.gold)}</g>`,
  },
  "solutions/manpower": {
    title: "Manpower services: recruitment, staff team and workforce management",
    body: () =>
      // team grid
      card(70, 80, 380, 300, 24) +
      [[150, 190, C.sky], [260, 190, C.violet], [370, 190, C.mint], [150, 320, C.violet], [260, 320, C.mint], [370, 320, C.sky]].map(([x, y, c]) => person(x, y, 1, c)).join("") +
      // id badge
      `<g transform="translate(490 70) rotate(4)">${card(0, 0, 230, 300, 24)}<rect x="90" y="-14" width="50" height="28" rx="8" fill="${C.line}"/>
        <rect x="0" y="0" width="230" height="70" rx="24" fill="url(#g)" opacity=".85"/><rect x="0" y="40" width="230" height="30" fill="url(#g)" opacity=".85"/>
        <circle cx="115" cy="120" r="40" fill="${C.panel2}" stroke="${C.sky}" stroke-width="5"/>${person(115, 140, 0.9, C.sky)}
        ${bar(55, 186, 120, 14, C.text)}${bar(75, 212, 80, 10, C.muted)}${check(115, 256, 18)}</g>` +
      // roster
      card(70, 400, 650, 130, 22) +
      [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${100 + i * 86}" y="424" width="70" height="80" rx="10" fill="${i === 3 ? C.mint : C.panel2}" opacity="${i === 3 ? 0.85 : 1}" stroke="${C.line}"/>` + bar(112 + i * 86, 440, 46, 8, i === 3 ? C.bg : C.line) + bar(112 + i * 86, 458, 30, 8, i === 3 ? C.bg : C.line)).join(""),
  },
};

for (const [name, { title, body }] of Object.entries(art)) {
  const [dir, slug] = name.split("/");
  mkdirSync(`public/images/${dir}`, { recursive: true });
  const file = `public/images/${dir}/${slug}.svg`;
  writeFileSync(file, frame(body(), title).replace(/\n\s*/g, "\n"));
  console.log(file);
}
