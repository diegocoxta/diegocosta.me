const React = require('react');

module.exports = {
  useTranslation: jest.fn(() => ({
    t: jest.fn((key) => key),
  })),
  useI18next: jest.fn(() => ({
    languages: ['pt'],
  })),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({ to, ...rest }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      })
  ),
};
