import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // registerType: "autoUpdate",
      // mode:"development",
      // base: '/',
      manifest: {
        name: 'Hourly Project Manager',
        short_name: 'Hourly',
        theme_color: '#ffffff'
      },
      // devOptions: {
      //   enabled: true,
      // },
      workbox:{
        globPatterns: ["**/*"]
      },
      includeAssets: [
        "**/*"
      ]
    })
  ]
});