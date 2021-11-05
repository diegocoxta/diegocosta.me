import styled from 'styled-components';

export default styled.div<{ height?: number }>`
  background: linear-gradient(90deg, ${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    linear-gradient(${({ theme }) => theme.backgroundColor} 20px, transparent 1%) center,
    ${({ theme }) => theme.textColor};
  background-size: 22px 22px;
  height: ${({ height }) => height ?? 120}px;
  margin: 40px 0;
  width: 100%;
`;
