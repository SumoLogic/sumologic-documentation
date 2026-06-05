import React from 'react';
import TOCDesktop from '@theme-original/DocItem/TOC/Desktop';
import type TOCDesktopType from '@theme/DocItem/TOC/Desktop';
import type { WrapperProps } from '@docusaurus/types';
import AITools from '@site/src/components/AITools';

type Props = WrapperProps<typeof TOCDesktopType>;

export default function TOCDesktopWrapper(props: Props): JSX.Element {
  return (
    <>
      <AITools />
      <TOCDesktop {...props} />
    </>
  );
}
