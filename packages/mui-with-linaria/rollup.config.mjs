import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import wyw from '@wyw-in-js/rollup';
import css from 'rollup-plugin-css-only';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const rollupConfig = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
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
    ],
    external: [
      'react',
      'react-dom',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
];

export default rollupConfig;
