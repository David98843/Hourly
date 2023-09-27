// vite.config.ts
import { defineConfig } from "file:///C:/Users/USER/Desktop/vite-app1/vite-intro/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/USER/Desktop/vite-app1/vite-intro/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/USER/Desktop/vite-app1/vite-intro/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      // registerType: "autoUpdate",
      // mode:"development",
      // base: '/',
      manifest: {
        name: "Hourly Project Manager",
        short_name: "Hourly",
        theme_color: "#ffffff"
      },
      // devOptions: {
      //   enabled: true,
      // },
      workbox: {
        globPatterns: ["**/*"]
      },
      includeAssets: [
        "**/*"
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERlc2t0b3BcXFxcdml0ZS1hcHAxXFxcXHZpdGUtaW50cm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVTRVJcXFxcRGVza3RvcFxcXFx2aXRlLWFwcDFcXFxcdml0ZS1pbnRyb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVVNFUi9EZXNrdG9wL3ZpdGUtYXBwMS92aXRlLWludHJvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIC8vIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICAvLyBtb2RlOlwiZGV2ZWxvcG1lbnRcIixcbiAgICAgIC8vIGJhc2U6ICcvJyxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdIb3VybHkgUHJvamVjdCBNYW5hZ2VyJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ0hvdXJseScsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZidcbiAgICAgIH0sXG4gICAgICAvLyBkZXZPcHRpb25zOiB7XG4gICAgICAvLyAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAvLyB9LFxuICAgICAgd29ya2JveDp7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKlwiXVxuICAgICAgfSxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICAgXCIqKi8qXCJcbiAgICAgIF1cbiAgICB9KVxuICBdXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBQ3pWLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSU4sVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLE1BQ2Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlBLFNBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxNQUFNO0FBQUEsTUFDdkI7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
