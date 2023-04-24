import React from 'react';
import * as BsIcon from 'react-icons/bs';
import { IconBaseProps } from 'react-icons/lib';
import styled from 'styled-components';
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  Action,
} from 'kbar';

const Container = styled.div``;

const Button = styled.div`
  padding: 5px;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  transition: background 0.3s linear;

  &:hover {
    background: ${({ theme }) => `${theme.textColor}1A`};
  }
`;

interface IconProps {
  name: string;
  props?: IconBaseProps;
}

export function Icon({ name, props }: IconProps): JSX.Element {
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
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

const ResultItem = styled.div<{ active: boolean }>`
  padding: 12px 16px;
  background-color: ${({ active, theme }) => (active ? `${theme.textColor}1A` : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
`;

const GroupName = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.textColor};
`;

const Item = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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

interface CommanderProps {
  actions: Action[];
}

function Results() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === 'string') {
          return <GroupName>{item}</GroupName>;
        }

        return (
          <ResultItem active={active}>
            <Item>
              {typeof item.icon === 'string' && <Icon name={item.icon} />}
              {item.name}
            </Item>

            {item.shortcut && (
              <Shortcut aria-hidden>
                {item.shortcut.map((shortcut: string) => (
                  <ShortcutIcon key={shortcut}>{shortcut}</ShortcutIcon>
                ))}
              </Shortcut>
            )}
          </ResultItem>
        );
      }}
    />
  );
}

export default function Commander(props: CommanderProps): React.ReactElement {
  return (
    <Container>
      <Button>
        <Icon name="BsCommand" props={{ size: 28 }} />
      </Button>

      <KBarProvider actions={props.actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder="Type a command or search…" />
              <Results />
            </Animator>
          </Positioner>
        </KBarPortal>
      </KBarProvider>
    </Container>
  );
}
