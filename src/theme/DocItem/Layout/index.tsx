import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import type DocItemLayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = WrapperProps<typeof DocItemLayoutType>;

export default function DocItemLayoutWrapper(props: Props): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const llmsTxtPath = useBaseUrl('/llms.txt');
  const llmsTxtUrl = `${siteConfig.url}${llmsTxtPath}`;

  return (
    <>
      <blockquote
        className="agent-llms-directive"
        style={{
          fontSize: '0.7rem',
          lineHeight: 1.4,
          color: 'var(--ifm-color-secondary-darkest)',
          borderLeft: '2px solid var(--ifm-color-secondary)',
          paddingLeft: '0.5rem',
          marginBottom: '0.5rem',
          opacity: 0.6,
        }}>
        Documentation index available at{' '}
        <a href={llmsTxtPath}>{llmsTxtUrl}</a>. Use this file to discover all
        available Sumo Logic documentation pages before exploring further.
      </blockquote>
      <DocItemLayout {...props} />
    </>
  );
}
