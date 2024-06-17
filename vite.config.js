import copy from "rollup-plugin-copy";
import { defineConfig, Plugin } from "vite";

export default defineConfig({
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                module: "src/index.js",
            },
            output: {
                entryFileNames: "[name].js",
                format: "es",
                dir: "dist",
            },
        },
    }
});
