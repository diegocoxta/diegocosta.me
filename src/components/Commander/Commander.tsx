import React from 'react';
import { BsCommand } from 'react-icons/bs';
import styled from 'styled-components';
import { KBarAnimator, KBarProvider, KBarPortal, useMatches, KBarPositioner, KBarSearch, KBarResults } from 'kbar';

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

const Kbd = styled.kbd`
  background: rgba(255, 255, 255, 0.1);
  color: pink;
  padding: 4px 8px;
  text-transform: uppercase;
`;

const Shortcut = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
`;

const Action = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Positioner = styled(KBarPositioner)`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  inset: 0px;
  padding: 14vh 16px 16px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
`;

const Search = styled(KBarSearch)`
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  background: $command;
  color: $primary;
`;

const Animator = styled(KBarAnimator)`
  background-color: #1a1c1e;
  max-width: 600px;
  width: 100%;
  color: yellow;
  border-radius: 8px;
  overflow: hidden;

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)):  {
    background-color: $command;
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

const GroupName = styled.div`
  padding: 8px 16px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: red;
`;

const getResultStyle = (active: boolean) => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  };
};

interface CommanderProps {
  actions: [];
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? <GroupName>{item}</GroupName> : <ResultItem action={item} active={active} />
      }
    />
  );
}

const ResultItem = React.forwardRef(({ action, active }, ref) => {
  return (
    <div ref={ref} style={getResultStyle(active)}>
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map((shortcut) => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </div>
  );
});

export default function Commander(props: CommanderProps): React.ReactElement {
  return (
    <Container>
      <Button>
        <BsCommand size={28} />
      </Button>

      <KBarProvider actions={props.actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder="Type a command or search…" />
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>
      </KBarProvider>
    </Container>
  );
}
