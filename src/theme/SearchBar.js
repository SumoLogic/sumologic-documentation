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

// When a search is performed in Algolia-powered search
algolia.search(query).then(({ hits }) => {
  // Track the search event in Google Analytics
  gtag('event', 'search', {
    'search_term': query,
    'search_results_count': hits.length
  });
});

// When a user clicks on a search result
function trackClickResult(result) {
  // Track the click event in Google Analytics
  gtag('event', 'click_result', {
    'result_title': result.title,
    'result_url': result.url
  });
}


function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="crawler_sumodocs">
      <SearchBox />
      <RefinementList attribute="tags" />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
