const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
// To support dotenv on frontend (not required now)
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [new MiniCssExtractPlugin(), new Dotenv()],
  output: {
    filename: "[name]-[contenthash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "sass-loader",
        ],
      },
    ],
  },
};
