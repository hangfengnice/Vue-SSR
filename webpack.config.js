const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const config = {
  mode: "development",
  entry: path.join(__dirname, "src/index"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      // 图片
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        // use: ["file-loader"]
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? "'development'" : "'production'"
      }
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin()
  ]
};

if (isDev) {
  // 页面调试工具
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      errors: true
    },
    // open: true
    hot: true
  };
  config.plugins.push(
    // 启动热更新
    new webpack.HotModuleReplacementPlugin(),
    // 解决不需要信息的展示
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;
