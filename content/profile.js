const { themeLight } = require('./colors');

module.exports = {
  name: 'Diego Costa',
  bio: 'I’m a Engineering Manager passionate about the intersection between technology and people. My goal is to help technology teams achieve their full potential.\nI have a great interest in engineering leadership, people management, software engineering, as well as inclusion and diversity.\nIf you’d like to learn more about me, check out the links below!',
  avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
  social: [
    {
      label: 'Instagram',
      url: 'https://instagram.com/diegocoxta',
    },
    {
      label: 'Mastodon',
      url: 'https://mastodon.social/@diegocoxta',
    },
    {
      label: 'Bluesky',
      url: 'https://bsky.app/profile/diegocosta.me',
    },
    {
      label: 'Threads.net',
      url: 'https://www.threads.net/@diegocoxta',
    },
    {
      label: 'Letterboxd',
      url: 'https://letterboxd.com/diegocoxta',
      extra: '/api/get-last-movies-watched',
    },
    {
      label: 'Discogs',
      url: 'https://www.discogs.com/user/diegocoxta',
    },
    {
      label: 'Goodreads',
      url: 'https://www.goodreads.com/diegocoxta',
      extra: '/api/get-currently-reading',
    },
    {
      label: 'Linkedin',
      url: 'https://linkedin.com/in/diegocoxta',
      tags: ['professional'],
    },
    {
      label: 'Github',
      url: 'https://github.com/diegocoxta',
      tags: ['professional'],
    },
    {
      label: 'E-mail',
      url: 'mailto:diego@diegocosta.me',
      tags: ['professional'],
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
      'https://www.goodreads.com/review/list_rss/188981365?key=Fr4zpgvsvOCHxCfWENJbI3bTa230ZemKCwN0YKwLP4tVWzAW&shelf=currently-reading',
  },
};
