import React from 'react';
import styled from 'styled-components';

import Footer from '~/components/Footer';
import BrandName from '~/components/BrandName';
import ThemeProvider, { GlobalStyle } from '~/components/ThemeProvider';

const Container = styled.section`
  max-width: 660px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
`;

const GroupTitle = styled.h2`
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ExternalLink = styled.a`
  border: 1px solid #d4d4d8;
  padding: 5px;
  border-radius: 100px;
  display: block;

  display: flex;
  justify-content: flex-start;

  margin-bottom: 20px;
`;

const Bullet = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.accentColor};
`;

const Label = styled.p`
  margin: auto 10px;
`;

export interface LinksProps {
  author: string;
  avatar: string;
  description: string;
}

export default function Links(props: LinksProps): React.ReactElement {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Avatar src={props.avatar} />
        <BrandName author={props.author} size="small" href="/" />
      </Container>
      <Container>
        <GroupTitle>Featured Links</GroupTitle>
        {[0, 0, 0, 0, 0].map((i, index) => (
          <ExternalLink key={index}>
            <Bullet />
            <Label>My Website</Label>
          </ExternalLink>
        ))}

        <GroupTitle>Other Links</GroupTitle>
        {[0, 0, 0, 0, 0].map((i, index) => (
          <ExternalLink key={index}>
            <Bullet />
            <Label>My Website</Label>
          </ExternalLink>
        ))}

        <p>Content</p>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
