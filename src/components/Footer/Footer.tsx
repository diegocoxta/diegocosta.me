import React from 'react';
import styled from 'styled-components';

import { usei18n } from '~/helpers/i18n';
import Container from '~/components/Container';

const Content = styled.footer`
  margin-bottom: 50px;

  nav {
    margin-bottom: 50px;
  }

  @media (min-width: 760px) {
    nav {
      margin-bottom: 0;
    }
  }
`;

const Label = styled.span`
  color: ${({ theme }) => theme.textColor};
  line-height: 1.5;
`;

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener',
})`
  color: ${({ theme }) => theme.accentColor};
  text-decoration: none;
  box-shadow: none;

  :hover,
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

interface FooterProps {
  year: number;
  repository?: string;
}

export default function Footer(props: FooterProps): React.ReactElement {
  const i18n = usei18n();

  return (
    <Container>
      <Content>
        <Label>
          CC-BY {props.year}, {i18n.getTranslationFor('footer.builtWith')}{' '}
        </Label>
        <Link href="https://gatsbyjs.org">gatsby</Link>
        <Label> • </Label>
        {props.repository && <Link href={props.repository}>{i18n.getTranslationFor('footer.sourceCode')}</Link>}
      </Content>
    </Container>
  );
}
