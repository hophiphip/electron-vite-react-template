import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: __dirname,
    base: './',
    mode: process.env.NODE_ENV,

    build: {
        sourcemap: true,
        emptyOutDir: true,
        outDir: '../../dist/renderer',
        
        rollupOptions: {
            input: join(__dirname, 'index.html'),
            
            // Exclude node internal modules from build output.
            external: [
                ...builtinModules.flatMap((p) => [p, `node:${p}`])
            ],
        },

        // Disable reporting comressed chunk sizes. Might slightly improve build speed.
        reportCompressedSize: false,
    }
});
