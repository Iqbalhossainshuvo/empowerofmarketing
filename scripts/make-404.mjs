// Copies the English branded "lost" page to out/404.html so static hosts serve it for unknown URLs.
import { copyFileSync, existsSync } from "node:fs";
const src = "out/en/lost/index.html";
if (!existsSync(src)) {
  console.error("make-404: missing", src);
  process.exit(1);
}
copyFileSync(src, "out/404.html");
console.log("make-404: wrote out/404.html");
