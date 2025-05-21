// Core Plugins
import { appType, version } from './package.json'

import vituum from 'vituum'
import pages from 'vituum/plugins/pages'
import pug from '@vituum/vite-plugin-pug'
import autoprefixer from 'autoprefixer'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import imageminWebp from 'imagemin-webp'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

// Custom Plugins
import customStackSvgPlugin from './custom-vite-plugins/custom-stack-svg-plugin'

// const makeWebpCb = (file) => {
//   const isFavicon = file.includes('favicons')

//   if (isFavicon) {
//     return
//   }

//   console.log(file)

//   return `${file.slice(0, file.lastIndexOf('.'))}.webp`
// }

export default {
  define: {
    __APP_TYPE__: JSON.stringify(appType),
    __APP_VER__: JSON.stringify(version)
  },
  base: './',
  server: {
    open: true,
    port: 9000,
  },
  build: {
    outDir: 'build',
    minify: true,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: './src/pug/to-html/*.pug',
      output: {
        assetFileNames: (assetInfo) => 'assets/[name].[ext]',
        chunkFileNames: (chunkInfo) => 'assets/[name].js',
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    },
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  plugins: [
    customStackSvgPlugin({
      pathToSpriteIcns: './public/img/icons/',
      output: './public/img/sprite.svg',
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg({ quality: 80 }),
        jpeg: imageminMozjpeg({ quality: 80 }),
        png: imageminPngquant({ quality: [0.8, 0.9] }),
      },
      makeWebp: {
        formatFilePath: (filepath) => `${filepath.slice(0, filepath.lastIndexOf('.'))}.webp`,
        skipIfLargerThan: false,
        plugins: {
          jpg: imageminWebp({ quality: 80 }),
          jpeg: imageminWebp({ quality: 80 }),
          png: imageminWebp({ quality: 80 }),
        },
      },
      exclude: [/favicons/],
    }),
    vituum(),
    pug({
      root: './src/pug/to-html',
    }),
    pages({
      dir: './src/pug/to-html',
      normalizeBasePath: true,
    }),
  ]
}
