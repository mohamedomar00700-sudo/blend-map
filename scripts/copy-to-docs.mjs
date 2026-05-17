import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "dist", "client");
const docs = join(root, "docs");

if (!existsSync(join(src, "index.html"))) {
  console.error("Run build:pages first — dist/client/index.html is missing.");
  process.exit(1);
}

if (existsSync(docs)) rmSync(docs, { recursive: true });
cpSync(src, docs, { recursive: true });
console.log("Copied dist/client → docs/");
