import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { UseComboboxReturnValue } from 'downshift';
import Fuse from 'fuse.js';

import Container from '~/components/Container';

import { SearchArticlesQuery } from '~/../graphql-types';

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

const ResultLink = styled(Link)<{ highlighted: boolean }>`
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

export type ArticleProps = SearchArticlesQuery['articles']['nodes'][0];

interface SearchProps {
  combobox: UseComboboxReturnValue<Fuse.FuseResult<ArticleProps>>;
  articles: Fuse.FuseResult<ArticleProps>[];
}

export default function Search({ articles, combobox }: SearchProps): React.ReactElement {
  return (
    <Container>
      <Content {...combobox.getComboboxProps()}>
        <Input type="text" placeholder="Busque por publicações..." autoComplete="off" {...combobox.getInputProps()} />
        <Label {...combobox.getLabelProps()}>Busque por publicações...</Label>
        <Results {...combobox.getMenuProps()} data-testid="search-results">
          {combobox.isOpen &&
            articles &&
            articles.map((article, index: number) => (
              <ResultLink
                key={article.item.id}
                data-testid="search-results-link"
                to={`/${article?.item?.frontmatter?.language}${article?.item?.fields?.slug}`}
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
    </Container>
  );
}
