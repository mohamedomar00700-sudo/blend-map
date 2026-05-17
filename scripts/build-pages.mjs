import { execSync } from "node:child_process";

process.env.VITE_BASE_PATH = "/blend-map/";

execSync("npm run build", { stdio: "inherit", env: process.env });
execSync("npm run postbuild:pages", { stdio: "inherit", env: process.env });
