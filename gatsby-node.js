const { resolve } = require('path');
const kebabCase = require('lodash.kebabcase');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query GatsbyCreatePage {
      content: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
              collection
            }
            internal {
              type
            }
            frontmatter {
              title
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
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: resolve('./src/templates/tags.tsx'),
      context: { tag: tag.fieldValue },
    });
  });
};
