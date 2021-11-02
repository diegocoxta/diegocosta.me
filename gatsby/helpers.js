const siteMetadata = require('../site-config.json');

module.exports.getNodeLangCode = function ({ fileAbsolutePath }, defaultLang = siteMetadata.defaultLanguage) {
  const filename = fileAbsolutePath.split('/').pop();
  const langCodeRegex = /(?:[^/]*\.)(.*)(?:((\.md)|(\.mdx))$)/;
  const langCode = (filename || '').match(langCodeRegex)?.[1] ?? defaultLang;
  return langCode;
};

module.exports.getSlugWithoutFile = function (slug) {
  const newSlug = slug.split('/')?.[1];
  return `/${newSlug}/`;
};

module.exports.siteMetadata = siteMetadata;
