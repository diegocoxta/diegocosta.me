import React from 'react';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

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
  sourceCode?: string;
}

export default function Footer(props: FooterProps): React.ReactElement {
  const locale = useLocale();

  return (
    <>
      <Content>
        <Label>
          CC-BY {props.year}, {locale.getTranslationFor('footer.builtWith')}{' '}
        </Label>
        <Link href="https://gatsbyjs.org">gatsby</Link>
        <Label> • </Label>
        {props.sourceCode && <Link href={props.sourceCode}>{locale.getTranslationFor('footer.sourceCode')}</Link>}
      </Content>
    </>
  );
}
