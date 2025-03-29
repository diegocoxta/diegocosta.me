import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import * as BsIcon from 'react-icons/bs';
import * as SiIcon from 'react-icons/si';

export default function Icon({ name, props }: { name: string; props?: IconBaseProps }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let ElementIcon = SiIcon[name];

  if (name.startsWith('Bs')) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ElementIcon = BsIcon[name];
  }

  return <ElementIcon {...props} />;
}
