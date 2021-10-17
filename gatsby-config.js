const theme = require('./src/themes/dark');

const siteMetadata = {
  title: 'Diego Costa - Software Engineer, Engineering Tech Manager',
  author: 'Diego Costa',
  description:
    'Engenheiro de software e Tech Manager apaixonado por construir produtos que impactem a vida das pessoas.',
  aboutMe: [
    'A passionate tech manager who loves the intersection of computers and people, I spend my days trying to help tech teams deliver their max potential.',
    "Currently at Nubank, I am working to simplify our users' relationship with their financial lives by providing a simple but powerful mobile experience.",
    'You can hear more about here:',
  ],
  siteUrl: 'https://diegocosta.me',
  contacts: [
    { link: 'https://linkedin.com/in/diegoscosta', label: 'linkedin' },
    { link: 'https://github.com/diegocosta', label: 'github' },
    { link: 'https://slides.com/diegocosta', label: 'slides' },
    { link: 'https://twitter.com/diegocoxta', label: 'twitter' },
    { link: 'mailto:diego@diegocosta.me', label: 'e-mail' },
  ],
  language: 'en',
  repository: 'https://github.com/diegocosta/diegocosta.me',
  image: 'https://repository-images.githubusercontent.com/278878641/3756a080-d995-11ea-9b9f-f91a4448af98',
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: true,
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
        display: 'minimal-ui',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
  ],
};
