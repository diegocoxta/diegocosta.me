import React from 'react';
import styled from 'styled-components';
import { UseComboboxReturnValue } from 'downshift';
import Fuse from 'fuse.js';

import { usei18n, Link } from '~/utils/i18n';
import FixedContainer from '~/components/FixedContainer';

import { SearchComponentQuery } from '~/../graphql-types';

const Content = styled.div`
  position: relative;
  margin: 40px 0 20px;
`;

const Input = styled.input`
  transition: box-shadow 0.2s;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.searchBackgroundColor};
  outline: none;
  color: ${({ theme }) => theme.titleColor};
  font-size: 18px;
  line-height: 18px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.searchResultsBackgroundColor};

  :focus {
    background-color: ${({ theme }) => theme.searchResultsBackgroundColor};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.titleColor};
  }

  ::placeholder {
    color: ${({ theme }) => theme.subtitleColor};
  }

  :focus::placeholder {
    color: ${({ theme }) => theme.subtitleColor};
  }
`;

const Label = styled.label`
  visibility: hidden;
`;

const Results = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(20px + 21px + 18px);
  align-items: center;
  cursor: text;
  background: ${({ theme }) => theme.searchResultsBackgroundColor};
  color: black;
  z-index: 4;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
`;

const ResultLink = styled(Link) <{ highlighted: boolean }>`
  display: block;
  text-decoration: none;
  padding: 20px;

  :hover {
    text-decoration: none;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ResultItemTitle = styled.h3`
  color: ${({ theme }) => theme.titleColor};
  font-size: 16px;
  margin: 0 0 5px;
  font-weight: 400;
`;

const ResultItemDescription = styled.p`
  color: ${({ theme }) => theme.subtitleColor};
  font-size: 14px;
  margin: 0%;
`;

export type ArticleProps = SearchComponentQuery['articles']['nodes'][0];

interface SearchProps {
  combobox: UseComboboxReturnValue<Fuse.FuseResult<ArticleProps>>;
  articles: Fuse.FuseResult<ArticleProps>[];
}

export default function Search({ articles, combobox }: SearchProps): React.ReactElement {
  const i18n = usei18n();

  const placeholder = i18n.getTranslationFor('search.searchForPosts');

  return (
    <FixedContainer>
      <Content>
        <Input type="text" placeholder={placeholder} autoComplete="off" {...combobox.getInputProps()} />
        <Label {...combobox.getLabelProps()}>{placeholder}</Label>
        <Results {...combobox.getMenuProps()} data-testid="search-results">
          {combobox.isOpen &&
            articles &&
            articles.map((article, index: number) => (
              <ResultLink
                key={article.item.id}
                data-testid="search-results-link"
                to={article?.item?.fields?.slug}
                language={article?.item?.fields?.language}
                {...combobox.getItemProps({ index, item: article })}
              >
                <ResultItemTitle data-testid="search-results-title">
                  {article.item.frontmatter?.title ?? ''}
                </ResultItemTitle>
                <ResultItemDescription data-testid="search-results-description">
                  {article.item.frontmatter?.description ?? ''}
                </ResultItemDescription>
              </ResultLink>
            ))}
        </Results>
      </Content>
    </FixedContainer>
  );
}
