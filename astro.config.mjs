import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://accclub-chula.github.io",
  base: "/profile-card",
  integrations: [
    tailwind(),
    solidJs(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
