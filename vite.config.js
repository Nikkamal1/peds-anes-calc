import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      "285846b9c7c7.ngrok-free.app"   // ← ใส่โดเมนที่ Vite บล็อก
    ]
  }
})