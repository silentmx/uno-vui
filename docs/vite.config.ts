// import { UnovuiResolver } from 'uno-vui/lib';
// import Components from 'unplugin-vue-components/vite';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      // Components({
      //   resolvers: [
      //     UnovuiResolver()
      //   ]
      // }),
    ]
  })
);