import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),

    build: {
        outDir: '../../dist/main',
        emptyOutDir: true,
        minify: process.env.NODE_ENV === 'production',
        sourcemap: true,

        lib: {
            entry: './src/main.ts',
            formats: ['cjs'],
        },

        rollupOptions: {
            external: [
                // Exclude Electron from build output.
                'electron',
                // Exclude Node builtin modules.
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