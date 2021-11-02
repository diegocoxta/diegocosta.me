import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { BsMoon, BsSun } from 'react-icons/bs';

import { usei18n } from '~/helpers/i18n';

const Container = styled.button<{ enabled: boolean }>`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.accentColor};
  border-radius: 18px;
  height: 34px;
  width: 50px;
  padding: 0px;
  display: flex;
  justify-content: ${({ enabled }) => (enabled ? 'flex-start' : 'flex-end')};
  transition: all 1s linear;
  margin: 10px 0 0 20px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const Indicator = styled.div`
  height: 30px;
  width: 30px;
  background: ${({ theme }) => theme.accentColor};
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ThemeSwitcher(): React.ReactElement {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.theme === 'dark';

  const i18n = usei18n();

  return (
    <Container
      aria-label={i18n.getTranslationFor('themeSwitcher.toggle')}
      enabled={isDarkMode}
      onClick={themeContext?.themeToggler}
    >
      <Indicator>{isDarkMode ? <BsMoon /> : <BsSun />}</Indicator>
    </Container>
  );
}
