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
    server: {
        host: '127.0.0.1', // Change this if needed
        port: 5173, // Default Vite port
        origin: 'http://127.0.0.1:5173', // Specify the development path
    },
    build: {
        outDir: 'public/build', // Ensure this matches your Laravel public directory
    },
});
