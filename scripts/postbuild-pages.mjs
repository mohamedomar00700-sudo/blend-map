import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist", "client");

writeFileSync(join(outDir, ".nojekyll"), "");

const indexPath = join(outDir, "index.html");
if (!existsSync(indexPath)) {
  console.error("postbuild:pages: dist/client/index.html missing — enable tanstack prerender");
  process.exit(1);
}

// GitHub Pages serves 404.html for unknown paths (SPA client routing).
copyFileSync(indexPath, join(outDir, "404.html"));
console.log("postbuild:pages: wrote .nojekyll and 404.html");
