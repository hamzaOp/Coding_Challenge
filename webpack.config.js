module.exports = {
  entry: ["./src/client.jsx"],
  devtool: "cheap-eval-source-map",
  output: {
    path: `${__dirname}/public/js`,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
