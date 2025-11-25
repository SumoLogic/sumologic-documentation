module.exports = function (context, options) {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            },
          ],
        },
        optimization: {
           runtimeChunk: {
            name: () => `runtime.main`, // Custom runtime file name
            // name: (entrypoint) => `runtime___${entrypoint.name}`,
            },
        },
        output: {
            ...config.output,
            filename: 'assets/js/[name].[contenthash:8].js', // Custom path for main files
            chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js', // Custom path for chunk files
            },
      };
    },
  };
};