const config = {
  entry: ["./src/client.jsx"],
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "cheap-eval-source-map",
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

module.exports = config;
