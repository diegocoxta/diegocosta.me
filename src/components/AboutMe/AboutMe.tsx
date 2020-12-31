import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #fff;
  font-size: 4vw;
  font-weight: 700;
  border-left: 0.7vw solid red;
  padding-left: 4vw;

  @media (min-width: 760px) {
    font-size: 22px;
    padding-left: 20px;
    border-left-width: 10px;
  }
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  border-bottom: 0.7vw solid #d73738;

  @media (min-width: 760px) {
    border-bottom-width: 2px;
  }
`;

export default function AboutMe(): React.ReactElement {
  return (
    <Container>
      Olá, me chamo Diego e sou engenheiro de software graduando em Analise e Desenvolvimento de Sistemas pela
      Universidade Salvador com mais de 8 anos de experiência em desenvolvimento web e mobile. Atualmente trabalho na
      Sanar como Tech Lead do time de desenvolvimento mobile e ajudo a organizar meetups do{' '}
      <Link rel="noopener" href="http://react.salvador.br" target="_blank">
        React Salvador.
      </Link>
    </Container>
  );
}
