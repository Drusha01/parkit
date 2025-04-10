import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        needsInterop: ['@mapbox/mapbox-gl-directions'],
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        origin: 'http://127.0.0.1:5173',
        cors: {
            origin: ['http://127.0.0.1:8000'], // Allow Laravel dev server
            credentials: true,
        },
    },
    build: {
        outDir: 'public/build',
    },
});
