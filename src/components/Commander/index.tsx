import React from 'react';

import Commander from './Commander';

export default (): React.ReactElement => {
  const router = {};

  const iconStyle = {
    fontSize: '20px',
    position: 'relative',
    top: '-2px',
  };

  const actions = [
    {
      id: 'copy',
      name: 'Copy URL',
      shortcut: ['u'],
      keywords: 'copy-url',
      section: 'General',
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <i className="ri-file-copy-line" style={iconStyle} />,
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => window.open('mailto:filip@filiphalas.com', '_blank'),
      icon: <i className="ri-mail-line" style={iconStyle} />,
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () => window.open('https://github.com/halafi/filiphalas.com', '_blank'),
      icon: <i className="ri-braces-line" style={iconStyle} />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: <i className="ri-home-5-line" style={iconStyle} />,
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a', 'b'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: <i className="ri-user-line" style={iconStyle} />,
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'a', 'r'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => router.push('/articles'),
      icon: <i className="ri-article-line" style={iconStyle} />,
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: <i className="ri-lightbulb-line" style={iconStyle} />,
    },
    {
      id: 'setup',
      name: 'Setup',
      shortcut: ['g', 's'],
      keywords: 'go-setup',
      section: 'Go To',
      perform: () => router.push('/setup'),
      icon: <i className="ri-computer-line" style={iconStyle} />,
    },
    {
      id: 'github',
      name: 'Github',
      shortcut: ['f', 'g'],
      keywords: 'go-github',
      section: 'Follow',
      perform: () => window.open('https://github.com/halafi', '_blank'),
      icon: <i className="ri-github-line" style={iconStyle} />,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['f', 'l'],
      keywords: 'go-linkedin',
      section: 'Follow',
      perform: () => window.open('https://www.linkedin.com/in/filip-halas-a7928476/', '_blank'),
      icon: <i className="ri-linkedin-line" style={iconStyle} />,
    },
  ];

  return <Commander actions={actions} />;
};
