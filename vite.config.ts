import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import macrosPlugin from "vite-plugin-babel-macros";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin(), glsl()],
  server: { port: 1111 },
  resolve: {
    alias: [
      { find: "@src", replacement: "/src" },
      { find: "@lib", replacement: "/src/lib" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@canvas", replacement: "/src/components/canvas" },
      { find: "@dom", replacement: "/src/components/dom" },
      { find: "@state", replacement: "/src/state" },
      { find: "@data", replacement: "/src/data" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@routing", replacement: "/src/routing" },
      { find: "@types", replacement: "/src/types" },
    ],
  },
});
