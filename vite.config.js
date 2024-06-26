import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            plugins: [nodeResolve({ exportConditions: ['node'] })],
            input: {
                module: "src/index.js",
            },
            output: {
                entryFileNames: "index.js",
                format: "es",
                dir: "dist",
                interop: "esModule"                
            }
        },
    }
});

