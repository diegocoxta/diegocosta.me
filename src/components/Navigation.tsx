import React, { useContext } from 'react';
import * as BsIcon from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib';
import styled, { ThemeContext } from 'styled-components';
import {
  KBarAnimator,
  KBarPortal,
  useMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  useKBar,
  KBarProvider,
} from 'kbar';
import { navigate } from 'gatsby';

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

  &:focus {
    outline: none;
  }

  &:hover {
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
  background: #2f3d4fcc;
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

export function NavigationModal(): React.ReactElement {
  const { query } = useKBar();
  const { results } = useMatches();

  return (
    <Container>
      <Button onClick={() => query.toggle()}>
        <Icon name="BsCommand" props={{ size: 28 }} />
      </Button>

      <KBarPortal>
        <Positioner>
          <Animator>
            <Item>
              <Icon name="BsSearch" />
              <Search defaultPlaceholder="Type a command or search…" />
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

interface NavigationModalProps {
  sourceCode?: string;
  pages: Queries.BlogTemplateQueryQuery['pages'];
}

export default function (props: NavigationModalProps) {
  const themeContext = useContext(ThemeContext);

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      section: 'Pages',
      perform: () => navigate('/'),
      icon: 'BsFillHouseFill',
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'a'],
      section: 'Pages',
      icon: 'BsNewspaper',
    },
    ...props.pages.nodes.map((p: Queries.BlogTemplateQueryQuery['pages']['nodes'][0]) => ({
      id: `page-${p.fields?.slug}`,
      name: p.frontmatter?.title as string,
      section: 'Pages',
      perform: () => navigate(p.fields?.slug ?? ''),
      icon: 'BsFillFileEarmarkFill',
      parent: p.fields?.collection === 'articles' ? 'articles' : undefined,
    })),
    {
      id: 'theme',
      name: 'Appearance',
      shortcut: ['g', 't'],
      section: 'Preferences',
      icon: 'BsBrushFill',
    },
    {
      id: 'theme-light',
      name: 'Light',
      shortcut: ['g', 't', 'l'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => themeContext?.setMode('light'),
      icon: 'BsSun',
    },
    {
      id: 'theme-dark',
      name: 'Dark',
      shortcut: ['g', 't', 'd'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => themeContext?.setMode('dark'),
      icon: 'BsMoon',
    },
    {
      id: 'source',
      name: 'Source Code',
      shortcut: ['g', 's'],
      section: 'Tools',
      perform: () => window.open(props.sourceCode as string, '_blank'),
      icon: 'BsCodeSlash',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <NavigationModal />
    </KBarProvider>
  );
}
