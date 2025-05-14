// ./alchemy.run.ts
import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-vite", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: process.argv.includes("--verbose") ? false : true,
});

// (resources go here)

export const website = await Vite("website", {
  // command to build the vite site (run vite build)
  command: "bun run build",
  // where the build command will store the assets
  assets: "./dist",
});

console.log(website.url);

await app.finalize(); // must be at end
