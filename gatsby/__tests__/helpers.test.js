import { getNodeLangCode, getSlugWithoutFile, siteMetadata } from '../helpers';

describe('getNodeLangCode', () => {
  it('should return the correct language code #1', () => {
    expect(
      getNodeLangCode({
        fileAbsolutePath:
          '/Users/diego/Projects/diegocosta.me/content/articles/site-estatico-github-pages-actions/index.es.md',
      })
    ).toBe('es');
  });
  it('should return the correct language code #2', () => {
    expect(
      getNodeLangCode({
        fileAbsolutePath: '/Users/diego/Projects/diegocosta.me/content/articles/retrospectiva-2020/index.pt.mdx',
      })
    ).toBe('pt');
  });
  it('should return the correct language code #3', () => {
    expect(
      getNodeLangCode({
        fileAbsolutePath:
          '/Users/diego/Projects/diegocosta.me/content/articles/atualizando-programas-cask-homebrew-macos/index.pt.md',
      })
    ).toBe('pt');
  });
  it('should return the correct language code #4', () => {
    expect(getNodeLangCode({ fileAbsolutePath: '/me/users/absolute.md' })).toBe(siteMetadata.defaultLanguage);
  });
});

describe('getSlugWithoutFile', () => {
  it('should return slug without filename', () => {
    expect(getSlugWithoutFile('/atualizando-programas-cask-homebrew-macos/index.en/')).toBe(
      '/atualizando-programas-cask-homebrew-macos/'
    );
    expect(getSlugWithoutFile('/site-estatico-github-pages-actions/')).toBe('/site-estatico-github-pages-actions/');
  });
});
