// Copies the Japanese font (large, many unicode-range slices) into public/ so it is
// loaded with a <link> only on /ja/ pages instead of bloating every page's CSS.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = join("node_modules", "@fontsource-variable", "noto-sans-jp");
const dest = join("public", "fonts", "noto-sans-jp");

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(join(src, "files"), join(dest, "files"), {
  recursive: true,
  filter: (p) => !p.endsWith(".woff"), // woff2 only
});
const css = readFileSync(join(src, "index.css"), "utf8").replace(
  /,\s*url\([^)]*\.woff\) format\('woff'\)/g,
  "",
);
writeFileSync(join(dest, "index.css"), css);
console.log("copied Noto Sans JP to", dest);
