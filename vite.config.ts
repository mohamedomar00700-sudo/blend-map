// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
const base = process.env.VITE_BASE_PATH || "/";
const routerBasepath =
  base === "/" ? undefined : base.replace(/\/$/, "");

// GitHub Pages: static prerender (no Cloudflare worker bundle).
const isGitHubPagesBuild =
  !!process.env.VITE_BASE_PATH || process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  vite: {
    base,
  },
  cloudflare: isGitHubPagesBuild ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    router: routerBasepath ? { basepath: routerBasepath } : undefined,
    prerender: {
      enabled: isGitHubPagesBuild,
      failOnError: true,
    },
  },
});
