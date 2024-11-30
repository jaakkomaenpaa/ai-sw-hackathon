import { reactRouter } from "@react-router/dev/vite";

// @ts-ignore The library has poorly configured types / declaration so ts doesn't like it
import eslint from "vite-plugin-eslint";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), eslint()],
  ssr: {
    noExternal: [],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://ec.europa.eu/agrifood/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
