// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar
export {default} from '@docusaurus/Noop';
import 'instantsearch.css/themes/satellite.css';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('2SJPGMLW1Q', 'fb2f4e1fb40f962900631121cb365549');

// ...

const search = instantsearch({
  // ...
  insights: true,
});

hits({
  templates: {
    item(hit, { html, components, sendEvent }) {
      return html`
        <div onClick="${() => sendEvent('click', hit, 'Product Clicked')}">
          <h2>
            ${components.Highlight({ attribute: 'name', hit })}
          </h2>
          <p>${hit.description}</p>
        </div>
      `;
    },
  },
});

hits({
  templates: {
    item(hit, { html, components, sendEvent }) {
      return html`
        <h2>${components.Highlight({ attribute: 'name', hit })}</h2>
        <p>${hit.description}</p>
        <button onClick="${() => sendEvent('conversion', hit, 'Purchase With One-Click')}">
          One-Click Purchase
        </button>
      `;
    },
  },
});


function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="crawler_sumodocs">
      <SearchBox />
      <RefinementList attribute="tags" />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
