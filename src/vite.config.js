import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Импортированные изображения Vite автоматически выносит из JS-бандла
// в отдельные ресурсы, поэтому base64-маскота больше нет в коде.
// Дополнительно выделяем вендорные библиотеки в свой чанк, чтобы
// убрать предупреждение "chunks larger than 500 kB".
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
