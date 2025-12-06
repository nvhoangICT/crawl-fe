import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const API_PROXY_TARGET =
  process.env.VITE_PROXY_TARGET ||
  "http://a238f3f4e2b754227ad9a9c65b31b43e-1948367635.ap-southeast-1.elb.amazonaws.com"

const proxyConfig = {
  "/api/auth": {
    target: API_PROXY_TARGET,
    changeOrigin: true,
  },
  "/api/admin/crawl-data": {
    target: API_PROXY_TARGET,
    changeOrigin: true,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: proxyConfig,
  },
  preview: {
    port: 5173,
    proxy: proxyConfig,
  },
});
