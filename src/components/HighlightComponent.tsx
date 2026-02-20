// src/components/HighlightComponent.js
import React from 'react';
import useTocHighlight from '@theme/useTocHighlight';

export default function HighlightComponent() {
  // Enables highlighting based on page headings
  useTocHighlight();

  return (
    <div className="highlight-box">
      <p>This component interacts with the active TOC link.</p>
    </div>
  );
}
 function updateLinkActiveClass(link: HTMLAnchorElement, active: boolean) {
      if (active) {
        if (lastActiveLinkRef.current && lastActiveLinkRef.current !== link) {
          lastActiveLinkRef.current?.classList.remove(linkActiveClassName);
        }
        link.classList.add(linkActiveClassName);
        lastActiveLinkRef.current = link;
        link.scrollIntoView({block: 'nearest'});
           } else {
        link.classList.remove(linkActiveClassName);
      }