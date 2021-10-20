import React, { useState } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { useCombobox } from 'downshift';
import Fuse from 'fuse.js';

import Search, { ArticleProps } from './Search';

export default (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query SearchComponent {
      articles: allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  `);

  const items = data.articles.nodes;

  const fuse = React.useMemo(
    () =>
      new Fuse(items, {
        minMatchCharLength: 3,
        keys: ['frontmatter.title', 'frontmatter.description'],
      }),
    [items]
  );

  const [articles, setArticles] = useState<Fuse.FuseResult<ArticleProps>[]>([]);

  const combobox = useCombobox({
    items: articles,
    onInputValueChange: ({ inputValue }) => inputValue && setArticles(fuse.search<ArticleProps>(inputValue)),
    itemToString: (article) => article?.item?.frontmatter?.title ?? '',
    onSelectedItemChange: ({ selectedItem }) => navigate(selectedItem?.item?.fields?.slug ?? ''),
  });

  return <Search combobox={combobox} articles={articles} />;
};
