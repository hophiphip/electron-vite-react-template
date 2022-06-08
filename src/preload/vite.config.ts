import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
    root: __dirname,

    build: {
        // Add inline sourcemap
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
    },
});