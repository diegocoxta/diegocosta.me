import React from 'react';
import { PageProps } from 'gatsby';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';

import { useTheme, ThemeScheme, themeLight, themeDark } from '~/hooks/useTheme';
import { useLocale } from '~/hooks/useLocale';

import Article from '~/components/Article';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const GlobalStyle = createGlobalStyle<{ theme: ThemeScheme }>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Divisor = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    linear-gradient(${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    ${({ theme }) => theme.textColor};
  background-size: 22px 22px;
  height: 120px;
  margin: 40px 0;
  width: 100%;
`;

interface PageContentProps {
  content?: Queries.SingleTemplateQuery['content'];
  list?: Queries.IndexPageQuery['list'];
}

export default function Page(props: PageProps<PageContentProps>): React.ReactElement {
  const [theme, themeToggler, setMode] = useTheme();
  const locale = useLocale();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  const { data } = props;
  const content = data?.content;
  const list = data?.list;

  const isSinglePage = content !== undefined;
  const isNotFound = content === undefined && list === undefined;
  const articles = isSinglePage ? [{ node: content }] : list?.edges;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      <GlobalStyle />
      <Container>
        <Header
          page={{
            title: content?.frontmatter?.title ?? undefined,
            description: content?.frontmatter?.description ?? undefined,
          }}
          fullHeader={!isNotFound && !isSinglePage}
        />
      </Container>
      <Divisor />
      <Container>
        {isNotFound && (
          <Article
            key="article-not-found"
            article={{
              frontmatter: {
                title: locale.getTranslationFor('404page.title'),
                date: null,
                description: null,
                language: null,
                tags: null,
                status: null,
                homepage_view_full_article: null,
              },
              fields: null,
              excerpt: null,
              html: locale.getTranslationFor('404page.message'),
            }}
            showContent={true}
          />
        )}
        {articles?.map(({ node }, index: number) => (
          <Article
            key={`article-${index}`}
            article={node}
            showContent={isSinglePage || node?.frontmatter?.homepage_view_full_article}
          />
        ))}
        <Footer />
      </Container>
    </ThemeContext.Provider>
  );
}
