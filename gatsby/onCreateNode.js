const { createFilePath } = require('gatsby-source-filesystem');

module.exports = async ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { sourceInstanceName } = getNode(node.parent);

    actions.createNodeField({
      name: 'slug',
      value: createFilePath({ node, getNode }),
      node,
    });

    actions.createNodeField({
      name: 'collection',
      value: sourceInstanceName,
      node,
    });
  }
};
