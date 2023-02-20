import React from 'react';
import styled from 'styled-components';
import { UseComboboxReturnValue } from 'downshift';
import Fuse from 'fuse.js';
import { BsSearch } from 'react-icons/bs';

import { usei18n, Link, getContentLanguage } from '~/utils/i18n';
import FixedContainer from '~/components/FixedContainer';

import { SearchComponentQuery } from '~/../graphql-types';

const Content = styled.div`
  position: relative;
  margin: 40px 0;
`;

const Input = styled.div`
  width: 100%;
  padding: 0 0 0 20px;
  background: ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.backgroundColor};
  font-size: 26px;
  border-radius: 50px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
`;

const InputField = styled.input`
  transition: opacity 0.3s linear;
  width: 100%;
  padding: 20px;
  background: transparent;
  outline: none;
  border-radius: 50px;
  color: ${({ theme }) => theme.backgroundColor};
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.textColor};
  opacity: 0.7;

  ::placeholder {
    color: ${({ theme }) => theme.backgroundColor};
  }

  :focus {
    opacity: 1;
  }
`;

const Results = styled.div`
  align-items: center;
  cursor: text;
  background: ${({ theme }) => theme.textColor};
  color: black;
  z-index: 4;
  border-radius: 10px;
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
  color: ${({ theme }) => theme.backgroundColor};
  font-size: 16px;
  margin: 0 0 5px;
  font-weight: 600;
`;

const ResultItemDescription = styled.p`
  color: ${({ theme }) => theme.backgroundColor};
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
        <Input>
          <BsSearch />
          <InputField type="text" placeholder={placeholder} autoComplete="off" {...combobox.getInputProps()} />
        </Input>
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
                  {getContentLanguage(i18n, article?.item?.fields?.language)} ·{' '}
                  {article.item.frontmatter?.description ?? ''}
                </ResultItemDescription>
              </ResultLink>
            ))}
        </Results>
      </Content>
    </FixedContainer>
  );
}
