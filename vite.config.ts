import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

export default defineConfig({
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    }
})