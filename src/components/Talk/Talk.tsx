import React from 'react';
import styled from 'styled-components';
import { BsGithub, BsYoutube, BsEaselFill } from 'react-icons/bs';

import { usei18n, Link } from '~/utils/i18n';

const Container = styled.div`
  margin-bottom: 16px;

  @media (min-width: 760px) {
    display: flex;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div``;

const Title = styled.h4`
  font-size: 22px;
  margin: 0;
`;

const Language = styled.p`
  font-weight: 700;
  margin: 0 0 10px;
`;

const Description = styled.p`
  margin: 0 0 5px;
`;

type LinkType = 'slide' | 'repository' | 'video';

const getIconByLinkType = (type: LinkType) => {
  switch (type) {
    case 'slide':
      return <BsEaselFill data-testid="talk-icon-slide" />;
    case 'video':
      return <BsYoutube data-testid="talk-icon-video" />;
    case 'repository':
      return <BsGithub data-testid="talk-icon-repository" />;
    default:
      return null;
  }
};

interface TalkProps {
  title: string;
  description?: string;
  language?: string;
  url?: string;
}

export default function Talk(props: TalkProps): React.ReactElement {
  const i18n = usei18n();

  const language = props.language && i18n.getTranslationFor(`languages.${props.language}`);
  const languagePrefix = props.language && i18n.getTranslationFor('article.languagePrefix');

  return (
    <Container>
      <Details>
        <Header>
          <Title>
            <Link to={props.url}>{props.title}</Link>
          </Title>
          {languagePrefix && (
            <Language data-testid="talk-language">
              {languagePrefix} {language}
            </Language>
          )}
          {props.description && <Description data-testid="talk-description">{props.description}</Description>}
        </Header>
      </Details>
    </Container>
  );
}
