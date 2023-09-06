/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect} from 'react';
import clsx from 'clsx';

import type {Props} from '@theme/NavbarItem/HtmlNavbarItem';

function loadGoogleTranslateScript() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const addScript = document.createElement('script');
    addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = async function () {
      // Function to initialize the Google Translate widget
      const initGoogleTranslate = () => {
        new google.translate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      };
    
      // Function will wait for element id to be available
      const waitForElement = () => {
        return new Promise<void>((resolve) => {
          const checkElement = () => {
            const targetElement = document.getElementById('google_translate_element');
            if (targetElement) {
              // If the target element is available, resolve the Promise
              resolve();
            } else {
              // If the target element is not available, wait and check again
              setTimeout(checkElement, 100); // Adjust the time delay as needed
            }
          };
          checkElement(); // Start checking for the element
        });
      };
    
      // Wait for the target element to be available before initializing the widget
      await waitForElement();
      initGoogleTranslate();
    };
    
  }
}
export default function HtmlNavbarItem({
  value,
  className,
  mobile = false,
  isDropdownItem = false,
}: Props): JSX.Element {
  const Comp = isDropdownItem ? 'li' : 'div';
  useEffect(() => {
    if(process.env.NODE_ENV !== 'development') {
    loadGoogleTranslateScript();
    } else {
      console.log('Google Translate Not loaded in Dev');
    }
  },[]);
  return (
    <Comp
      className={clsx(
        {
          navbar__item: !mobile && !isDropdownItem,
          'menu__list-item': mobile,
        },
        className,
      )}
      dangerouslySetInnerHTML={{__html: value}}
    />
  );
}
