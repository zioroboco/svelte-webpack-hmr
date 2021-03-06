import { Configuration, HotModuleReplacementPlugin } from "webpack"
import { resolve } from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

const config: Configuration = {
  mode: "development",
  entry: ["./src/global.css", "./src/main"],
  devtool: "source-map",
  resolve: {
    alias: {
      svelte: resolve("node_modules", "svelte"),
    },
    extensions: [".ts", ".mjs", ".js", ".json", ".svelte"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader-hot",
          options: {
            preprocess: require("svelte-preprocess")({ postcss: true }),
            dev: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  devServer: {
    hot: true,
  },
}

export default config
