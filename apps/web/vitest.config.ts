import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node", // Node environment since we test API
    testTimeout: 20000, // 20s timeout
    setupFiles: ["./tests/setupTests.ts"], // optional for future
    dir: "./tests",
    hookTimeout: 30000,
  },
});
