module.exports = function (context, options) {
  return {
    name: 'configure-webpack',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              },
              optimization: {
                runtimeChunk: true,
              }
            },
          ],
        },
      };
    },
  };
};