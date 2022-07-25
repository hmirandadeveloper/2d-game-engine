import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@assets-sprites": "/src/playground/assets/images/sprite-sheet/",
      "@assets-tile-sets": "/src/playground/assets/images/tile-sets/",
      "@assets-prefabs": "/src/playground/assets/prefabs/",
      "@assets-sounds": "/src/playground/assets/sounds/",
      "@assets-scripts": "/src/playground/assets/scripts/",
      "@assets-styles": "/src/playground/assets/styles/",
      "@engine-editor": "/src/engine/editor/",
      "@engine-runtime": "/src/engine/runtime/",
      "@engine-config": "/src/engine/runtime/config/config.json",
    },
  },
});
