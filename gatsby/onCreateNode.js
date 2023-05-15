const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

const getNodeLangCode = function (fileAbsolutePath, defaultLang = 'en') {
  let filename = fileAbsolutePath.split('/').pop().split('.');
  return filename[0] ?? defaultLang;
};

const getSlugWithoutFile = function (slug) {
  const parts = slug.split('/').filter((segment) => segment !== '');
  return `/${parts?.[0]}/`;
};

module.exports = async ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { sourceInstanceName } = getNode(node.parent);

    actions.createNodeField({
      name: 'slug',
      value: getSlugWithoutFile(createFilePath({ node, getNode })),
      node,
    });

    actions.createNodeField({
      name: 'language',
      value: getNodeLangCode(node.fileAbsolutePath),
      node,
    });

    actions.createNodeField({
      name: 'collection',
      value: sourceInstanceName,
      node,
    });

    actions.createNodeField({
      node,
      name: 'readingTime',
      value: readingTime(node.rawMarkdownBody),
    });
  }

  if (node.internal.type === 'ResumeYaml') {
    const { absolutePath } = getNode(node.parent);

    actions.createNodeField({
      name: 'language',
      value: getNodeLangCode(absolutePath),
      node,
    });
  }
};
