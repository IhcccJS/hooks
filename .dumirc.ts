import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist-hooks',
  hash: true,
  base: '/', // 根路径
  publicPath: '/', // 静态文件路径
  resolve: {
    atomDirs: [{ type: 'hook', dir: 'src' }],
  },
  favicons: [],
  themeConfig: {
    name: '@ihccc/hooks',
    title: '@ihccc/hooks',
    logo: '',
  },
  styles: [
    `
  section.dumi-default-header-left { width: 300px; }
  // .dumi-default-doc-layout .dumi-default-header-content, div.dumi-default-doc-layout > main { max-width: 1600px; }
  div.dumi-default-sidebar{ width: 240px; }
  .markdown *:not(pre) code { word-break: keep-all; }
  `,
  ],
});
