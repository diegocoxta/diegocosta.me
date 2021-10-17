import React from 'react';
import styled from 'styled-components';

import Container from '~/components/Container';
import Navigation from '~/components/Navigation';

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.4;
  color: ${({ theme }) => theme.textColor};

  @media (min-width: 760px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  @media (min-width: 760px) {
    padding-bottom: 40px;
  }
`;

interface AboutMeProps {
  paragraphs: string[];
}

export default function AboutMe(props: AboutMeProps): JSX.Element {
  return (
    <Container>
      <Content>
        {props.paragraphs.map((paragraph: string, key: number) => (
          <Paragraph key={`about-me-paragraph-${key}`}>{paragraph}</Paragraph>
        ))}
        <Navigation />
      </Content>
    </Container>
  );
}
