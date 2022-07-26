import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@assets-sprites": "/src/assets/images/sprite-sheet/",
      "@assets-tile-sets": "/src/assets/images/tile-sets/",
      "@assets-prefabs": "/src/assets/prefabs/",
      "@assets-sounds": "/src/assets/sounds/",
      "@assets-scripts": "/src/assets/scripts/",
      "@assets-styles": "/src/assets/styles/",
    },
  },
});
