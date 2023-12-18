import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const manifestForPlugIn: VitePWAOptions = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Love Philippines Youth Movement",
    short_name: "LPYM",
    description: "This is Love Philippines Movement App",
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon',
    },
    {
      src: '/maskable_icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    }
    ],
    theme_color: '#ffffff',
    background_color: '#e03176',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
  injectRegister: false,
  minify: false,
  workbox: undefined,
  injectManifest: undefined,
  includeManifestIcons: false,
  disable: false
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn),
    ViteImageOptimizer({
      png: {
        quality: 40,
      },
    }),
  ],
})
