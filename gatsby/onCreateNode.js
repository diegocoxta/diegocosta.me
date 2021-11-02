const { createFilePath } = require('gatsby-source-filesystem');
const { getNodeLangCode, getSlugWithoutFile } = require('./helpers');

module.exports = ({ node, actions, getNode }) => {
  if (node.internal.type === 'Mdx') {
    actions.createNodeField({
      name: 'slug',
      value: getSlugWithoutFile(createFilePath({ node, getNode })),
      node,
    });

    const { sourceInstanceName } = getNode(node.parent);

    actions.createNodeField({
      name: 'collection',
      value: sourceInstanceName,
      node,
    });

    actions.createNodeField({
      name: 'language',
      value: getNodeLangCode(node),
      node,
    });
  }
};
