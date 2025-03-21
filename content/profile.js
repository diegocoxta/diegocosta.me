const { themeLight } = require('./colors');

module.exports = {
  name: 'Diego Costa',
  bio: 'I’m a Engineering Manager passionate about the intersection between technology and people. My goal is to help technology teams achieve their full potential.\nI have a great interest in engineering leadership, people management, software engineering, as well as inclusion and diversity.\nIf you’d like to learn more about me, check out the links below!',
  avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
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
      label: 'Instagram',
      url: 'https://instagram.com/diegocoxta',
    },
    {
      label: 'E-mail',
      url: 'mailto:diego@diegocosta.me',
    },
  ],
  website: {
    title: 'Diego Costa - Engineering Manager, Senior Software Engineer',
    description: "Engineering Manager passionate about building products that impact people's lives.",
    theme_color: themeLight.accentColor,
    background_color: '#FFFFFF',
    icon: 'static/icon.png',
  },
  feeds: {
    letterboxd: 'https://letterboxd.com/diegocoxta/rss/',
    goodreads_currently_reading_shelf:
      'https://www.goodreads.com/review/list_rss/38757922?key=GREoInDkWGpnD1xKT_4HCeieuQ65yghCmQYJNOGv6Ody2J5J&shelf=currently-reading',
  },
};
