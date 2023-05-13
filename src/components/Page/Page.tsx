import React from 'react';
import { PageProps } from 'gatsby';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';

import { useTheme, ThemeScheme, themeLight, themeDark } from '~/hooks/useTheme';

import Metatags from '~/components/Metatags';
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

  const themeMode = theme === 'light' ? themeLight : themeDark;

  const { data } = props;

  const isSinglePage = data.content !== undefined;
  const articles = isSinglePage ? [{ node: data.content }] : data.list?.edges;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      <GlobalStyle />
      <Container>
        <Header />
        <Metatags title={props.data.content?.frontmatter?.title} />
      </Container>
      <Divisor />
      <Container>
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
