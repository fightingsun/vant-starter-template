import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import type { ProxyOptions } from 'vite';

// env.VITE_APP_PROXY取到的是string格式的值，必须转成Array
function changeStringProxyToArray(proxy: string) {
  if (!proxy) { throw new Error('env配置出错：proxy必须为数组！'); }
  if (!proxy.startsWith('[') || !proxy.endsWith(']')) { throw new Error('env配置出错：proxy必须为数组！'); }
  return JSON.parse(proxy) as Array<[string, string]>;
}

// 生成代理列表
function createProxy(list: Array<[string, string]>) {
  const proxyList: Record<string, ProxyOptions> = {};
  if (list.length !== 0) {
    list.forEach((item) => {
      proxyList[item[0]] = {
        target: item[1],
        changeOrigin: true,
      };
    });
  }
  return proxyList;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteProxy = changeStringProxyToArray(env.VITE_APP_PROXY);
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['./src/composables', './src/store'],
        dts: './src/auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        resolvers: [VantResolver()],
        dts: './src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      proxy: createProxy(viteProxy),
    },
  };
});
