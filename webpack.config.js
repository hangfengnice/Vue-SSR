// const path = require("path");
// const isDev = process.env.NODE_ENV === "development";
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const config = {
//   mode: "development",
//   entry: path.join(__dirname, "src/index"),
//   output: {
//     filename: "bundle.[hash:8].js",
//     path: path.join(__dirname, "dist")
//   },
//   module: {
//     rules: [
//       // css
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"]
//       },
//       {
//         test: /\.jsx$/,
//         loader: "babel-loader"
//       },

//       // 图片
//       {
//         test: /\.(png|svg|jpg|gif|jpeg)$/,
//         // use: ["file-loader"]
//         use: [
//           {
//             loader: "url-loader",
//             options: {
//               limit: 1024,
//               name: "[name].[ext]"
//             }
//           }
//         ]
//       },
//       {
//         test: /\.vue$/,
//         loader: "vue-loader"
//       }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       "process.env": {
//         NODE_ENV: isDev ? "'development'" : "'production'"
//       }
//     }),
//     // 请确保引入这个插件！
//     new VueLoaderPlugin(),
//     new HtmlWebpackPlugin()
//   ]
// };

// if (isDev) {
//   config.module.rules.push({
//     // scss
//     test: /\.scss$/,
//     use: [
//       "style-loader", // creates style nodes from JS strings
//       "css-loader", // translates CSS into CommonJS
//       {
//         loader: "postcss-loader",
//         options: {
//           sourceMap: true
//         }
//       },
//       "sass-loader" // compiles Sass to CSS, using Node Sass by default
//     ]
//   });
//   // 页面调试工具
//   config.devtool = "#cheap-module-eval-source-map";
//   config.devServer = {
//     port: 8000,
//     host: "0.0.0.0",
//     overlay: {
//       errors: true
//     },
//     // open: true
//     hot: true
//   };
//   config.plugins.push(
//     // 启动热更新
//     new webpack.HotModuleReplacementPlugin(),
//     // 解决不需要信息的展示
//     new webpack.NoEmitOnErrorsPlugin()
//   );

// } else {
//   config.mode='production'
//   config.entry ={
//     app: path.join(__dirname, "src/index")
//   }
//   config.output.filename = "[name].[chunkhash:8].js";
//   config.module.rules.push({
//     test: /\.scss$/,
//     use: ExtractTextPlugin.extract({
//       fallback: "style-loader",
//       use: [
//         "css-loader", // translates CSS into CommonJS
//         {
//           loader: "postcss-loader",
//           options: {
//             sourceMap: true
//           }
//         },
//         "sass-loader" // compiles Sass to CSS, using Node Sass by default
//       ]
//     })
//   });
//   config.plugins.push(new ExtractTextPlugin("styles.[hash:8].css"));
//   config.optimization = {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           chunks: 'initial',
//           minChunks: 2, maxInitialRequests: 5,
//           minSize: 0
//         },
//         vendor: {
//           test: /node_modules/,
//           chunks: 'initial',
//           name: 'vendor',
//           priority: 10,
//           enforce: true
//         }
//       }
//     },
//     runtimeChunk: true
//   }
// }

// module.exports = config;

//////////////////

// 引入模块，loader，plugin等
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const isDev = process.env.NODE_ENV === "development";
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 定义输出模块
config = {
  target: "web",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
};

if (isDev) {
  config.mode = "development";
  config.module.rules.push({
    // scss
    test: /\.scss$/,
    use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      },
      "sass-loader" // compiles Sass to CSS, using Node Sass by default
    ]
  });
  //页面调试工具
  config.devtool = "#cheap-module-eval-source-map";
  // 开发环境端口
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    // 路由识别
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    // 热加载，只渲染改变的组件，不需要重新渲染整个页面
    hot: true
  };
  // 热加载所需配置
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  config.mode = "production";
  config.entry = {
    app: path.join(__dirname, "./src/index.js"),
    vendor: ["vue"]
  };
  config.output.filename = "[name].[chunkhash:8].js";
  config.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        "css-loader", // translates CSS into CommonJS
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true
          }
        },
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    })
  });
  config.plugins.push(new ExtractTextPlugin("styles.[hash:8].css"));
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  };
}

module.exports = config;
