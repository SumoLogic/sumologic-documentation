'use client';

import { useEffect } from 'react';
import aa from 'search-insights';

export default function SearchConversionTracker() {
  useEffect(() => {
    aa('init', {
      appId: '2SJPGMLW1Q',
      apiKey: 'fb2f4e1fb40f962900631121cb365549',
      useCookie: true,
    });

    const handleClick = (event) => {
      const target = event.target.closest('a[data-algolia-objectid][data-algolia-queryid][data-algolia-index]');
      if (target) {
        const objectID = target.getAttribute('data-algolia-objectid');
        const queryID = target.getAttribute('data-algolia-queryid');
        const indexName = target.getAttribute('data-algolia-index');

        if (objectID && queryID && indexName) {
          console.log('Sending conversion:', {
            objectID,
            queryID,
            indexName,
          });

          aa('convertedObjectIDsAfterSearch', {
            index: indexName,
            eventName: 'Search result clicked',
            queryID,
            objectIDs: [objectID],
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
