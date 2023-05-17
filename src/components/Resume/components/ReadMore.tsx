import React, { useState } from 'react';
import styled from 'styled-components';

import { useLocale } from '~/hooks/useLocale';

export const Paragraph = styled.span`
  line-height: 1.5;
  font-size: 19px;
  margin-top: 10px;
`;

const Expander = styled(Paragraph)`
  color: ${({ theme }) => theme.accentColor};
  cursor: pointer;
`;

interface ReadMoreProps {
  shortAt: number;
  children: string;
}

function truncate(text: string, max: number) {
  if (text.length <= max) {
    return [text, ''];
  }

  const truncatedText = text.slice(0, max - 1);
  const safeText = truncatedText.lastIndexOf('.') + 1;

  return [truncatedText.slice(0, safeText), text.slice(safeText).trim()];
}

export default function ReadMore(props: ReadMoreProps): React.ReactElement {
  const [fullText, setFullText] = useState(false);

  const locale = useLocale();
  const readMoreText = locale.getTranslationFor('read more', 'resume');

  const [t1, t2] = truncate(
    props.children
      .split('\n')
      .map((i) => `${i} <br />`)
      .join(''),
    300
  );

  return (
    <>
      <Paragraph dangerouslySetInnerHTML={{ __html: t1 }} />
      {fullText && <Paragraph dangerouslySetInnerHTML={{ __html: ` ${t2}` }} />}
      {!fullText && t2.length > 0 && <Expander onClick={() => setFullText(!fullText)}> {readMoreText}</Expander>}
    </>
  );
}
