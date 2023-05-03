---
slug: /search/get-started-with-search/search-page
title: How to Use the Search Page
description: Understand the basic components of the Search window and how they can help you investigate your issues.
---


On the Search page, you can enter [simple or complex queries](../search-basics/about-search-basics.md) to search your entire Sumo Logic data repository. You can save and select searches from your [Library](/docs/get-started/library). After running a search, your results are displayed in either the **Messages** tab (for raw message data) or the **Aggregates** tab (for grouped results). See [how to navigate through search results](navigate-through-search-results.md).

You can [run a saved search](../search-basics/save-search.md), [pause, or stop searches](../search-basics/pause-cancel-search.md), or [schedule a search to run periodically](../../../alerts/scheduled-searches/schedule-search.md) and notify you of the results.

![search page feb 2022.png](/img/search/get-started-search/search-page/search-page.png)

| Letter | Purpose |
|:--|:--|
| A | [Basic or Advanced mode](search-modes.md) search text box. Advanced mode searches are limited to a maximum of 15,000 characters in length.<br/><br/>Click the clock icon to see recent searches. Previously run searches are saved automatically for your reference. Instead of recreating your search, you can select it from the dropdown.<br/><br/>As you make changes, a message displays if you have not pressed enter to execute the query: ![query detected](/img/search/get-started-search/search-page/query-changes-detected.png) |
| B | [Time range](../build-search/set-time-range.md) of the search. |
| C | Start the search. |
| D | Click the gear icon to open the Search Config menu that has the options to use the [receipt time](../build-search/use-receipt-time.md) and [Auto Parse Mode](../build-search/dynamic-parsing.md). |
| E | [Share a link](../search-basics/share-link-to-search.md) for the currently running search. |
| F | [Save or schedule](../search-basics/save-search.md) a search. |
| G | Click the three-dot icon to open a menu with the following options:<ul><li>Select between Basic or Advanced search mode.</li><li>Link to [search cheat sheets](/docs/search/search-cheat-sheets).</li><li>Edit the search, if it has already been saved.</li><li>[Save or schedule](../search-basics/save-search.md) a search.</li><li>[Share a link](../search-basics/share-link-to-search.md) for the currently running search.</li><li>Info provides detailed information about the search.</li><li>[Pin](/docs/get-started/library#search-the-library) the search to run in the background independent of the browser session.</li><li>[Favorite](add-saved-search-to-favorites.md) a saved search.</li><li>[Add a new monitor](/docs/alerts/monitors) based on the existing query in the search text box.</li><li>Use [Live Tail](/docs/search/live-tail) to see a real-time live feed of log events.</li></ul>The menu options are dynamically provided so depending on if you have run or saved the search or conducted aggregation some options will be grayed out and unclickable. |
| H | [Histogram](navigate-through-search-results.md) of the messages. |
| I | Search Details such as session, status, elapsed time, results, raw count, search expression, and [load](search-load-indicator.md). When searching an [Infrequent Partition](/docs/manage/partitions-data-tiers) the estimated and actual amount of data scanned is displayed. |
| J | Search results as messages. |
| K | [Aggregate](/docs/search/search-query-language/group-aggregate-operators) search results. |
| L | Download and export search results (up to 100,000 records) as a CSV file. |
| M | [Chart](/docs/dashboards-new/panels)) options for search results. |
| N | Click the gear icon to open a menu with the options to edit Display Message Preferences, Save as Default View, and Edit Settings JSON. |
| O | Add to Dashboard allows you to create a panel on a Dashboard from your search. If a Dashboard exists for the Search, you will have another option to Update Dashboard to update it based on changes made here. |
| P | Expands the results table and hides the histogram and search text area. |
| Q | Hides the histogram. |

## Query colors explained

In your search query, you'll see that we have separated out important terms in a search for you by color to help you identify them quickly.  

![Query Sample Colors](/img/search/get-started-search/search-page/query-with-colors.png)
| Color | Purpose |
|:--|:--|
| Blue | Boolean operators (and, or, not) |
| Red | Quoted string |
| Purple | Sumo first operators (parse, nodrop, etc.) and secondary operators (row, column) |
| Green | Specific numeric values |

## Guide contents

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/add-saved-search-to-favorites"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Add a Saved Search to Favorites</h4></a>
  <p>You can mark a saved search as a favorite so it appears in your Library.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/change-time-range-in-histogram"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Change the Time Range in the Histogram</h4></a>
  <p>Learn how to filter results based on a histogram time range.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="docs/search/get-started-with-search/search-page/field-browser/show-hide-fields-in-field-browser"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Field Browser</h4></a>
  <p>Explore specific fields of interest in a search by displaying or hiding selected fields without having to parse them.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/modify-search-from-messages-tab"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Modify a Search from the results table</h4></a>
  <p>Modify past searches by selecting text displayed in the Messages tab.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/navigate-through-search-results"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Navigate Messages in Search Results</h4></a>
  <p>When you run a search query, messages display in the Message, Aggregates, and Summarize tabs.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/search-highlighting"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Search Highlighting</h4></a>
  <p>When your search results are returned, your search terms are highlighted in the Messages tab.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/search-load-indicator"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Search Load Indicator</h4></a>
  <p>Learn how to reduce system load by making your queries more specific.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/search-modes"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Search Modes</h4></a>
  <p>Learn about the new search modes of our Log Search page.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/set-messages-tab-preferences"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Set Messages Tab Preferences</h4></a>
  <p>The Preferences menu allows you to customize how messages are displayed.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search/search-page/wildcards-in-full-text-searches"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Wildcards in Full Text Searches</h4></a>
  <p>You can use wildcards in full text searches.</p>
  </div>
</div>
</div>

<br/>

:::tip
Use our [Root Cause Explorer](/docs/observability/root-cause-explorer) to investigate usage and issues.
:::
