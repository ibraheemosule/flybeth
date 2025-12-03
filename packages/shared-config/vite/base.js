import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export function createViteConfig(options = {}) {
  const {
    port = 3000,
    host = 'localhost',
    alias = {},
    env = {}
  } = options;

  return defineConfig({
    plugins: [react()],
    server: {
      port,
      host,
      open: true,
    },
    preview: {
      port: port + 1000,
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
        '@components': path.resolve(process.cwd(), './src/components'),
        '@pages': path.resolve(process.cwd(), './src/pages'),
        '@utils': path.resolve(process.cwd(), './src/utils'),
        '@types': path.resolve(process.cwd(), './src/types'),
        ...alias,
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  });
}

// For better compatibility, also provide a default export
export default createViteConfig;