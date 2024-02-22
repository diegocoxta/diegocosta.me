import React, { useContext } from 'react';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';
import { KBarProvider } from 'kbar';

import Article from '~/components/Article';
import Footer from '~/components/Footer';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import LanguageSwitcher, { useLocale } from '~/components/LanguageSwitcher';
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
  content?: Queries.SingleTemplateQuery['content'];
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
          bio {
            pt
            en
          }
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
            language
          }
        }
      }
    }
  `);

  const themeContext = useContext(ThemeContext);
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

  const actions = [
    {
      id: 'home',
      name: locale.getTranslationFor('commander.home'),
      shortcut: ['g', 'h'],
      section: locale.getTranslationFor('commander.pages'),
      perform: () => (window.location.href = `/${locale.getCurrentLanguage()}`),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: locale.getTranslationFor('commander.articles'),
      shortcut: ['g', 'a'],
      section: locale.getTranslationFor('commander.pages'),
      icon: 'BsNewspaper',
    },
    ...pages.nodes.map((p: Queries.BlogTemplateQueryQuery['pages']['nodes'][0]) => ({
      id: `page-${p.fields?.slug}-${p.fields?.language}`,
      name: p.frontmatter?.title as string,
      section: locale.getTranslationFor('commander.pages'),
      perform: () => (window.location.href = `/${p.fields?.language}${p.fields?.slug}`),
      icon: 'BsFillFileEarmarkFill',
      parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
    })),
    {
      id: 'theme',
      name: locale.getTranslationFor('commander.theme'),
      shortcut: ['g', 't'],
      section: locale.getTranslationFor('commander.preferences'),
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: locale.getTranslationFor('commander.themeLight'),
      shortcut: ['g', 't', 'l'],
      section: locale.getTranslationFor('commander.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: locale.getTranslationFor('commander.themeDark'),
      shortcut: ['g', 't', 'd'],
      section: locale.getTranslationFor('commander.theme'),
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'language',
      name: locale.getTranslationFor('commander.language'),
      shortcut: ['g', 'l'],
      section: locale.getTranslationFor('commander.preferences'),
      icon: 'BsTranslate',
    },
    ...locale.getAllLanguages().map((language: string) => ({
      icon: 'BsTranslate',
      id: `language-${language}`,
      shortcut: ['g', 'l', language[0]],
      section: locale.getTranslationFor('commander.language'),
      parent: 'language',
      perform: () => (window.location.href = `/${language}`),
      name: locale.getTranslationFor(`languages.${language}`),
    })),
    {
      id: 'source',
      name: locale.getTranslationFor('commander.sourceCode'),
      shortcut: ['g', 's'],
      section: locale.getTranslationFor('commander.tools'),
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
        <LanguageSwitcher />
        <Header>
          <Logo author={author} size="large" />
          <HeaderNavBar>
            <ThemeSwitcher />
            <KBarProvider actions={actions}>
              <Commander placeholder={locale.getTranslationFor('commander.placeholder')} />
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
