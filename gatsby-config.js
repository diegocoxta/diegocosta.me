const siteMetadata = require('./content/site-metadata.json');

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: true,
        documentPaths: ['./src/**/*.{ts,tsx,js,jsx}', './gatsby/**/*.{ts,tsx,js,jsx}'],
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Source+Sans+Pro:400,700'],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles`,
        name: 'articles',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/i18n`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale', // name given to 'gatsby-source-filesystem' plugin.
        languages: siteMetadata.languages.list,
        defaultLanguage: siteMetadata.languages.default,
        siteUrl: siteMetadata.siteUrl,
        generateDefaultLanguagePage: true,
        redirect: false,
        i18nextOptions: {
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    'gatsby-remark-images',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              quality: 100,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-highlight-code',
          'gatsby-remark-reading-time',
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: siteMetadata.googleAnalyticsKey,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          query GatsbyPluginFeedSiteMetadata {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, articles } }) => {
              return articles.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              query GatsbyPluginFeedArticles {
                articles: allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fields: { collection: { eq: "articles" }}, frontmatter: { status: { ne: "draft" }} }
                ) {
                  edges {
                    node {
                      html
                      excerpt
                      fields {
                        slug
                        readingTime {
                          minutes
                        }
                      }
                      frontmatter {
                        date
                        title
                        description
                        tags
                        homepage_view_full_article
                        status
                        language
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: siteMetadata.metatags.title,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.metatags.title,
        short_name: siteMetadata.metatags.author,
        start_url: siteMetadata.siteUrl,
        display: 'minimal-ui',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
