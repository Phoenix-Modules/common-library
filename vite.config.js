﻿import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            treeshake: false,
            plugins: [nodeResolve({ exportConditions: ['node'] })],
            input: {
                module: "src/index.js",
            },
            output: {
                entryFileNames: "index.js",
                format: "cjs",
                dir: "dist",
                interop: "esModule"
            }
        },
    }
});