const siteMetadata = {
  title: 'Diego Costa - Software Engineer, Engineering Tech Manager',
  author: 'Diego Costa',
  description:
    'Engenheiro de software e Tech Manager apaixonado por construir produtos que impactem a vida das pessoas.',
  siteUrl: 'https://diegocosta.me',
  language: 'en',
  repository: 'https://github.com/diegocosta/diegocosta.me',
  image: 'https://repository-images.githubusercontent.com/278878641/3756a080-d995-11ea-9b9f-f91a4448af98',
  googleAnalyticsKey: 'UA-53539968-4',
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: true,
        documentPaths: ['./src/**/*.{ts,tsx}'],
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['raleway:400,700,900'],
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
    'gatsby-remark-images',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              quality: 100,
            },
          },
          'gatsby-remark-reading-time',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
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
                title
                description
                siteUrl
                site_url: siteUrl
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
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                });
              });
            },
            query: `
              query GatsbyPluginFeedArticles {
                articles: allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fields: { collection: { eq: "articles" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      body
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: siteMetadata.title,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.author,
        start_url: siteMetadata.siteUrl,
        display: 'minimal-ui',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
