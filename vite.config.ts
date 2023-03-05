import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { name } from './package.json'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  base: `${name}/`,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  experimental: {
    renderBuiltUrl(
      filename: string,
      { hostId, hostType, type }: { hostId: string; hostType: 'js' | 'css' | 'html'; type: 'public' | 'asset' },
    ) {
      if (type === 'public') {
        return `${name}/${filename}`
      } else {
        return { relative: true }
      }
    },
  },
})
