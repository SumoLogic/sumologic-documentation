/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { FooterLinkItem, useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import isInternalUrl from '@docusaurus/isInternalUrl';
import ThemedImage, { Props as ThemedImageProps } from '@theme/ThemedImage';
import Social from '@site/src/components/Social';

function FooterLink({
  to,
  href,
  label,
  sublabel,
  icon,
  prependBaseUrlToHref,
  ...props
}: FooterLinkItem) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isExternalLink = label && href && !isInternalUrl(href);

  return (
    <Link
      className='footer__link-item'
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
    <div className='link'>
    {icon && <div className='link__icon'><span className="material-icons-outlined">{icon}</span></div>}
      <div className='link__body'>
        <div className='link__label'>
          {isExternalLink ? (
            <span>
              {label}
              <IconExternalLink
                {...(isExternalLink && {
                  width: 12,
                  height: 12,
                })}
              />
            </span>
          ) : (
            label
          )}
        </div>
        {sublabel && <div className='link__sublabel'>{sublabel}</div>}
      </div>
    </div>
    </Link>
  );
}

function FooterLogo({
  sources,
  alt,
  width,
  height,
}: Pick<ThemedImageProps, 'sources' | 'alt' | 'width' | 'height'>) {
  return (
    <ThemedImage
      className='footer__logo'
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', 'padding--none', {
        'footer--dark': footer.style === 'dark',
      })}
    >
        <div className="footer-container">
          <div className="footer-flex">
        {links && links.length > 0 && (
          <div className='row footer__links padding-vert--xl'>
            <div className='footer-box'>
            {(logo) && (
              <div>
                {logo && (logo.src || logo.srcDark) && (
                  <div >
                    {logo.href ? (
                      <Link href={logo.href}>
                        <FooterLogo alt={logo.alt} sources={sources} />
                      </Link>
                    ) : (
                      <FooterLogo alt={logo.alt} sources={sources} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
            {links.map((linkItem, i) => (
              <div key={i} className='footer-box'>
                {linkItem.title != null ? (
                  <h4 className='footer__title'>{linkItem.title}</h4>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className='footer__items'>
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className='footer__item' // Developer provided the HTML, so assume it is safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className='footer__item'>
                          <FooterLink {...item} />
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        </div>
        <p align="center"><img class="svg" src="/img/sumo-logo.svg" alt="Sumo Logic logo" width="250"></img></p>
        <p align="center"><a href="https://www.youtube.com/channel/UCI16kViradUnvH6DiQmwdqw"><img class="png" src="/img/youtube-logo.png" alt="Sumo Logic YouTube" width="28"></img></a>&nbsp;&nbsp;<a href="https://twitter.com/SumoLogic"><img class="png" src="/img/twitter-logo.png" alt="Sumo Logic Twitter" width="25"></img></a></p>
        <p align="center"><a href="https://www.sumologic.com/privacy-statement"><small>Privacy Statement</small></a> | <a href="https://www.sumologic.com/legal"><small>Legal</small></a> | <a href="https://www.sumologic.com/terms-conditions"><small>Terms of Use</small></a></p>
        {(copyright) && (
          <div className='footer__bottom'>
            {copyright ? (
              <div
                className='footer__copyright' // Developer provided the HTML, so assume it is safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
}

export default React.memo(Footer);
