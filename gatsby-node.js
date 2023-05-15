const { resolve } = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

const getNodeLangCode = function (fileAbsolutePath, defaultLang = 'en') {
  let filename = fileAbsolutePath.split('/').pop();
  filename = filename.split('.');

  return filename[0] ?? defaultLang;
};

const getSlugWithoutFile = function (slug) {
  const parts = slug.split('/').filter((segment) => segment !== '');

  return `/${parts?.[0]}/`;
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
  });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query GatsbyCreatePage {
      content: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { flags: { nin: ["draft"] } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    console.log({ erros: result.errors });
    reporter.panicOnBuild(result.errors);
    return;
  }

  // Create Article Pages
  const content = result.data.content.edges;
  const tags = result.data.tags.group;

  content.forEach((content) => {
    const { slug } = content.node.fields;

    actions.createPage({
      path: slug,
      component: resolve('./src/templates/single.tsx'),
      context: { slug },
    });
  });

  // Create Tags Page
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: resolve('./src/templates/tags.tsx'),
      context: { tag: tag.fieldValue },
    });
  });
};
