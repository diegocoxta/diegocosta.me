import React, { useContext } from 'react';
import { PageProps, useStaticQuery, graphql, navigate } from 'gatsby';
import { ThemeContext } from 'styled-components';

import Article from '~/components/Article';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import { ThemeProvider, GlobalStyle } from '~/components/ThemeSwitcher';
import AboutMe from '~/components/AboutMe';

interface BlogProps {
  content?: Queries.SingleTemplatePageQuery['content'];
  list?: Queries.IndexPageQuery['list'];
}

export function Blog(props: PageProps<BlogProps>): React.ReactElement {
  const themeContext = useContext(ThemeContext);

  const {
    site: {
      siteMetadata: {
        repository,
        name,
        website: { title, description },
        bio,
        social,
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
          social {
            label
            url
            tags
          }
          website {
            title
            description
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

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      section: 'Pages',
      perform: () => navigate('/'),
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
      perform: () => navigate(p.fields?.slug ?? ''),
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
      perform: () => window.open(repository as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Metatags
        author={name}
        title={title || articles?.[0]?.node.frontmatter?.title}
        description={description || articles?.[0]?.node.frontmatter?.description}
      />
      <Header name={name} actions={actions} />
      {!isNotFound && !isSinglePage && <AboutMe bio={bio} socialLinks={social} />}
      <DottedDivisor />
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
      <Footer sourceCode={repository} author={name} />
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
