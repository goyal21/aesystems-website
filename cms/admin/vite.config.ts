import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only: proxy /api to the local cms/server so `npm run dev` here doesn't
// need CORS. In production the built assets are served by cms/server itself
// (see cms/server/src/index.ts), so /api is same-origin there too.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
