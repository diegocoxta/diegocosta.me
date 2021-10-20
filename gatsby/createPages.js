const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      content: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              slug
              collection
            }
            frontmatter {
              tags
              title
              language
            }
          }
        }
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      languages: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___language) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
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

  const articles = content.filter((edge) => edge.node.fields.collection === 'articles');
  const pages = content.filter((edge) => edge.node.fields.collection === 'pages');

  articles.forEach((article) => {
    actions.createPage({
      path: article.node.fields.slug,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        slug: article.node.fields.slug,
      },
    });
  });

  // Create static pages
  pages.forEach((page) => {
    if (page.node.fields.slug !== '/') {
      actions.createPage({
        path: page.node.fields.slug,
        component: path.resolve('./src/templates/page.tsx'),
        context: {
          slug: page.node.fields.slug,
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
