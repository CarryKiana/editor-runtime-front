import { defineConfig } from 'vite'

// 解决vite无法使用node模块
import nodePolyfills from 'rollup-plugin-node-polyfills'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill'

// buffer使用示例：import { Buffer } from 'buffer'

// 解决vite首次加载缓慢的问题
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

// 支持vue组件写法
import vue from '@vitejs/plugin-vue'

// 以jsx的形式写vue(如react的写法)
import vuejsx from '@vue/babel-plugin-jsx'

const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      sys: 'util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      string_decoder: 'rollup-plugin-node-polyfills/polyfills/string_decoder',
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/https',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      console: 'rollup-plugin-node-polyfills/polyfills/console',
      vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
    }
  },
  plugins: [
    vue(),
    vuejsx({}),
    PkgConfig(),
    OptimizationPersist()
  ],
  optimizeDeps: {
    esbuildOptions: {
      // nodejs global to brower globalThis
      define: {
        global: 'globalThis'
      },
      // enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        // enable rollup polyfills plugin used during production building
        nodePolyfills()
      ]
    }
  }
})
