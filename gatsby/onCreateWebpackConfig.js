const path = require('path');

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(`${__dirname}/..`, 'src'),
      },
    },
  });
};
