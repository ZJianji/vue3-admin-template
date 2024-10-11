import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import zipPack from 'vite-plugin-zip-pack'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvg } from './src/icons/index'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_BASE_NAME } = loadEnv(mode, process.cwd())
  return defineConfig({
    base: '/vue3-admin-template/',
    plugins: [
      vue(),
      createSvg('./src/icons/svg/'),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dirs: ["src/components"],
        dts: true,
      }),
      zipPack({
        inDir: VITE_BASE_NAME,
        outDir: '.',
        outFileName: `${VITE_BASE_NAME}.zip`,
      }),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.css', '.ts'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      }
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: 5173,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: false,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {
        '/api': {
          target: 'http://xxx.xxx.xx',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 3000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      outDir: VITE_BASE_NAME,
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 静态资源分拆打包

            // if (id.includes('node_modules')) {
            //   return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // }

            // 静态资源分拆打包
            const moduleName = id.toString().split('node_modules/')[1];
            if (!moduleName) return;

            // 防止生成 .pnpm 命名的文件
            const parts = moduleName.split('/');
            if (parts.length > 1) {
              return parts[1]; // 返回一级目录下的模块名，而不是 .pnpm 下的目录
            }
            return moduleName; // 返回模块名
          },
        },
      },
    },
  })
}
