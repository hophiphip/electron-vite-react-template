import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
    root: __dirname,

    build: {
        outDir: '../../dist/main',
        emptyOutDir: true,
        minify: process.env.NODE_ENV === 'production',
        sourcemap: true,

        // Build main in "lib" mode of Vite.
        lib: {
            // Define the entry-point.
            entry: './src/main.ts',
            // Define the build format, Electron supports CJS.
            formats: ['cjs'],
            fileName: () => '[name].cjs',
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
    },
});