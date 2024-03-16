import styled from 'styled-components';

export interface BodyPostProps {
  html: string;
}

export default styled.section.attrs<BodyPostProps>((props) => ({
  dangerouslySetInnerHTML: { __html: props.html },
}))<BodyPostProps>`
  line-height: 1.5;
  font-size: 19px;
  margin-top: 10px;

  a {
    color: ${({ theme }) => theme.accentColor};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundColor};

    &:hover,
    &:focus {
      border-bottom: 1px solid ${({ theme }) => theme.accentColor};
      outline: none;
    }
  }

  code {
    background: ${({ theme }) => theme.accentColor}40;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 16px;
  }

  blockquote {
    border-left: 5px solid ${({ theme }) => theme.accentColor};
    padding-left: 20px;
    margin-left: 0;
  }

  img {
    box-shadow: none !important;
  }

  h3 {
    font-size: 28px;
  }

  table.uses-table {
    width: 100%;
    margin: 40px 0;

    td {
      text-align: center;
    }
  }
`;
