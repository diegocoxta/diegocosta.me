import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled(Image).attrs({
  imgStyle: {
    borderRadius: `50%`,
  },
})`
  margin-bottom: 0px;
  min-width: 50px;
  border-radius: 100%;
  margin-right: 20px;
`;

const Description = styled.p`
  color: #fff;
  margin: 0;
`;

function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;

  return (
    <Container>
      <Avatar
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
      />
      <Description>
        Escrito por {author}, team/tech lead and senior software engineer @ sanar | co-founder React Salvador community.
      </Description>
    </Container>
  );
}

export default Bio;
