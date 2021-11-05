const path = require('path');
const kebabCase = require('lodash.kebabcase');
const { getSlugWithoutFile, siteMetadata } = require('./utils');

module.exports = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query GatsbyCreatePage {
      content: allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
      tags: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
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

  // Create Home Page
  actions.createPage({
    path: '/',
    component: path.resolve('./src/templates/index.tsx'),
  });

  // Create Article Pages
  const content = result.data.content.edges;
  const tags = result.data.tags.group;

  content.forEach((content) => {
    const slug = getSlugWithoutFile(content.node.fields.slug);

    if (slug !== '/') {
      const template = content.node.fields.collection === 'articles' ? 'article' : 'page';

      actions.createPage({
        path: slug,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          slug: slug,
          defaultLanguage: siteMetadata.defaultLanguage,
        },
      });
    }
  });

  // Create Tags Page
  tags.forEach((tag) => {
    actions.createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve('./src/templates/tags.tsx'),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
