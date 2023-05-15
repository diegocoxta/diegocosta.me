import React from 'react';
import * as BsIcon from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib';
import styled from 'styled-components';
import { KBarAnimator, KBarPortal, useMatches, KBarPositioner, KBarSearch, KBarResults, useKBar } from 'kbar';
import { useLocale } from '~/hooks/useLocale';

const Container = styled.div``;

const Button = styled.button`
  background: transparent;
  border: 0px;
  padding: 5px;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  transition: background 0.3s linear;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background: ${({ theme }) => `${theme.textColor}1A`};
  }
`;

export function Icon({ name, props }: { name: string; props?: IconBaseProps }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ElementIcon = BsIcon[name];

  return <ElementIcon {...props} />;
}

const Positioner = styled(KBarPositioner)`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  inset: 0px;
  padding: 14vh 16px 16px;
  background: ${({ theme }) => `${theme.textColor}CC`};
  box-sizing: border-box;
`;

const Animator = styled(KBarAnimator)`
  background-color: ${({ theme }) => theme.backgroundColor};
  max-width: 600px;
  width: 100%;
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)):  {
    backdrop-filter: saturate(300%) blur(25px);
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  & > div > div::-webkit-scrollbar: {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & > div > div: {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Search = styled(KBarSearch)`
  padding: 12px 0;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0 0 0 10px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

const GroupName = styled.div`
  padding: 8px 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`;

const Item = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  background-color: ${({ active, theme }) => (active ? `${theme.textColor}1A` : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
  border-radius: 5px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    flex-shrink: 0;
  }
`;

const Shortcut = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
`;

const ShortcutIcon = styled.kbd`
  background: ${({ theme }) => `${theme.textColor}1A`};
  color: ${({ theme }) => theme.textColor};
  padding: 4px 8px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 14px;
`;

interface NavigationProps {
  placeholder: string;
}

export default function Navigation(props: NavigationProps): React.ReactElement {
  const { query } = useKBar();
  const { results } = useMatches();
  const locale = useLocale();

  return (
    <Container>
      <Button aria-label={locale.getTranslationFor('Open navigation menu', 'header')} onClick={() => query.toggle()}>
        <Icon name="BsCommand" props={{ size: 28 }} />
      </Button>

      <KBarPortal>
        <Positioner>
          <Animator>
            <Item>
              <Icon name="BsSearch" />
              <Search defaultPlaceholder={props.placeholder} />
              <Shortcut aria-hidden>
                <ShortcutIcon>esc</ShortcutIcon>
              </Shortcut>
            </Item>
            <KBarResults
              items={results}
              onRender={({ item, active }) => {
                if (typeof item === 'string') {
                  return <GroupName>{item}</GroupName>;
                }

                return (
                  <Item active={active}>
                    <Label>
                      {typeof item.icon === 'string' && <Icon name={item.icon} />}
                      {item.name}
                    </Label>

                    {item.shortcut && (
                      <Shortcut aria-hidden>
                        {item.shortcut.map((shortcut: string) => (
                          <ShortcutIcon key={shortcut}>{shortcut}</ShortcutIcon>
                        ))}
                      </Shortcut>
                    )}
                  </Item>
                );
              }}
            />
          </Animator>
        </Positioner>
      </KBarPortal>
    </Container>
  );
}
