---
slug: /search/get-started-with-search/search-basics
title: Search Basics
description: Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/about-search-basics"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>About Search Basics</h4></a>
  <p>Sumo Logic search syntax, based on a funnel concept, uses logical and familiar operators allowing you to create queries quickly.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Built-in Metadata</h4></a>
  <p>Metadata tags are attached to your log messages at ingest, which is quite useful when you're searching log data.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/chart-search-results"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Chart Search Results</h4></a>
  <p>In the Aggregates tab, you can view search results as a chart, such as a bar or column chart.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/comments-search-queries"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Comments in Search Queries</h4></a>
  <p>Learn how to add comments to a search query and comment out lines for notes.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/export-search-results"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Export Search Results</h4></a>
  <p>Up to 100,000 rows can be exported as a CSV text file.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/pause-cancel-search"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Pause or Cancel a Search</h4></a>
  <p>When a search is in progress, the options to Cancel or Pause the search appear.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/quick-search-collectors-sources"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Quick Search for Collectors and Sources</h4></a>
  <p>Quickly start a search for a Collector, Source, or Source Category from the Manage Collection page.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-basics/reference-field-special-characters"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Reference a Field with Special Characters</h4></a>
  <p>Reference a field name that contains a special character.</p>
  </div>
</div>
    <div className="box smallbox9 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/save-search"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Save a Search</h4></a>
      <p>Save your favorite searches to run them again later.</p>
      </div>
    </div>
    <div className="box smallbox10 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/search-autocomplete"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Search Autocomplete</h4></a>
      <p>The search autocomplete dropdown dialog offers suggestions to make query writing easier.</p>
      </div>
    </div>
    <div className="box smallbox11 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/search-large-messages"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Search Large Messages</h4></a>
      <p>Learn how to search large log messages, which Sumo Logic slices into smaller message chunks.</p>
      </div>
    </div>
    <div className="box smallbox12 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/search-surrounding-messages"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Search Surrounding Messages</h4></a>
      <p>Investigate events surrounding a message in your Messages list.</p>
      </div>
    </div>
    <div className="box smallbox13 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/share-link-to-search"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Share a Link to a Search</h4></a>
      <p>Learn how to share a link to search query results via email or IM.</p>
      </div>
    </div>
    <div className="box smallbox14 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/time-range-expressions"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>Time Range Expressions</h4></a>
      <p>Learn how to add a time range expression in the time range field when building a search query.</p>
      </div>
    </div>
    <div className="box smallbox15 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/view-search-results-json-logs"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>View Search Results for JSON Logs</h4></a>
      <p>If your search results contain JSON logs, you can show or hide JSON format from the Messages tab.</p>
      </div>
    </div>
    <div className="box smallbox16 card">
      <div className="container">
      <a href="/docs/search/get-started-with-search/search-basics/view-traces-search-results"><img src={useBaseUrl('img/icons/operations/advanced-search.png')} alt="icon" width="40"/><h4>View Traces Search Results</h4></a>
      <p>Open and review traces from search log results.</p>
      </div>
    </div>
</div>

<br/>

:::tip
Use our [Root Cause Explorer](/docs/observability/root-cause-explorer) to investigate usage and issues.
