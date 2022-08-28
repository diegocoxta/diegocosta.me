const { createFilePath } = require('gatsby-source-filesystem');
const { getNodeLangCode, getSlugWithoutFile } = require('./utils');

module.exports = async ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { sourceInstanceName } = getNode(node.parent);

    actions.createNodeField({
      name: 'slug',
      value: getSlugWithoutFile(createFilePath({ node, getNode }), sourceInstanceName),
      node,
    });

    actions.createNodeField({
      name: 'collection',
      value: sourceInstanceName,
      node,
    });

    actions.createNodeField({
      name: 'language',
      value: getNodeLangCode(node.fileAbsolutePath, node.frontmatter.language),
      node,
    });
  }
};
