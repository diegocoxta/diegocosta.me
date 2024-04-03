import React from 'react';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Article from '~/components/Article';
import Footer from '~/components/Footer';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ThemeSwitcher, { ThemeProvider, GlobalStyle } from '~/components/ThemeSwitcher';
import Logo from '~/components/Logo';
import AboutMe from '~/components/AboutMe';
import Navigation from '~/components/Navigation';

const Container = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  margin: 16px 0 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 760px) {
    margin: 40px 0 40px 0;
  }
`;

const HeaderNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface BlogProps {
  content?: Queries.SingleTemplatePageQuery['content'];
  list?: Queries.IndexPageQuery['list'];
  sourceCode?: string;
  author?: string;
}

export function Blog(props: PageProps<BlogProps>): React.ReactElement {
  const {
    site: {
      siteMetadata: {
        repository,
        name,
        website: { title, description, header },
        bio,
        getInTouch,
      },
    },
    pages,
  } = useStaticQuery(graphql`
    query BlogTemplateQuery {
      site {
        siteMetadata {
          repository
          name
          bio
          getInTouch {
            label
            url
          }
          website {
            title
            description
            header
          }
        }
      }
      pages: allMarkdownRemark(filter: { frontmatter: { status: { ne: "draft" } } }) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
            collection
          }
        }
      }
    }
  `);

  const { data } = props;
  const content = data?.content?.edges;
  const list = data?.list?.edges;

  const isSinglePage = content !== undefined;
  const isNotFound = content === undefined && list === undefined;
  const articles = isSinglePage ? content : list;

  return (
    <>
      <GlobalStyle />
      <Metatags
        author={name}
        banner={header}
        title={title || articles?.[0]?.node.frontmatter?.title}
        description={description || articles?.[0]?.node.frontmatter?.description}
      />
      <Container>
        <Header>
          <Logo name={name} size="large" />
          <HeaderNavBar>
            <ThemeSwitcher />
            <Navigation sourceCode={repository} pages={pages} />
          </HeaderNavBar>
        </Header>
        {!isNotFound && !isSinglePage && <AboutMe bio={bio} socialLinks={getInTouch} />}
      </Container>
      <DottedDivisor />
      <Container>
        {isNotFound && (
          <Article
            key="article-not-found"
            title="Ops! Page not found!"
            content="I'm sorry, but the page you're looking for cannot be found. Please check the URL or try navigating through the menu of my website. If the issue persists, please contact me."
            showContent={true}
          />
        )}
        {articles?.map(({ node }, index: number) => (
          <Article
            key={`article-${index}`}
            kind={node.fields?.collection}
            title={node.frontmatter?.title ?? ''}
            date={node.frontmatter?.date}
            language={node.frontmatter?.language}
            url={node.fields?.slug}
            tags={node.frontmatter?.tags as string[]}
            readingTime={node.fields?.readingTime?.minutes ?? 0}
            content={
              isSinglePage || node?.frontmatter?.expanded ? node.html : node.frontmatter?.description || node.excerpt
            }
          />
        ))}
      </Container>
      <DottedDivisor />
      <Container>
        <Footer sourceCode={repository} author={name} />
      </Container>
    </>
  );
}

export default function (props: PageProps<BlogProps>) {
  return (
    <ThemeProvider>
      <Blog {...props} />
    </ThemeProvider>
  );
}
