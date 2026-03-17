import { defineConfig } from 'vite';

const input = {
    main: './src/example/index.html',
};

export default defineConfig({
    build: {
        rollupOptions: {
            input,
        },
    },
    server: {
        allowedHosts: ['briella-unpurified-workmanly.ngrok-free.dev'],
    },
});
