import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { windi } from "svelte-windicss-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: [windi({})],
    }),
  ],
});
