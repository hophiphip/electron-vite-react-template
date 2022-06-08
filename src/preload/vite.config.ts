import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),

    build: {
        outDir: '../../dist/preload',
        emptyOutDir: true,
        sourcemap: 'inline',
        minify: process.env.NODE_ENV === 'production',

        lib: {
            entry: 'src/index.ts',
            formats: ['cjs'],
        },

        rollupOptions: {
            external: [
                // Exclude Electron from build.
                'electron',
                // Exclude Node internals from build.
                ...builtinModules.flatMap((p) => [p, `node:${p}`]),
            ],

            output: {
                entryFileNames: '[name].cjs',
            },
        },

        // Disable reporting comressed chunk sizes. Might slightly improve build speed.
        reportCompressedSize: false,
    },
});