import React from 'react';
import styled from 'styled-components';
import { BsGithub, BsYoutube, BsEaselFill } from 'react-icons/bs';

import { usei18n } from '~/utils/i18n';

const Container = styled.div`
  margin-bottom: 16px;

  @media (min-width: 760px) {
    display: flex;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 20px;
  border: 1px solid ${({ theme }) => theme.textColor};
  box-sizing: border-box;
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

const Urls = styled.div`
  @media (min-width: 760px) {
    display: flex;
  }
`;

const UrlsLink = styled.a`
  display: flex;
  padding: 5px 0;
  margin: 0 20px 0 0;

  @media (min-width: 760px) {
    padding: 0;
  }
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

const UrlsIcon = styled.div.attrs<{ icon: LinkType }>((props) => ({
  children: getIconByLinkType(props.icon),
}))<{ icon: LinkType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

interface TalkProps {
  title: string;
  image?: string;
  description?: string;
  urls?: [{ link: string; label: string; type: LinkType }];
  language?: string;
}

export default function Talk(props: TalkProps): React.ReactElement {
  const i18n = usei18n();

  const language = props.language && i18n.getTranslationFor(`languages.${props.language}`);
  const languagePrefix = props.language && i18n.getTranslationFor('article.languagePrefix');

  return (
    <Container>
      {props.image && <Image src={props.image} alt={`Preview for ${props.title}`} data-testid="talk-image" />}
      <Details>
        <Header>
          <Title>{props.title}</Title>
          {languagePrefix && (
            <Language data-testid="talk-language">
              {languagePrefix} {language}
            </Language>
          )}
          {props.description && <Description data-testid="talk-description">{props.description}</Description>}
        </Header>
        {props.urls && (
          <Urls data-testid="talk-urls-list">
            {props.urls.map((url, index) => (
              <UrlsLink
                data-testid="talk-urls-item"
                key={`${index}-${url.link}`}
                href={url.link}
                target="_blank"
                rel="noopener"
              >
                <UrlsIcon icon={url.type} />
                {url.label}
              </UrlsLink>
            ))}
          </Urls>
        )}
      </Details>
    </Container>
  );
}
