import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import GoogleTranslateNavbarItem from './GoogleTranslateNavbarItem';

function HtmlNavbarItem({ position, value, className }) {
  const themeConfig = useThemeConfig();
  const isRight = position === 'right';
  const isLeft = position === 'left';
  const classNames = clsx(
    'navbar__item',
    {
      'navbar__item--right': isRight,
      'navbar__item--left': isLeft,
    },
    className
  );

  return (
    <div className={classNames}>
      {value === 'google_translate' ? (
        <GoogleTranslateNavbarItem />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      )}
    </div>
  );
}

export default HtmlNavbarItem;
