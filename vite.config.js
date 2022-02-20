import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "apis", replacement: path.resolve(__dirname, "./src/apis") },
      { find: "assets", replacement: path.resolve(__dirname, "./src/assets") },
      { find: "ui", replacement: path.resolve(__dirname, "./src/assets/ui") },
      {
        find: "components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "popup",
        replacement: path.resolve(__dirname, "./src/components/popup"),
      },
      {
        find: "globals",
        replacement: path.resolve(__dirname, "./src/globals"),
      },
      { find: "styles", replacement: path.resolve(__dirname, "./src/styles") },
      { find: "utils", replacement: path.resolve(__dirname, "./src/utils") },
    ],

    //  {
    //   "@": "./src",
    //   api: path.resolve(__dirname, "src/apis"),
    //   assets: path.resolve(__dirname, "src/assets"),
    //   ui: path.resolve(__dirname, "src/assets/ui"),
    //   components: path.resolve(__dirname, "src/components"),
    //   popup: path.resolve(__dirname, "src/components/popup"),
    //   globals: path.resolve(__dirname, "src/globals"),
    //   styles: path.resolve(__dirname, "src/styles"),
    //   utils: path.resolve(__dirname, "src/utils"),
    // },
  },
  define: {
    BACKDOOR_WORDS: JSON.stringify("ASOULMEMORY"),
    APP_VERSION: JSON.stringify("0.1"),
    REMOTE_SOURCE_URL: JSON.stringify("0.1"),
    //音频资源前后缀配置
    PREFIX_ORIGN: JSON.stringify(
      "https://asoul1.asoul-rec.com/%E6%AD%8C%E8%88%9E%E5%88%87%E7%89%87/MP3%E7%9B%B4%E6%92%AD%E6%AD%8C%E6%9B%B2%E5%88%87%E7%89%87/"
    ),
    SUFFIX_ORIGN: JSON.stringify(".mp3?raw"),
    PREFIX_TUNED: JSON.stringify(
      "https://asoul1.asoul-rec.com/%E6%AD%8C%E8%88%9E%E5%88%87%E7%89%87/MP3%E7%9B%B4%E6%92%AD%E6%AD%8C%E6%9B%B2%E5%88%87%E7%89%87/%E4%BF%AE%E5%A4%8D%E6%96%87%E7%89%A9/"
    ),
    SUFFIX_TUNED: JSON.stringify(".mp3?raw"),
    MOST_N: 5,
    AVAILABLE_DAYS_LIMIT: 5,
    CUTTER_DISPLAY_MAX: 5,
    SONGNAME_CONTAIN_VERSION: true,
    SONG_NAME_SOURCE_MODE: true,
    AUDIO_DURATION_IN_MS: true,
  },
});
