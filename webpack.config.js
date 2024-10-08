const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      http: false,
      https: false,
      util: false,
      zlib: false,
      stream: false,
      url: false,
      assert: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
