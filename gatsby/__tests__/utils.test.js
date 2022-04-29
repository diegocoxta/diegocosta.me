import { getNodeLangCode, siteMetadata } from '../utils';

describe('getNodeLangCode', () => {
  it('returns the correct language code', () => {
    expect(getNodeLangCode('/diegocosta.me/content/articles/index.es.md')).toBe('es');
    expect(getNodeLangCode('/diegocosta.me/content/articles/index.pt.mdx')).toBe('pt');
    expect(getNodeLangCode('/diegocosta.me/content/articles/index.pt.md')).toBe('pt');
    expect(getNodeLangCode('/me/users/absolute.md')).toBe(siteMetadata.defaultLanguage);
    expect(getNodeLangCode('/absolute.md')).toBe(siteMetadata.defaultLanguage);
    expect(getNodeLangCode('absolute.md')).toBe(siteMetadata.defaultLanguage);
    expect(getNodeLangCode('/absolute.es.md')).toBe('es');
    expect(getNodeLangCode('absolute.en.md')).toBe('en');
    expect(getNodeLangCode('absolute.en')).toBe(siteMetadata.defaultLanguage);
    expect(getNodeLangCode('absolute')).toBe(siteMetadata.defaultLanguage);
  });
});
