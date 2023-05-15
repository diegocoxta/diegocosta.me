const { resolve } = require('path');

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': resolve(`${__dirname}/..`, 'src'),
      },
    },
  });
};
