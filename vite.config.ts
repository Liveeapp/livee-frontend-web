import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    // Optimize build output
    target: "ES2020",
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "mui-vendor": ["@mui/material", "@mui/icons-material"],
          "query-vendor": ["@tanstack/react-query"],
          charts: ["recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    // Hot module replacement for faster dev
    middlewareMode: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@mui/material",
      "@mui/icons-material",
      "@tanstack/react-query",
      "zustand",
      "axios",
      "recharts",
    ],
  },
});
