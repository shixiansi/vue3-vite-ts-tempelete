//名字扩展
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// API自动引入插件
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动引入插件
import Components from 'unplugin-vue-components/vite'
// ArcoVue、VueUse 组件和指令自动引入解析器
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'
// icon 插件
import Icons from 'unplugin-icons/vite'
// icon 自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// icon 加载 loader
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// Unocss 插件
import Unocss from 'unocss/vite'
// Unocss 默认预设
import presetUno from '@unocss/preset-uno'
// Unocss 属性模式预设
import presetAttributify from '@unocss/preset-attributify'
// Unocss 指令转换插件
import transformerDirective from '@unocss/transformer-directives'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, './')
  return {
    base: viteEnv.VITE_BASE,
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      // 端口占用直接退出
      strictPort: true,
      // 本地服务 CORS 是否开启
      // cors: true,
      // proxy: {
      //   [viteEnv.VITE_BASE_URL]: {
      //     target: viteEnv.VITE_BASE_SERVER_URL,
      //     // 允许跨域
      //     changeOrigin: true,
      //     rewrite: path => path.replace(viteEnv.VITE_BASE_URL, '/')
      //   }
      // }
      proxy: {
        '/api': {
          //  拦截以 /api 开头的接口
          target: 'http://127.0.0.1:2333', //设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true, //这里true表示实现跨域
          secure: false, // 如果是https接口，需要配置这个参数
          ws: true,
          pathRewrite: {
            '^/api': '/api' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/api/user/add'，直接写‘/api/user/add’即可
          }
        }
        // 假如又有一个接口是：http://40.00.100.100:3002/get/list/add
        // 那就再配置一个 get的，如下：
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static/assets',
      // sourcemap: true,
      // 规定触发警告的 chunk 大小，消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        // 需要去解析的文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // imports 指定自动引入的包位置（名）
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 生成相应的自动导入json文件。
        eslintrc: {
          // 启用
          enabled: true,
          // 生成自动导入json文件位置
          filepath: './.eslintrc-auto-import.json',
          // 全局属性值
          globalsPropValue: true
        },
        dts: './auto-imports.d.ts',
        resolvers: [ArcoResolver()]
      }),
      Components({
        // imports 指定组件所在目录，默认为 src/components
        dirs: ['src/components/', 'src/view/', 'src/layout'],
        // 需要去解析的文件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ArcoResolver({
            sideEffect: true
          }),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
          IconsResolver({
            // icon自动引入的组件前缀 - 为了统一组件icon组件名称格式
            prefix: 'icon',
            // 自定义的icon模块集合
            customCollections: []
          })
        ]
      }),
      // Icon 插件配置
      Icons({
        compiler: 'vue3',
        customCollections: {
          // user图标集，给svg文件设置 fill="currentColor" 属性，使图标的颜色具有适应性
          user: FileSystemIconLoader('src/assets/svg/user', svg =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
          // home 模块图标集
          home: FileSystemIconLoader('src/assets/svg/home', svg =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        },
        autoInstall: true
      }),
      // 新增一个 Unocss 插件配置
      Unocss({
        // 预设
        presets: [presetUno(), presetAttributify()],
        // 指令转换插件
        transformers: [transformerDirective()],
        // 自定义规则
        rules: []
      })
    ]
  }
})
