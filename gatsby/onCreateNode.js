const { createFilePath } = require('gatsby-source-filesystem');

module.exports = ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    actions.createNodeField({
      name: 'slug',
      value: createFilePath({ node, getNode }),
      node,
    });
  }
};
