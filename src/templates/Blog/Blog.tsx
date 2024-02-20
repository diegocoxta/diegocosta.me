import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

import Article from '~/components/Article';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ThemeProvider, { GlobalStyle } from '~/components/ThemeProvider';
import DottedDivisor from '~/components/DottedDivisor';

const Container = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

interface BlogProps {
  content?: Queries.SingleTemplateQuery['content'];
  list?: Queries.IndexPageQuery['list'];
}

export default function Blog(props: PageProps<BlogProps>): React.ReactElement {
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
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Header page={pageHeader} fullHeader={!isNotFound && !isSinglePage} />
      </Container>
      <DottedDivisor />
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
      </Container>
      <DottedDivisor />
      <Container>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
