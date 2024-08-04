import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('2SJPGMLW1Q', 'fb2f4e1fb40f962900631121cb365549');

function Hit({ hit }) {
  return JSON.stringify(hit);
}

function App() {
  return (
    <InstantSearch indexName="instant_search" searchClient={searchClient}>
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}


export default CustomHit;
