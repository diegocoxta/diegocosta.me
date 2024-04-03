const { resolve } = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

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

    actions.createNodeField({
      node,
      name: 'readingTime',
      value: readingTime(node.rawMarkdownBody),
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  if (page.path.startsWith('/_')) {
    console.log(`⚠️ Ignored page ${page.path}`);
    const { deletePage } = actions;
    deletePage(page);
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
      component: resolve('./src/pages/_single.tsx'),
      context: { slug },
    });
  });

  // Create Tags Page
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: resolve('./src/pages/_tags.tsx'),
      context: { tag: tag.fieldValue },
    });
  });
};
