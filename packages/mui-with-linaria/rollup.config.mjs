import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';

export default [
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
      peerDepsExternal(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-env',
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
    external: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
];
