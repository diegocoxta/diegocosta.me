import * as Gatsby from 'gatsby';

export const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
export const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      name: 'Diego Costa',
      website: {
        title: 'My Website',
      },
    },
  },
  pages: {
    nodes: [{}],
  },
};

export const mockPageQuery = {
  list: {
    totalCount: 2,
    edges: [
      {
        node: {
          frontmatter: {
            title: 'Title 1',
            date: '2021-01-16T22:12:03.284Z',
            tags: [],
            description: 'Awesome first article',
          },
          fields: {
            slug: '/path-to-article',
            readingTime: {
              minutes: 5,
            },
          },
          excerpt: 'Awesome first article',
          html: 'Post content',
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Title 2',
            date: '2020-01-18T22:12:03.284Z',
            tags: [],
            description: 'Awesome second article',
          },
          fields: {
            slug: '/path-to-article-2',
            readingTime: {
              minutes: 2,
            },
          },
          excerpt: 'Awesome first article',
          html: 'Post content #2',
        },
      },
    ],
  },
  articlesMdx: {
    edges: [],
  },
};
