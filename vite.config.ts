import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { ViteSitemapPlugin } from "vite-plugin-sitemap"; // ← optional

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load ONLY VITE_* vars
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // ---- Env-driven knobs ----
  const API_TARGET = env.VITE_API_TARGET || "https://ruthram360.com";
  // If you ever deploy under a subfolder, set VITE_BASE=/myapp/
  const BASE = env.VITE_BASE || "/"; // "/" for root, "/myapp/" for subfolder

  const plugins: PluginOption[] = [
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
    // Uncomment this block to auto-generate sitemap.xml on build
    /*
    ViteSitemapPlugin({
      hostname: "https://ruthram360.com",
      dynamicRoutes: ["/", "/about", "/services", "/portfolio", "/contact"],
    }),
    */
  ];

  return {
    base: BASE,
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      port: 8080,
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
          secure: true, // if SSL is properly configured on API_TARGET
        },
      },
    },
    preview: {
      host: true,
      port: 4173,
    },
    build: {
      outDir: "dist",
      sourcemap: mode !== "production", // only generate sourcemaps in dev/staging
    },
  };
});
