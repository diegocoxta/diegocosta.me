const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

module.exports = ({ node, actions, getNode }) => {
  if (node.internal.type === 'Mdx') {
    actions.createNodeField({
      name: 'slug',
      value: createFilePath({ node, getNode }),
      node,
    });

    const { sourceInstanceName } = getNode(node.parent);

    actions.createNodeField({
      name: 'collection',
      value: sourceInstanceName,
      node,
    });

    actions.createNodeField({
      node,
      name: 'readingTime',
      value: readingTime(node.rawBody),
    });
  }
};
