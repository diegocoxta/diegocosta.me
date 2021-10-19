import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import Page from '~/components/Page';
import Divisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ArticleHeader from '~/components/ArticleHeader';
import Article, { Content } from '~/components/Article';
import Container from '~/components/Container';

import { PageTemplateQuery } from '~/../graphql-types';

interface PageTemplateProps extends PageRendererProps {
  data: PageTemplateQuery;
}

export default function PageTemplate({ data }: PageTemplateProps): React.ReactElement {
  const { html, frontmatter } = data.article ?? {};
  const { title } = frontmatter ?? {};

  return (
    <Page>
      <Metatags title={title ?? ''} />
      <Divisor />
      <Container>
        <Article>
          <p>{title}</p>
          <Content dangerouslySetInnerHTML={{ __html: html ?? '' }} />
        </Article>
      </Container>
    </Page>
  );
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
