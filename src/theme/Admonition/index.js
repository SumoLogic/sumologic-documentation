import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
function NoteIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
      />
    </svg>
  );
}
function TipIcon() {
  return (
    <svg viewBox="0 0 12 16">
      <path
        fillRule="evenodd"
        d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"
      />
    </svg>
  );
}
function DangerIcon() {
  return (
    <svg viewBox="0 0 12 16">
      <path
        fillRule="evenodd"
        d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
      />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
      />
    </svg>
  );
}
function CautionIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
      />
    </svg>
  );
}
function SumoIcon() {
  return (
    <svg 
      width="166" 
      height="150" 
      viewBox="0 0 166 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M27.82 0C15.23 0 6.82 5.43 3.95 12.91V25.68C6.15 31.49 12.12 34.55 24.95 37.35C29.16 38.29 32.09 38.99 33.73 39.35C36.23 40.07 38.39 41.19 39.27 43.09V47.18C38.04 49.95 34.27 51.42 29.27 51.42C25.9342 51.4914 22.6212 50.854 19.55 49.55C16.62 48.38 13.11 46.04 8.78 42.55L0 52.38C9.48 60.81 17.56 63.74 28.92 63.74C41.86 63.74 50.7 58.56 53.56 50.34C53.56 48.34 53.56 39.81 53.56 37.64C51.13 31.18 44.4 27.96 31.32 25.06C27.1 24.12 24.18 23.42 22.54 22.95C20.08 22.25 18.41 21.35 17.73 19.95V16.52C18.82 13.9 22.41 12.3 27.45 12.3C33.89 12.3 38.34 13.82 45.37 19.3L53.56 9.3C45.32 2.46 38.13 0 27.82 0ZM148.46 2V38.07C148.46 46.15 143.78 50.48 136.17 50.48C129.61 50.48 126.17 46.73 126.17 40.48V1.99H110.99V44.73C110.99 56.32 117.99 63.73 132.19 63.73C140.73 63.73 146.59 60.68 149.75 55.53V61.86H163.68V1.99L148.46 2ZM69.75 85.88C61.8967 85.88 55.9233 88.8067 51.83 94.66C48.56 89.04 42.83 85.88 35.21 85.88C27.36 85.88 21.63 88.81 18.11 94.55V87.87H3.95V147.7H19.17V110.93C19.17 103.93 23.03 98.98 29.71 98.98C36.03 98.98 39.19 102.85 39.19 110.46V147.69H54.41V110.93C54.41 103.93 58.27 98.98 64.95 98.98C71.63 98.98 74.43 103.32 74.43 110.46V147.69H89.65V105.89C89.65 93.6 82.39 85.87 69.75 85.87V85.88ZM165.89 105.12C161.48 93.28 150.7 85.88 137.04 85.88C123.38 85.88 112.48 93.28 108.04 105.12V130.33C112.46 142.18 123.26 149.58 137.04 149.58C150.82 149.58 161.48 142.18 165.89 130.33V105.12ZM122.83 108.92C125.2 102.61 130.29 98.76 137.04 98.76C143.79 98.76 148.76 102.61 151.13 108.92C151.13 112.1 151.13 123.64 151.13 126.66C148.76 132.97 143.7 136.66 137.05 136.66C130.4 136.66 125.22 132.93 122.84 126.66L122.83 108.92Z" 
        fill="white"
      />
    </svg>
  )
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  sumo: {
    infimaClassName: 'sumo',
    iconComponent: SumoIcon,
    label: (
      <Translate
        id="theme.admonition.sumo"
        description="The default label used for the Sumo admonition (:::sumo)">
        sumo
      </Translate>
    ),
  },
  note: {
    infimaClassName: 'secondary',
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)">
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: 'success',
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)">
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: 'danger',
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)">
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: 'info',
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)">
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: 'warning',
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)">
        caution
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
  warning: 'danger',
};
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType;
  const config = AdmonitionConfigs[type];
  if (config) {
    return config;
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`,
  );
  return AdmonitionConfigs.info;
}
// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) &&
      item.props?.mdxType === 'mdxAdmonitionTitle',
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}
function processAdmonitionProps(props) {
  const {mdxAdmonitionTitle, rest} = extractMDXAdmonitionTitle(props.children);
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}
export default function Admonition(props) {
  const {children, type, title, icon: iconProp} = processAdmonitionProps(props);
  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;
  const {iconComponent: IconComponent} = typeConfig;
  const icon = iconProp ?? <IconComponent />;
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        'alert',
        `alert--${typeConfig.infimaClassName}`,
        styles.admonition,
      )}>
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
        {titleLabel}
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );
}
