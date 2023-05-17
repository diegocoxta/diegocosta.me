import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em 0;
  align-items: center;
`;

const Icon = styled.div`
  border: ${({ theme }) => `2px solid ${theme.textColor}`};
  border-radius: 10px;
  display: block;
  width: 1em;
  height: 1em;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin: 0 0 0 1em;
  padding: 0.25em 0 0;
`;

const Content = styled.div`
  position: relative;
  margin-left: 2.5em;

  :before {
    background-color: ${({ theme }) => theme.textColor};
    content: '';
    margin-left: 1px;
    position: absolute;
    top: 0;
    left: -2em;
    width: 2px;
    height: 100%;
  }
`;

const Subtitle = styled.p`
  margin-top: 0;
  color: ${({ theme }) => theme.accentColor};
  font-weight: 900;
  border-radius: 1em;
`;

const Interval = styled.p`
  margin-top: 0;
  color: ${({ theme }) => theme.textColor};
  border-radius: 1em;
`;

interface TimelineEntryProps {
  title: string;
  subtitle?: string;
  interval: string;
}

export default function TimelineEntry(props: React.PropsWithChildren<TimelineEntryProps>): React.ReactElement {
  return (
    <Item>
      <Header>
        <Icon />
        <Title>{props.title}</Title>
      </Header>
      <Content>
        {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
        {props.interval && <Interval>{props.interval}</Interval>}
        {props.children}
      </Content>
    </Item>
  );
}

TimelineEntry.defaultProps = {
  interval: 'Now',
};
