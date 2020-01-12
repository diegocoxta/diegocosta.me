import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { kebabCase } from 'lodash';

interface PostHeaderProps {
  url?: string;
  date: string;
  readingTime: number;
  title: string;
  tags: string[];
}

const Container = styled.header`
  margin: 20px 0 0 0;
`;

const Title = styled.h3`
  font-family: 'Raleway', sans-serif;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 36px;
  margin: 0;
`;

const CustomLink = styled(Link)`
  color: #fff;
  box-shadow: none;
  text-decoration: none;

  :hover {
    border-bottom: 1px solid #fff;
  }
`;

const TagLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  font-size: 14px;
  color: #d73738;
  font-weight: 700;
  text-transform: lowercase;

  :hover {
    border-bottom: 1px solid #d73738;
  }
`;

const TagList = styled.ul`
  display: flex;
  margin-bottom: 0;
  padding: 0;
`;

const TagItem = styled.li`
  list-style: none;
  padding: 0 10px 0 0;
  margin-bottom: 5px;
`;

const Details = styled.p`
  color: #9a9a9a;
  font-size: 18px;
  margin: 5px 0;
`;

function PostHeader(props: PostHeaderProps) {
  const readingTime = props.readingTime < 1 ? 'Menos de 1 minuto' : `${props.readingTime.toFixed()} minutos`;

  return (
    <Container>
      <Title>{props.url ? <CustomLink to={props.url}>{props.title}</CustomLink> : props.title}</Title>
      <Details>
        {props.date} · {readingTime} de leitura
      </Details>
      {props.tags && (
        <TagList>
          {props.tags.map(tag => (
            <TagItem>
              <TagLink to={`/tags/${kebabCase(tag)}`}>#{tag.replace(/ /g, '-')}</TagLink>
            </TagItem>
          ))}
        </TagList>
      )}
    </Container>
  );
}

export default PostHeader;
