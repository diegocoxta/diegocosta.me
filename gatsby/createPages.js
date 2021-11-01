const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
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
              tags
              title
              language
            }
          }
        }
      }
      tags: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      languages: allMdx(limit: 2000) {
        group(field: frontmatter___language) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
  }

  // Create Home Page
  actions.createPage({
    path: '/',
    component: path.resolve('./src/templates/index.tsx'),
  });

  // Create Article Pages
  const content = result.data.content.edges;
  const tags = result.data.tags.group;
  const languages = result.data.languages.group;

  content.forEach((content) => {
    if (content.node.fields.slug !== '/') {
      const template = content.node.fields.collection === 'articles' ? 'article' : 'page';

      actions.createPage({
        path: content.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          slug: content.node.fields.slug,
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

  // Create Language Page
  languages.forEach((language) => {
    actions.createPage({
      path: `/${language.fieldValue}/`,
      component: path.resolve('./src/templates/languages.tsx'),
      context: {
        language: language.fieldValue,
      },
    });
  });
};
