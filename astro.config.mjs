import { defineConfig } from "astro/config";
import WindiCSS from "vite-plugin-windicss";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: WindiCSS(),
  },
});
