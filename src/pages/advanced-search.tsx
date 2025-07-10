import React from 'react';
import Layout from '@theme/Layout';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  HierarchicalMenu,
  Pagination,
  ClearRefinements,
  Configure,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom';
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import '@site/src/css/search-facelift.css';

/*──────────────── ALGOLIA CLIENT ──────────────*/
const searchClient = algoliasearch(
  '2SJPGMLW1Q',
  'fb2f4e1fb40f962900631121cb365549',   // search-only key
);

/*──────────────── RESULT CARD ──────────────────*/
function Hit({ hit }: { hit: any }) {
  return (
    <a href={hit.url} className="hit-card">
      <p className="hit-breadcrumb">
        {hit.hierarchy.lvl0}
        {hit.hierarchy.lvl1 ? ` › ${hit.hierarchy.lvl1}` : ''}
      </p>

      <h3 className="hit-title">
        {/* show the deepest heading present (lvl1 or fall back to lvl0) */}
        <Highlight hit={hit} attribute={hit.hierarchy.lvl1 ? 'hierarchy.lvl1' : 'hierarchy.lvl0'} />
      </h3>

      <p className="hit-snippet">
        <Snippet hit={hit} attribute="content" />
      </p>
    </a>
  );
}

/*──────────────── PAGE ─────────────────────────*/
export default function AdvancedSearch() {
  /* any top-level categories you always want first */
  const PINNED = ['cloud soar'];

  /* prettify a slug (cloud-soar → Cloud SOAR) */
  const titleCase = (s: string) =>
    s.replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Layout title="Advanced search">
      <InstantSearch
        indexName="crawler_sumodocs"
        searchClient={searchClient}
        routing={{ router: historyRouter() }}
      >
        {/* top controls */}
        <div style={{ maxWidth: '84rem', margin: '2rem auto 0', padding: '0 1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <SearchBox className="flex-1" translations={{ placeholder: 'Search docs…' }} />
            <ClearRefinements />
          </div>
        </div>

        {/* body */}
        <div
          style={{
            maxWidth: '84rem',
            margin: '2rem auto',
            display: 'flex',
            gap: '2rem',
            padding: '0 1rem',
          }}
        >
          {/* facet column */}
          <aside className="facet-scroll" style={{ width: '16rem', flexShrink: 0 }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600 }}>
              Categories
            </h2>

            <HierarchicalMenu
              /* lvl2 removed per your request */
              attributes={['hierarchy.lvl0', 'hierarchy.lvl1']}
              sortBy={['name:asc']}                            /* alphabetical fallback */
              transformItems={(items) => {
                /* 1. strip counts  2. title-case slugs  3. pin Cloud SOAR */
                const cleaned = items.map((it) => {
                  const raw = it.label.replace(/\s+\d+$/, '');   // remove trailing " 123"
                  return { ...it, label: titleCase(raw) };
                });

                const pinned   = cleaned.filter((it) =>
                  PINNED.includes(it.label.toLowerCase()),
                );
                const others   = cleaned.filter(
                  (it) => !PINNED.includes(it.label.toLowerCase()),
                );

                return [...pinned, ...others];
              }}
            />
          </aside>

          {/* results column */}
          <main style={{ flex: 1 }}>
            <Hits hitComponent={Hit} />
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination />
            </div>
          </main>
        </div>

        <Configure hitsPerPage={18} />
      </InstantSearch>
    </Layout>
  );
}
