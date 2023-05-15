const { resolve } = require('path');

module.exports = async ({ graphql, actions, reporter }) => {
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
