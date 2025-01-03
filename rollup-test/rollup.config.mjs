/*
 * @Date: 2024-11-25 11:02:36
 * @Description: description
 */
import postcss from 'rollup-plugin-postcss';
import myExtractCssRollupPlugin from './my-extract-css-rollup-plugin.mjs';

/** @type {import("rollup").RollupOptions} */

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/esm.js",
      format: "esm",
    },
    { file: "dist/cjs.js", format: "cjs" },
    {
      file: "dist/umd.js",
      name: "han",
      format: "umd",
    },
  ],
  treeshake: false,
  plugins: [
    myExtractCssRollupPlugin({
      filename: '666.css'
    })
    // postcss({
    //   extract: true, // 抽离
    //   extract: 'index.css'
    // })
  ]
};
