---
id: about-search-page
title: Log Search Page Layout and Controls
sidebar_label: Page Layout
description: A labeled reference of every element on the Sumo Logic Log Search page, from the query editor and time range to the histogram, results tabs, and query color coding.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic breaks down every element of the Log Search page: the query editor and its controls, the results panel, and how query terms are color-coded, so you know what each icon and button does.

## Page layout

On the **Log Search** page, you can enter [simple or complex queries](../search-basics/about-search-basics.md) to search your entire Sumo Logic data repository. You can adjust the size of the search query editor for better visibility into long queries and reduce the size of the editor while examining larger results, making it easier to navigate through your data.

You can also save and select searches from your [Library](/docs/get-started/library). After running a search, your search results for raw message data are displayed in the **Messages** tab, while grouped results are displayed in the **Aggregates** tab. See [how to navigate through search results](navigate-through-search-results.md).

You can [run a saved search](../search-basics/save-search.md), [pause, or stop searches](../search-basics/pause-cancel-search.md), or [schedule a search to run periodically](../../../alerts/scheduled-searches/schedule-search.md) and notify you of the results.

<img src={useBaseUrl('img/search/get-started-search/search-page/search-page.png')} alt="Search page" style={{border: '1px solid gray'}} width="800" />

| Letter | Purpose |
|:--|:--|
| A | [Basic or Advanced mode](search-modes.md) search text box. Advanced mode searches are limited to a maximum of 15,000 characters in length.<br/><br/>Click the clock icon to see recent searches. Previously run searches are saved automatically for your reference. Instead of recreating your search, you can select it from the dropdown.<br/><br/>As you make changes, a message displays if you have not pressed enter to execute the query:<br/><img src={useBaseUrl('img/search/get-started-search/search-page/query-changes-detected.png')} alt="Query detected" style={{border: '1px solid gray'}} width="400" /> |
| B | [Time range](../build-search/set-time-range.md) of the search.<br/><br/>Next to the time range, click the meter icon <img src={useBaseUrl('img/manage/partitions-data-tiers/flex-pricing/meter-icon.png')} alt="Meter icon" width="20"/> to preview the [estimated data scan](/docs/manage/partitions/estimate-scan-data) for your query before running it, broken down by data tier or index. |
| C | Start the search. |
| D | Click the gear icon to open the Search Config menu that has the options to use the [receipt time](../build-search/use-receipt-time.md) or [searchable time](../build-search/use-searchable-time.md) timestamps and [Auto Parse Mode](../build-search/dynamic-parsing.md). |
| E | [Share a link](../search-basics/share-link-to-search.md) for the currently running search. |
| F | [Save or schedule](../search-basics/save-search.md) a search. |
| G | Click the three-dot kebab icon to open a menu with the following options:<ul><li>Select between Basic or Advanced search mode.</li><li>Link to [search cheat sheets](/docs/search/search-cheat-sheets).</li><li>Edit the search, if it has already been saved.</li><li>[Save or schedule](../search-basics/save-search.md) a search.</li><li>[Share a link](../search-basics/share-link-to-search.md) for the currently running search.</li><li>Info provides detailed information about the search.</li><li>[Pin](/docs/search/get-started-with-search/search-page/pin-a-search) the search to run in the background independent of the browser session.</li><li>[Favorite](../search-basics/save-search.md#add-a-saved-search-to-favorites) a saved search.</li><li>[Add a new monitor](/docs/alerts/monitors) based on the existing query in the search text box.</li><li>Use [Live Tail](/docs/search/live-tail) to see a real-time live feed of log events.</li></ul>The menu options are dynamically provided so depending on if you have run or saved the search or conducted aggregation some options will be grayed out and unclickable. |
| H | [Histogram](navigate-through-search-results.md) of the messages. |
| I | Search Details such as session, status, elapsed time, results, raw count, search expression, and [load](search-load-indicator.md). When searching an [Infrequent Partition](/docs/manage/partitions/data-tiers) the estimated and actual amount of data scanned is displayed. |
| J | Search results as messages. |
| K | [Aggregate](/docs/search/search-query-language/group-aggregate-operators) search results. |
| L | Download and export search results (up to 100,000 records) as a CSV file. |
| M | [Chart](/docs/dashboards/panels) options for search results. |
| N | Click the display button to open a menu with the options to edit Display Message Preferences, Save as Default View, and Edit Settings JSON. |
| O | Add to Dashboard allows you to create a panel on a Dashboard from your search. If a Dashboard exists for the Search, you will have another option to Update Dashboard to update it based on changes made here. |
| P | Expands the results table and hides the histogram and search text area. |
| Q | Hides the histogram. |
| R | In-app search tabs. Refer to [Account preferences](/docs/get-started/account-settings-preferences/#log-search) to enable or disable this feature. |

## Query colors explained

In your search query, you'll see that we have separated out important terms in a search for you by color to help you identify them quickly.  

<img src={useBaseUrl('img/search/get-started-search/search-page/query-with-colors.png')} alt="Query Sample Colors" style={{border: '1px solid gray'}} width="800" />

| Color | Purpose |
|:--|:--|
| Blue | Boolean operators (and, or, not) |
| Red | Quoted string |
| Purple | Sumo first operators (parse, nodrop, etc.) and secondary operators (row, column) |
| Green | Specific numeric values |
