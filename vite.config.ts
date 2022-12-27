import { defineConfig } from 'vite'
import ViteReact from '@vitejs/plugin-react'
import { FontaineTransform } from 'fontaine'
import ViteAutoImport from 'unplugin-auto-import/vite'
import ViteUnocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteReact(),
    ViteUnocss({
      configFile: './unocss.config.ts',
    }),
    ViteAutoImport({
      imports: ['react', 'react-router-dom'],
    }),
    FontaineTransform.vite({
      fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
      resolvePath: (id) => `/fonts/${id}`,
    }),
  ],
})
