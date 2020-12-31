const siteMetadata = {
  title: 'Blog do Diego Costa',
  author: 'Diego Costa',
  description: 'Diego Costa, desenvolvedor web e mobile - Salvador, BA',
  siteUrl: 'https://diegocosta.me',
  contacts: [
    { link: 'https://diegocosta.me', label: 'sobre mim' },
    { link: 'https://github.com/diegocosta', label: 'github' },
    { link: 'https://linkedin.com/in/diegoscosta', label: 'linkedin' },
    { link: 'https://twitter.com/diegocoxta', label: 'twitter' },
    { link: 'mailto:diego@diegocosta.com.br', label: 'e-mail' },
  ],
};

module.exports = {
  siteMetadata: {
    language: 'en',
    repository: 'https://github.com/diegocosta/diegocosta.me',
    ...siteMetadata,
  },
  plugins: [
    'gatsby-plugin-graphql-codegen',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['raleway:400,700'],
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
        path: `${__dirname}/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-embed-gist',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-reading-time',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53539968-4',
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.author,
        start_url: siteMetadata.siteUrl,
        background_color: '#0e0f11',
        theme_color: '#d73738',
        display: 'minimal-ui',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
