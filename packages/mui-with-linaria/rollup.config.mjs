import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import wyw from '@wyw-in-js/rollup';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import css from 'rollup-plugin-css-only';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

const isLowerCase = value => value === value.toLowerCase();

const componentFolders = readdirSync(path.resolve('src'), {
  withFileTypes: true,
})
  .filter(dirent => dirent.isDirectory() && !isLowerCase(dirent.name))
  .map(dirent => dirent.name);

const plugins = [
  peerDepsExternal(), // 避免 peerDependencies 被打包
  commonjs(), // 將 commonJS 轉為 ESM
  nodeResolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }), // 讓 nodeJS 可以讀懂 ESM
  wyw({ sourceMap: true }), // 在 build 時預處理 runtime CSS in JSS 成單純的 css
  css({ output: 'styles.css' }), // 將 css 部分 export 成單一檔案
  babel({
    // 將 typescript 跟 ESNext 跟 React 的語法編譯成純 JavaScript 程式碼
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  // visualizer({
  //   filename: 'stats.html',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
];

const external = [
  'react',
  'react-dom',
  '@mui/material',
  '@mui/x-date-pickers',
  '@emotion/css',
  '@emotion/react',
  '@emotion/styled',
];

const configGenerator = ({ inputPath, cjsPath, esmPath }) => ({
  input: inputPath,
  output: [
    {
      file: cjsPath,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: esmPath,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins,
  external,
});

const rollupConfig = [
  configGenerator({
    inputPath: 'src/index.emotion.ts',
    cjsPath: 'dist/index.emotion.js',
    esmPath: 'dist/index.emotion.esm.js',
  }),
  configGenerator({
    inputPath: 'src/index.linaria.ts',
    cjsPath: 'dist/index.linaria.js',
    esmPath: 'dist/index.linaria.esm.js',
  }),
  ...componentFolders.flatMap(folderName => [
    configGenerator({
      inputPath: `src/${folderName}/${folderName}.emotion.tsx`,
      cjsPath: `dist/${folderName}/${folderName}.emotion.js`,
      esmPath: `dist/${folderName}/${folderName}.emotion.esm.js`,
    }),
    configGenerator({
      inputPath: `src/${folderName}/${folderName}.linaria.tsx`,
      cjsPath: `dist/${folderName}/${folderName}.linaria.js`,
      esmPath: `dist/${folderName}/${folderName}.linaria.esm.js`,
    }),
    {
      input: `src/${folderName}/${folderName}.linaria.tsx`,
      output: { file: `dist/${folderName}/${folderName}.d.ts` },
      plugins: [dts()],
    },
  ]),
];

export default rollupConfig;
