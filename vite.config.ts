import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
    },
})
