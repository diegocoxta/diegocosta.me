import React from 'react';
import { PageProps } from 'gatsby';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';

import { useTheme, themeLight, themeDark } from '~/hooks/useTheme';
import { useLocale } from '~/hooks/useLocale';

import Article from '~/components/Article';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const GlobalStyle = createGlobalStyle`
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

  const locale = useLocale();
  const currentLanguage = locale.getCurrentLanguage();

  const { data } = props;
  const content = data?.content?.edges;
  const list = data?.list?.edges;

  const isSinglePage = content !== undefined;
  const isNotFound = content === undefined && list === undefined;
  let articles = isSinglePage ? content : list;

  if (isSinglePage && articles !== undefined && articles.length > 1) {
    articles = articles.filter((i) => i.node.fields?.language === currentLanguage);
  }

  const pageHeader = isSinglePage
    ? {
        title: articles?.[0]?.node.frontmatter?.title ?? undefined,
        description: articles?.[0]?.node.frontmatter?.description ?? undefined,
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ ...themeMode, theme, themeToggler, setMode }}>
      <GlobalStyle />
      <Container>
        <Header page={pageHeader} fullHeader={!isNotFound && !isSinglePage} />
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
                tags: null,
                flags: [],
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
            showContent={isSinglePage || node?.frontmatter?.flags?.includes('expanded-on-listings')}
          />
        ))}
        <Footer />
      </Container>
    </ThemeContext.Provider>
  );
}
