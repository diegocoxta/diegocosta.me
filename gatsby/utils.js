const siteMetadata = require('../site-config.json');

module.exports.getNodeLangCode = function (fileAbsolutePath, defaultLang = siteMetadata.defaultLanguage) {
  const filename = fileAbsolutePath.split('/').pop();
  const langCodeRegex = /(?:[^/]*\.)(.*)(?:((\.md)|(\.mdx))$)/;
  const langCode = (filename || '').match(langCodeRegex)?.[1] ?? defaultLang;
  return langCode;
};

module.exports.getSlugWithoutFile = function (slug) {
  const parts = slug.split('/').filter((segment) => segment !== '');

  return `/${parts?.[0]}/`;
};

module.exports.siteMetadata = siteMetadata;
