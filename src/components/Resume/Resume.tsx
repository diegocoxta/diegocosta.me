import React from 'react';
import styled from 'styled-components';

import { useLocale, getContentLanguage, Link } from '~/hooks/useLocale';

const Container = styled.article`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
`;

const Title = styled(Link).attrs((props) => ({
  as: props.to ? Link : 'h2',
}))`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: 700;

  :hover,
  :focus {
    border-bottom: ${({ theme, to }) => to && `1px solid ${theme.titleColor}`};
    outline: none;
  }
`;

export const Paragraph = styled.p`
  line-height: 1.5;
  font-size: 19px;
  margin-top: 10px;
`;

export default function Resume(props: Queries.ResumePageQuery['resume']['edges'][0]['node']) {
  return (
    <Container>
      <Title>Work</Title>
      {props.work?.map((work, index) => (
        <div key={`work-${index}`}>
          <h3>
            {work?.position} @ {work?.company}
          </h3>
          <Paragraph>
            {work?.startDate} - {work?.endDate}
          </Paragraph>
          {work?.summary?.split('\n').map((summary, index) => (
            <Paragraph key={`summary-${index}`}>{summary}</Paragraph>
          ))}
        </div>
      ))}
      <Title>Education</Title>
      {props.education?.map((education, index) => (
        <div key={`education-${index}`}>
          <h3>
            {education?.area} @ {education?.institution}
          </h3>
          <Paragraph>
            {education?.startDate} - {education?.endDate}
          </Paragraph>
          <Paragraph>{education?.score}</Paragraph>
        </div>
      ))}
      <Title>Languages</Title>
      {props.languages?.map((language, index) => (
        <li key={`languages-${index}`}>
          {language?.language} - {language?.description}
        </li>
      ))}
      <Title>References</Title>
      {props.references?.map((reference, index) => (
        <div key={`education-${index}`}>
          <h3>by {reference?.name}</h3>
          {reference?.reference?.split('\n').map((reference, index) => (
            <p key={`reference-${index}`}>{reference}</p>
          ))}
        </div>
      ))}
    </Container>
  );
}
