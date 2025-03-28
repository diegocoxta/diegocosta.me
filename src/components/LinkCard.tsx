import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    transform: scale(1.1);
  }
`;

const Button = styled.div`
  display: flex;
  padding: 16px;
  color: #fff;
  font-weight: bold;
  justify-content: space-between;
`;

const ButtonContent = styled.div``;

const ButtonDescription = styled.span`
  font-size: 11px;
  font-weight: 300;
  margin: 0 10px;
`;

const CardContent = styled.div`
  background: ${({ theme }) => theme.titleColor};
  padding: 16px;
  font-size: 20px;
  line-height: 1.4;
  color: ${({ theme }) => theme.backgroundColor};
  border-radius: 30px 30px 0 0;
`;

interface LinkCardProps {
  url: string;
  title: string;
  extra?: string;
}

export default function LinkCard(props: LinkCardProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (props.extra) {
      fetch(props.extra).then(async (response) => {
        const json = await response.json();
        setContent(json.message);
      });
    }
  }, []);

  return (
    <Container href={props.url}>
      {props.extra && content && <CardContent data-testid="linkcard-card-content">{content}</CardContent>}
      <Button>
        <ButtonContent>
          {props.title}
          <ButtonDescription>
            {props.url.replace('https://', '').replace('www.', '').replace('mailto:', '')}
          </ButtonDescription>
        </ButtonContent>
        <IoMdOpen />
      </Button>
    </Container>
  );
}
