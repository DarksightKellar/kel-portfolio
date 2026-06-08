import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
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
    projects: [
      {
        extends: true,
        test: {
          name: "jsdom",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.node.test.{ts,tsx}"],
        },
      },
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["src/**/*.node.test.{ts,tsx}"],
        },
      },
    ],
  },
});
