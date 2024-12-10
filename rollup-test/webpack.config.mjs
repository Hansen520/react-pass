import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import("webpack").Configuration} */
export default {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(import.meta.dirname, "dist2"),
    filename: "esm.bundle.js",
    libraryTarget: "module",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
  ],
};
