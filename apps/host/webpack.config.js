const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const TSCONFIG_PATH = path.join(__dirname, "./tsconfig.json");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3000/",
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
      name: "home",
      filename: "homeRemoteEntry.js",
      remotes: {
        home: "home@http://localhost:3000/homeRemoteEntry.js",
      },
      // remotes: {
      //   about: 'about@http://localhost:3000/aboutRemoteEntry.js",',
      // },
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
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
