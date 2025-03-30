import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Footer from '~/components/Footer';
import Logo from '~/components/Logo';
import DottedDivisor from '~/components/Divisor';
import Metatags from '~/components/Metatags';
import ThemeSwitcher, { ThemeProvider, GlobalStyle } from '~/components/ThemeSwitcher';
import LinkCard from '~/components/LinkCard';

const NavBar = styled.div`
  max-width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled(DottedDivisor)`
  display: flex;
  padding: 26px 0;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0;
`;

const Avatar = styled.img`
  width: 110px;
  height: auto;
`;

const Description = styled.p`
  text-align: center;
  margin-top: 0;
`;

const Content = styled(NavBar)`
  margin: 0 auto;
  padding: 0 20px;
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

      <NavBar>
        <ThemeSwitcher />
      </NavBar>

      <Header>
        <Avatar src={siteMetadata?.avatar ?? ''} alt="" />
      </Header>

      <Content>
        <Logo name={siteMetadata?.name ?? ''} size="small" to="/" />
        <Description>follow me anywhere 👨🏽‍💻</Description>
        {social?.map((e) => (
          <LinkCard
            icon={e?.icon}
            url={e?.url ?? ''}
            api={e?.api}
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
