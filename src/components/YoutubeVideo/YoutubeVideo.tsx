import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  margin-top: 20px;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

interface YoutubeVideo {
  uuid: string;
}

export default function YoutubeVideo(props: YoutubeVideo): React.ReactElement {
  return (
    <Content>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.uuid}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Content>
  );
}
