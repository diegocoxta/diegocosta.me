const path = require('path');
const kebabCase = require('lodash.kebabcase');

module.exports = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      markdownContent: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
      mdxContent: allMdx {
        edges {
          node {
            fields {
              collection
              slug
            }
            frontmatter {
              title
            }
          }
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
  const markdownContent = result.data.markdownContent.edges;
  const mdxContent = result.data.mdxContent.edges;
  const tags = result.data.tags.group;
  const languages = result.data.languages.group;

  const articles = markdownContent.filter((edge) => edge.node.fields.collection === 'articles');
  const pages = markdownContent.filter((edge) => edge.node.fields.collection === 'pages');
  const pagesMdx = mdxContent.filter((edge) => edge.node.fields.collection === 'pages');

  articles.forEach((article) => {
    actions.createPage({
      path: article.node.fields.slug,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        slug: article.node.fields.slug,
      },
    });
  });

  // Create markdown pages
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

  // create MDX pages
  pagesMdx.forEach((page) => {
    actions.createPage({
      path: page.node.fields.slug,
      component: path.resolve('./src/templates/mdx.tsx'),
      context: {
        slug: page.node.fields.slug,
      },
    });
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
