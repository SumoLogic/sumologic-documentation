---
slug: /search/get-started-with-search/search-page
title: Navigate and Interact with Sumo Logic Search Results
sidebar_label: Search Results
description: Navigate, chart, and export your Sumo Logic search results, and interact with them to investigate issues faster.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

After you run a search, what do you do with the results? This section covers everything from navigating and charting results to exporting, viewing JSON and traces, and customizing how messages display.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/about-search-page')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Log Search Page Layout and Controls</h4></a>
  <p>A labeled reference of every element on the Log Search page, from the query editor to the histogram and results tabs.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/export-search-results')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Export Search Results as a CSV File</h4></a>
  <p>Up to 100,000 rows can be exported as a CSV text file.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/view-search-results-json-logs')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>View Search Results for JSON Logs</h4></a>
  <p>If your search results contain JSON logs, you can show or hide JSON format from the Messages tab.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/search-large-messages')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Find Truncated Large Log Messages</h4></a>
  <p>Learn how to search large log messages, which Sumo Logic slices into smaller message chunks.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/chart-search-results')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Chart Search Results</h4></a>
  <p>In the Aggregates tab, you can view search results as a chart, such as a bar or column chart.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/log-level')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>View log-level distribution</h4></a>
  <p>View the filter log-level distribution in your Histogram results.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/view-traces-search-results')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Open Trace Data from Search Results</h4></a>
  <p>Open and review traces from search log results.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-basics/search-surrounding-messages')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>View Messages Surrounding a Specific Log Entry</h4></a>
  <p>Investigate events surrounding a message in your Messages list.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/field-browser/show-hide-fields-in-field-browser')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Field Browser</h4></a>
  <p>Explore specific fields of interest in a search by displaying or hiding selected fields without having to parse them.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/log-message-inspector')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>View Log Message Inspector</h4></a>
  <p>Know about Log Message Inspector to view information for all the parameter values associated with the query.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/set-messages-tab-preferences')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Set Messages Tab Preferences</h4></a>
  <p>The Preferences menu allows you to customize how messages are displayed.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/modify-search-from-messages-tab')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Modify a Search from the Results Table</h4></a>
  <p>Modify past searches by selecting text displayed in the Messages tab.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/change-time-range-in-histogram')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Change the Time Range in the Histogram</h4></a>
  <p>Learn how to filter results based on a histogram time range.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/navigate-through-search-results')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Navigate Messages in Search Results</h4></a>
  <p>When you run a search query, messages display in the Message, Aggregates, and Summarize tabs.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/search-highlighting')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Search Highlighting</h4></a>
  <p>When your search results are returned, your search terms are highlighted in the Messages tab.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/get-started-with-search/search-page/search-load-indicator')}><img src={useBaseUrl('img/icons/search.png')} alt="Search icon" width="40"/><h4>Search Load Indicator</h4></a>
  <p>Learn how to reduce system load by making your queries more specific.</p>
  </div>
</div>
</div>

<br/>
