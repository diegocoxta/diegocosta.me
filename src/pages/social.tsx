import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Logo from '~/components/Logo';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ThemeSwitcher, { ThemeProvider, GlobalStyle } from '~/components/ThemeSwitcher';
import LinkCard from '~/components/LinkCard';

const Header = styled(Container)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 110px;
  height: auto;
  margin: 40px 0 0 0;
`;

const Content = styled(Container)`
  max-width: 500px;
`;

const Description = styled.p`
  text-align: center;
`;

export default function Linktree(): React.ReactElement {
  const query: Queries.LinktreeTemplateQuery = useStaticQuery(graphql`
    query LinktreeTemplate {
      site {
        siteMetadata {
          repository
          name
          avatar
          social {
            label
            url
            tags
            api
            icon
          }
          website {
            title
            description
          }
        }
      }
    }
  `);

  const siteMetadata = query.site?.siteMetadata;
  const social = siteMetadata?.social;
  const website = siteMetadata?.website;

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Metatags
        author={siteMetadata?.name ?? ''}
        title={website?.title ?? ''}
        description={website?.description ?? ''}
      />

      <Header>
        <ThemeSwitcher />
        <Avatar src={siteMetadata?.avatar ?? ''} alt="" />
        <Logo name={siteMetadata?.name ?? ''} size="small" to="/" />
        <Description>follow me anywhere 👨🏽‍💻</Description>
      </Header>

      <Content>
        {social?.map((e) => (
          <LinkCard
            icon={e?.icon}
            url={e?.url ?? ''}
            api={e?.api ?? ''}
            key={`links-social-${e?.label}`}
            title={e?.label ?? ''}
          />
        ))}
      </Content>

      <DottedDivisor />

      <Footer sourceCode={siteMetadata?.repository ?? ''} author={siteMetadata?.name ?? ''} />
    </ThemeProvider>
  );
}
