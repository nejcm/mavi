import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [
    tsConfigPaths(),
    tanstackRouter({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ];

  if (command === "serve") {
    const { devtools } = await import("@tanstack/devtools-vite");
    plugins.unshift(devtools());
  }

  return {
    base: process.env.BASE_PATH ?? "/",
    plugins,
    server: {
      host: "::",
      port: 3000,
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
