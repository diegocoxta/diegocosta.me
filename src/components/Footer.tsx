import React from 'react';
import styled from 'styled-components';

import { useLocale } from '@app/components/LanguageSwitcher';

const Container = styled.footer`
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

  &:hover,
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    outline: none;
  }
`;

interface FooterProps {
  sourceCode?: string;
  author?: string;
}

export default function Footer(props: FooterProps): React.ReactElement {
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <Container>
      <Label>
        CC-BY {year} {props.author}, {locale.getTranslationFor('footer.builtWith')}{' '}
        <Link href="https://gatsbyjs.org">gatsby</Link> •{' '}
        {props.sourceCode && <Link href={props.sourceCode}>{locale.getTranslationFor('footer.sourceCode')}</Link>}
      </Label>
    </Container>
  );
}
