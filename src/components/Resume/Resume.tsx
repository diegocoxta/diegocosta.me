import React from 'react';
import styled from 'styled-components';

import ReadMore from './components/ReadMore';
import TimelineItem from './components/TimelineEntry';

const Container = styled.div`
  margin: 0 0 60px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 60%;
`;

const Sidebar = styled.div`
  width: 30%;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.titleColor};
  box-shadow: none;
  text-decoration: none;
  font-size: 36px;
  margin: 0;
  font-weight: 700;
`;

export const Paragraph = styled.p`
  line-height: 1.5;
  font-size: 19px;
  margin-top: 10px;
`;

const Quote = styled.blockquote`
  border-left: 5px solid ${({ theme }) => theme.accentColor};
  padding-left: 20px;
  margin-left: 0;
`;

const Timeline = styled.ul`
  max-width: 95%;
  list-style: none;
  padding: 0px;
`;

export default function Resume(props: Queries.ResumePageQuery['resume']['edges'][0]['node']) {
  return (
    <Container>
      <Content>
        <Title>Work Experience</Title>
        <Timeline>
          {props.work?.map((work) => {
            const interval = `${work?.startDate} - ${work?.endDate ? work.endDate : 'now'}`;
            const title = `${work?.position} @ ${work?.company}`;

            return (
              <TimelineItem key={interval} title={title} interval={interval}>
                <ReadMore shortAt={300}>{work?.summary ?? ''}</ReadMore>
              </TimelineItem>
            );
          })}
        </Timeline>

        <Title>References</Title>
        <p>These are a collection of Recommendations I`ve received, from amazing people, in my career.</p>
        {props.references?.map((reference, index) => (
          <Quote key={`education-${index}`}>
            {reference?.reference?.split('\n').map((reference, index) => (
              <p key={`reference-${index}`}>{reference}</p>
            ))}
            <h3>by {reference?.name}</h3>
          </Quote>
        ))}
      </Content>

      <Sidebar>
        <Title>Education History</Title>
        <Timeline>
          {props.education?.map((education) => (
            <TimelineItem
              key={education?.area}
              title={education?.area ?? ''}
              subtitle={education?.institution ?? ''}
              interval={`${education?.startDate} - ${education?.endDate}`}
            />
          ))}
        </Timeline>

        <Title>Languages</Title>
        {props.languages?.map((language, index) => (
          <li key={`languages-${index}`}>
            {language?.language} - {language?.description}
          </li>
        ))}
      </Sidebar>
    </Container>
  );
}
