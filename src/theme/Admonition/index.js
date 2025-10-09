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
function WarningIcon() {
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
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M 10.277344 16.054688 C 6.851562 16.054688 3.457031 16.054688 0.0585938 16.054688 C 0.0585938 10.726562 0.0585938 5.394531 0.0585938 0.0625 C 5.382812 0.0625 10.710938 0.0625 16.046875 0.0625 C 16.046875 5.390625 16.046875 10.722656 16.046875 16.054688 C 14.136719 16.054688 12.222656 16.054688 10.277344 16.054688 M 5.597656 9.796875 C 5.597656 10.5625 5.597656 11.328125 5.597656 12.101562 C 5.914062 12.101562 6.179688 12.101562 6.472656 12.101562 C 6.472656 11.820312 6.472656 11.542969 6.472656 11.265625 C 6.480469 10.8125 6.472656 10.359375 6.5 9.910156 C 6.519531 9.605469 6.777344 9.398438 7.0625 9.402344 C 7.351562 9.402344 7.539062 9.582031 7.558594 9.921875 C 7.582031 10.289062 7.578125 10.660156 7.582031 11.027344 C 7.585938 11.386719 7.582031 11.742188 7.582031 12.097656 C 7.882812 12.097656 8.148438 12.097656 8.429688 12.097656 C 8.429688 11.253906 8.457031 10.421875 8.421875 9.589844 C 8.394531 9.023438 7.972656 8.691406 7.402344 8.664062 C 6.96875 8.644531 6.609375 8.789062 6.328125 9.121094 C 6.089844 8.800781 5.789062 8.671875 5.425781 8.664062 C 5.058594 8.652344 4.75 8.78125 4.46875 9.070312 C 4.457031 8.945312 4.449219 8.867188 4.445312 8.789062 C 4.179688 8.789062 3.933594 8.789062 3.679688 8.789062 C 3.679688 9.898438 3.679688 10.996094 3.679688 12.09375 C 3.960938 12.09375 4.234375 12.09375 4.511719 12.09375 C 4.511719 11.683594 4.503906 11.296875 4.511719 10.90625 C 4.515625 10.554688 4.515625 10.203125 4.554688 9.855469 C 4.585938 9.585938 4.78125 9.433594 5.046875 9.410156 C 5.304688 9.390625 5.5 9.488281 5.597656 9.796875 M 9.890625 11.804688 C 10.28125 12.136719 10.734375 12.253906 11.234375 12.210938 C 12.140625 12.136719 12.667969 11.558594 12.667969 10.65625 C 12.667969 10.453125 12.652344 10.25 12.671875 10.046875 C 12.707031 9.679688 12.550781 9.40625 12.304688 9.160156 C 11.855469 8.707031 11.300781 8.585938 10.699219 8.699219 C 9.863281 8.855469 9.445312 9.378906 9.445312 10.21875 C 9.445312 10.394531 9.460938 10.570312 9.441406 10.746094 C 9.394531 11.167969 9.5625 11.5 9.890625 11.804688 M 10.503906 7.429688 C 10.957031 7.484375 11.382812 7.4375 11.742188 7.078125 C 11.761719 7.191406 11.777344 7.265625 11.789062 7.324219 C 12.054688 7.324219 12.300781 7.324219 12.542969 7.324219 C 12.542969 6.210938 12.542969 5.117188 12.542969 4.015625 C 12.257812 4.015625 11.984375 4.015625 11.691406 4.015625 C 11.691406 4.230469 11.695312 4.433594 11.691406 4.636719 C 11.6875 5.144531 11.699219 5.652344 11.667969 6.160156 C 11.644531 6.523438 11.347656 6.722656 10.957031 6.691406 C 10.632812 6.667969 10.476562 6.480469 10.472656 6.105469 C 10.472656 5.726562 10.472656 5.347656 10.472656 4.96875 C 10.472656 4.648438 10.472656 4.328125 10.472656 4.019531 C 10.160156 4.019531 9.890625 4.019531 9.609375 4.019531 C 9.609375 4.804688 9.609375 5.570312 9.609375 6.339844 C 9.609375 6.964844 9.851562 7.269531 10.503906 7.429688 M 5.683594 4.785156 C 5.78125 4.847656 5.878906 4.910156 5.980469 4.976562 C 6.140625 4.78125 6.285156 4.601562 6.4375 4.421875 C 5.839844 3.90625 5.164062 3.785156 4.429688 3.96875 C 4.03125 4.070312 3.636719 4.417969 3.65625 4.820312 C 3.691406 5.53125 3.773438 5.6875 4.402344 5.878906 C 4.527344 5.914062 4.652344 5.941406 4.777344 5.972656 C 4.984375 6.023438 5.199219 6.050781 5.394531 6.132812 C 5.488281 6.171875 5.609375 6.3125 5.601562 6.402344 C 5.59375 6.507812 5.484375 6.644531 5.378906 6.691406 C 5.253906 6.75 5.078125 6.773438 4.949219 6.730469 C 4.597656 6.621094 4.257812 6.46875 3.871094 6.316406 C 3.761719 6.441406 3.601562 6.621094 3.445312 6.796875 C 4.035156 7.40625 5.019531 7.625 5.78125 7.328125 C 6.292969 7.128906 6.441406 6.855469 6.4375 6.160156 C 6.433594 5.714844 6.109375 5.566406 5.777344 5.453125 C 5.4375 5.335938 5.082031 5.265625 4.734375 5.171875 C 4.59375 5.132812 4.433594 5.109375 4.445312 4.902344 C 4.457031 4.683594 4.628906 4.609375 4.789062 4.621094 C 5.074219 4.640625 5.359375 4.714844 5.683594 4.785156 Z M 5.683594 4.785156 "
      />
    </svg>
  );
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
  warning: {
    infimaClassName: 'warning',
    iconComponent: WarningIcon,
    label: (
      <Translate
        id="theme.admonition.warning"
        description="The default label used for the Warning admonition (:::warning)">
        warning
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
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
