const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');
const { getNodeLangCode, getSlugWithoutFile } = require('./utils');

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
      value: getNodeLangCode(node.fileAbsolutePath),
      node,
    });

    actions.createNodeField({
      name: 'readingTime',
      value: readingTime(node.rawBody),
      node,
    });
  }
};
