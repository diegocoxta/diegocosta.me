const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      articles: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 2000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              title
              lang
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
        group(field: frontmatter___lang) {
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
  const articles = result.data.articles.edges;

  articles.forEach((article, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1].node;
    const next = index === 0 ? null : articles[index - 1].node;

    const articlePath = article.node.frontmatter.lang
      ? `/${article.node.frontmatter.lang}${article.node.fields.slug}`
      : article.node.fields.slug;

    actions.createPage({
      path: articlePath,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        slug: article.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create Tags Page
  const tags = result.data.tags.group;

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
  const languages = result.data.languages.group;

  languages.forEach((language) => {
    actions.createPage({
      path: language.fieldValue,
      component: path.resolve('./src/templates/languages.tsx'),
      context: {
        lang: language.fieldValue,
      },
    });
  });
};
