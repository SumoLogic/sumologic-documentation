import React from 'react';

export default function Hit({ hit, children }) {
  return (
    <a
      href={hit.url}
      data-algolia-objectid={hit.objectID}
      data-algolia-queryid={hit.__queryID}
      data-algolia-index={hit.__indexName}
    >
      {children}
    </a>
  );
}
