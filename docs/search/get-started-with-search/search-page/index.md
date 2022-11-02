---
slug: /search/get-started-with-search/search-page
title: How to Use the Search Page
description: Understand the basic components of the Search window and how they can help you investigate your issues.
---


On the Search page you can enter [simple or complex queries] FIX (../search-basics/about-search-basics.md)to search your entire Sumo Logic data repository. You can save and select searches from your [Library](/docs/get-started/library). After running a search your results are displayed in either the **Messages** tab (for raw message data) or the **Aggregates** tab (for grouped results). See [how to navigate through search results](navigate-messages-in-search-results.md).

You can [run a saved search](../search-basics/save-search.md), [pause, or stop searches](../search-basics/pause-cancel-search.md), or [schedule a search to run periodically](../../../alerts/scheduled-searches/schedule-search.md) and notify you of the results.

![search page feb 2022.png](/img/search/get-started-search/search-page/search-page.png)

| Letter | Purpose |
|--|--|
| A | [Basic or Advanced mode](search-modes.md) search text box. Advanced mode searches are limited to a maximum of 15,000 characters in length.<br/><br/>Click the clock icon to see recent searches. Previously run searches are saved automatically for your reference. Instead of recreating your search, you can select it from the drop down.<br/><br/>As you make changes, a message displays if you have not pressed enter to execute the query: ![query detected](/img/search/get-started-search/search-page/query-changes-detected.png) |
| B | [Time range](../build-search/set-time-range.md) of the search. |
| C | Start the search. |
| D | Click the gear icon to open the Search Config menu that has the options to use the [receipt time](../build-search/use-receipt-time.md) and [Auto Parse Mode](../build-search/dynamic-parsing.md). |
| E | [Share a link](../search-basics/share-link-to-search.md) for the currently running search. |
| F | [Save or schedule](../search-basics/save-search.md) a search. |
| G | Click the three-dot icon to open a menu with the following options:<ul><li>Select between Basic or Advanced search mode.</li><li>Link to [search cheat sheets](/docs/search/search-cheat-sheets).</li><li>Edit the search, if it has already been saved.</li><li>[Save or schedule](../search-basics/save-search.md) a search.</li><li>[Share a link](../search-basics/share-link-to-search.md) for the currently running search.</li><li>Info provides detailed information about the search.</li><li>[Pin](/docs/get-started/library#search-the-library) the search to run in the background independent of the browser session.</li><li>[Favorite](add-saved-search-to-favorites.md) a saved search.</li><li>[Add a new monitor](/docs/alerts/monitors) based on the existing query in the search text box.</li><li>Use [Live Tail](/docs/search/live-tail) to see a real-time live feed of log events.</li></ul>The menu options are dynamically provided so depending on if you have run or saved the search or conducted aggregation some options will be grayed out and unclickable. |
| H | [Histogram](navigate-messages-in-search-results.md) of the messages. |
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
|--|--|
| Blue | Boolean operators (and, or, not) |
| Red | Quoted string |
| Purple | Sumo first operators (parse, nodrop, etc.) and secondary operators (row, column) |
| Green | Specific numeric values |

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
