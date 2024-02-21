import * as Gatsby from 'gatsby';

export const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
export const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      metatags: {
        title: `Gatsby Default Starter`,
        author: 'Diego Costa',
      },
    },
  },
  pages: {
    nodes: [{}],
  },
};
