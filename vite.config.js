import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "/test/" : "/",
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        admin: resolve(process.cwd(), "admin.html"),
        careers: resolve(process.cwd(), "careers.html"),
        detail: resolve(process.cwd(), "detail.html"),
        news: resolve(process.cwd(), "news.html"),
      },
    },
  }
}));
