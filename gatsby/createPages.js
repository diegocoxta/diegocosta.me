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
      mdxContent: allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              collection
              slug
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
  const markdownContent = result.data.markdownContent.edges;
  const mdxContent = result.data.mdxContent.edges;
  const tags = result.data.tags.group;
  const languages = result.data.languages.group;

  [...markdownContent, ...mdxContent].forEach((content) => {
    if (content.node.fields.slug !== '/') {
      const isMdx = content.node.internal.type === 'Mdx';
      const isMarkdown = content.node.internal.type === 'MarkdownRemark';
      const template = content.node.fields.collection === 'articles' ? 'article' : 'page';

      actions.createPage({
        path: content.node.fields.slug,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          slug: content.node.fields.slug,
          isMdx,
          isMarkdown,
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
