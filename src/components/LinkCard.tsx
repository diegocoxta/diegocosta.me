import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '~/components/Icon';
import { IoMdOpen } from 'react-icons/io';

const Container = styled.a.attrs({
  target: '_blank',
})`
  background: ${({ theme }) => theme.accentColor};
  border-radius: 30px;
  margin: 16px 0;
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Button = styled.div`
  display: flex;
  padding: 10px 16px;
  color: #fff;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
`;

const ButtonIcon = styled.div`
  margin: 2px 5px 0 0;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonDescription = styled.span`
  font-size: 11px;
  font-weight: 300;
  margin: 0 10px;
`;

const CardContent = styled.div`
  background: ${({ theme }) => theme.titleColor};
  padding: 10px 16px 16px;
  font-size: 16px;
  line-height: 1.4;
  color: ${({ theme }) => theme.backgroundColor};
  border-radius: 0 0 30px 30px;

  p {
    margin: 0;
    display: inline;
  }

  span {
    font-size: 14px;
    display: block;
    margin-top: 10px;
  }
`;

interface LinkCardProps {
  url: string;
  title: string;
  api?: string | null;
  icon?: string | null;
}

export default function LinkCard(props: LinkCardProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (props.api) {
      fetch(props.api).then(async (response) => {
        const json = await response.json();
        setContent(json.message);
      });
    }
  }, []);

  return (
    <Container href={props.url}>
      <Button>
        <ButtonContent>
          {props.icon && (
            <ButtonIcon>
              <Icon name={props.icon} />
            </ButtonIcon>
          )}{' '}
          {props.title}
          <ButtonDescription>
            {props.url.replace('https://', '').replace('www.', '').replace('mailto:', '')}
          </ButtonDescription>
        </ButtonContent>
        <IoMdOpen />
      </Button>
      {props.api && content && (
        <CardContent data-testid="linkcard-card-content" dangerouslySetInnerHTML={{ __html: content }}></CardContent>
      )}
    </Container>
  );
}
