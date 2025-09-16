// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import svgr from "vite-plugin-svgr";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Optional override via .env (VITE_API_TARGET=...)
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const API_TARGET = env.VITE_API_TARGET || "https://ruthram360.com"; // ← change if your domain differs

  return {
    server: {
      host: true,
      port: 8080,
      proxy: {
        // All /api/* requests in dev go to your live PHP server
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
          secure: false, // set true if your SSL chain is perfect locally
        },
      },
    },
    preview: {
      host: true,
      port: 4173,
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          replaceAttrValues: {
            "#000": "currentColor",
            "#000000": "currentColor",
            black: "currentColor",
          },
        },
      }),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: "/", // deploy at domain root
    build: {
      sourcemap: mode !== "production",
      outDir: "dist",
    },
  };
});
