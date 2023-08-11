const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

require("dotenv").config({ path: "../../.env" });

const TSCONFIG_PATH = path.join(__dirname, "./tsconfig.json");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: `${process.env.HOST_APP_DOMAIN_URL}/`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: TSCONFIG_PATH,
      }),
    ],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "hostRemoteEntry.js",
      remotes: {
        host: `host@${process.env.HOST_APP_DOMAIN_URL}/hostRemoteEntry.js`,
        // appOne: "appOne@http://localhost:3001/appOneRemoteEntry.js",
      },
      // remotes: {
      //   about: `promise new Promise(resolve => {
      //     const scriptElement = document.createElement('script');

      //     scriptElement.onload = () => {
      //       const container = window['about'];
      //       const proxy = {
      //         shareScope: {},
      //         get: async (request) => {
      //           try {
      //             await container.init(this.shareScope);
      //           } catch (e) {
      //             console.log('remote container already initialized');
      //           }
      //           return container.get(request);
      //         },
      //         init: (arg) => {
      //           this.shareScope = arg; // save reference to share scope
      //         }
      //       }
      //       resolve(proxy);
      //     }

      //     scriptElement.src = 'http://localhost:3001/aboutRemoteEntry.js';
      //     scriptElement.async = true;

      //     document.head.append(scriptElement);
      //   })
      // `,
      // },
      exposes: {
        "./Header": "./src/components/Header.tsx",
        "./Footer": "./src/components/Footer.tsx",
        "./context": "./src/context",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: deps["@mui/material"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      APP_ONE_DOMAIN_URL: JSON.stringify(process.env.APP_ONE_DOMAIN_URL),
      APP_TWO_DOMAIN_URL: JSON.stringify(process.env.APP_TWO_DOMAIN_URL),
      APP_THREE_DOMAIN_URL: JSON.stringify(process.env.APP_TWO_DOMAIN_URL),
    }),
  ],
});
