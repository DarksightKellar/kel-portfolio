import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    env: {
      NODE_ENV: "development",
    },
    server: {
      deps: {
        inline: ["gray-matter", "remark", "remark-parse", "remark-html", "unified"],
      },
    },
  },
});
