require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    sourceCode: 'https://github.com/diegocosta/diegocosta.me',
    metatags: {
      title: 'Diego Costa - Software Engineer, Engineering Manager',
      description:
        'Engenheiro de software e Engineering Manager apaixonado por construir produtos que impactem a vida das pessoas.',
      author: 'Diego Costa',
      banner: 'https://repository-images.githubusercontent.com/278878641/3756a080-d995-11ea-9b9f-f91a4448af98',
      avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
    },
    bio: {
      en: 'I’m a Engineering Manager passionate about the intersection between technology and people. My goal is to help technology teams achieve their full potential.\nI have a great interest in engineering leadership, people management, software engineering, as well as inclusion and diversity. Currently, I am an Engineering Manager at Nubank and I am always open to sharing my ideas and experiences on these topics.\nIf you’d like to learn more about me, check out the links below!',
      pt: 'Sou um Gerente de Engenharia apaixonado pela intersecção entre tecnologia e pessoas. Meu objetivo é ajudar equipes de tecnologia a alcançar todo o seu potencial.\nTenho grande interesse em liderança em engenharia, gerenciamento de pessoas, engenharia de software, além de inclusão e diversidade. Atualmente, sou Gerente de Engenharia na Nubank e estou sempre aberto a compartilhar minhas ideias e experiências sobre esses temas.\nSe você quiser saber mais sobre mim, confira os links abaixo!',
    },
    getInTouch: [
      {
        label: 'Linkedin',
        url: 'https://linkedin.com/in/diegocoxta',
      },
      {
        label: 'Github',
        url: 'https://github.com/diegocoxta',
      },
      {
        label: 'Mastodon',
        url: 'https://mastodon.social/@diegocoxta',
        rel: 'me',
      },
      {
        label: 'X/Twitter',
        url: 'https://x.com/diegocoxta',
      },
      {
        label: 'E-mail',
        url: 'mailto:diego@diegocosta.me',
      },
    ],
  },
  graphqlTypegen: {
    typesOutputPath: 'gatsby-types.d.ts',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-remark-images',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
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
        path: `${__dirname}/src/locales`,
        name: 'locales',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locales',
        languages: ['pt', 'en'],
        defaultLanguage: 'en',
        siteUrl: 'https://diegocosta.me',
        generateDefaultLanguagePage: true,
        redirect: false,
        i18nextOptions: {
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
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
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53539968-4',
      },
    },
  ],
};
