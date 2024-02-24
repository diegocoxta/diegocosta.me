import React, { useContext } from 'react';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { KBarProvider } from 'kbar';

import Article from '~/components/Article';
import Footer from '~/components/Footer';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ThemeSwitcher, { ThemeProvider, GlobalStyle } from '~/components/ThemeSwitcher';
import Logo from '~/components/Logo';
import AboutMe from '~/components/AboutMe';
import Commander from '~/components/Commander';

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
        sourceCode,
        metatags: { title, author, description, banner },
        bio,
        getInTouch,
      },
    },
    pages,
  } = useStaticQuery(graphql`
    query BlogTemplateQuery {
      site {
        siteMetadata {
          sourceCode
          metatags {
            author
            description
            banner
            title
          }
          bio
          getInTouch {
            label
            url
            rel
          }
        }
      }
      pages: allMarkdownRemark(filter: { frontmatter: { flags: { nin: ["hide-from-listings", "draft"] } } }) {
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

  const themeContext = useContext(ThemeContext);

  const { data } = props;
  const content = data?.content?.edges;
  const list = data?.list?.edges;

  const isSinglePage = content !== undefined;
  const isNotFound = content === undefined && list === undefined;
  const articles = isSinglePage ? content : list;

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      section: 'Pages',
      perform: () => (window.location.href = '/'),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'a'],
      section: 'Pages',
      icon: 'BsNewspaper',
    },
    ...pages.nodes.map((p: Queries.BlogTemplateQueryQuery['pages']['nodes'][0]) => ({
      id: `page-${p.fields?.slug}`,
      name: p.frontmatter?.title as string,
      section: 'Pages',
      perform: () => (window.location.href = `/${p.fields?.slug}`),
      icon: 'BsFillFileEarmarkFill',
      parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
    })),
    {
      id: 'theme',
      name: 'Appearance',
      shortcut: ['g', 't'],
      section: 'Preferences',
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: 'Light',
      shortcut: ['g', 't', 'l'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: 'Dark',
      shortcut: ['g', 't', 'd'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'source',
      name: 'Source Code',
      shortcut: ['g', 's'],
      section: 'Tools',
      perform: () => window.open(sourceCode as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Metatags
        author={author}
        banner={banner}
        title={title || articles?.[0]?.node.frontmatter?.title}
        description={description || articles?.[0]?.node.frontmatter?.description}
      />
      <Container>
        <Header>
          <Logo author={author} size="large" />
          <HeaderNavBar>
            <ThemeSwitcher />
            <KBarProvider actions={actions}>
              <Commander placeholder="Type a command or search…" />
            </KBarProvider>
          </HeaderNavBar>
        </Header>
        {!isNotFound && !isSinglePage && <AboutMe bio={bio} navigation={getInTouch} />}
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
              isSinglePage || node?.frontmatter?.flags?.includes('expanded-on-listings')
                ? node.html
                : node.frontmatter?.description || node.excerpt
            }
          />
        ))}
      </Container>
      <DottedDivisor />
      <Container>
        <Footer sourceCode={sourceCode} author={author} />
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
