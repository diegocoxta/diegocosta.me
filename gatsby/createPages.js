const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = async ({ graphql, actions, reporter }) => {
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
      tags: allMarkdownRemark(limit: 2000) {
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
    const { collection } = content.node.fields;
    const { slug } = content.node.fields;

    actions.createPage({
      path: slug,
      component: path.resolve(`./src/templates/${collection}.tsx`),
      context: { slug },
    });
  });

  // Create Tags Page
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve('./src/templates/tags.tsx'),
      context: { tag: tag.fieldValue },
    });
  });
};
