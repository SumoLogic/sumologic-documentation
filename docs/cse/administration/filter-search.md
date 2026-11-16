---
id: filter-search
title: Filter and Search Cloud SIEM List Pages
sidebar_label: Filter and Search
description: Learn how to search Cloud SIEM list pages.
keywords:
    - Cloud SIEM
    - search
    - filters
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use the Cloud SIEM search bar to find insights, signals, and entities from one place. You can search by keyword or regular expression, narrow results with filters, and sort results by relevance or by time.

## Search in Cloud SIEM

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Cloud SIEM > Search Cloud SIEM**. You can also click the **Go To...** menu at the top of the screen and select **Search Cloud SIEM**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Cloud SIEM**.
1. Click in the **Find Insights, Signals, Entities and more...** search bar at the top of the page.<br/><img src={useBaseUrl('img/cse/list-page-search.png')} alt="Search box at the top of the page" style={{border: '1px solid gray'}} width="600" />
1. Enter a keyword, such as an IP address, hostname, username, or rule name, and press Enter. To clear the search, click the **X** at the right side of the search bar.<br/><img src={useBaseUrl('img/cse/keyword-search.png')} alt="search for a keyword" style={{border: '1px solid gray'}} width="600" />

### Keyword search results

Cloud SIEM searches across insights, signals, and entities and displays the matching items in one list. Matching text is highlighted in each result, so you can see why an item was returned. For example, a search for `1.1.1` highlights `1.1.1` in the **value** of each matching entity.

<img src={useBaseUrl('img/cse/keyword-search-results.png')} alt="Keyword search results for 1.1.1 showing total results, counts by type, the sort dropdown, and matching entities" style={{border: '1px solid gray'}} width="800" />

The results header shows:

* **Total Results**. The total number of items that match your search.
* **Counts by type**. The number of matching **Insights**, **Signals**, and **Entities**. Select a type to view only those results.
* **Sort**. The menu at the right side of the header, which sets the order of the results. See [Sort search results](#sort-search-results).

Each result shows a summary of the item. For example, an entity result shows its name, **Activity Score**, **Type**, and whether it is **Suppressed**. Click a result to open its details page.

:::note
Keyword search matches the text you enter. To match a pattern instead, use a [regular expression](#search-using-regular-expressions).
:::

## Sort search results

Use the sort menu in the results header to change the order of your search results. By default, results are sorted by **Relevance (desc.)**, which lists the best text matches first. Relevance sorting can list older items before newer ones, so switch to a time-based sort by clicking the **Event Time** option in the menu when you want to see the most recent activity first.

The sort options depend on the type of result:

| Tab | Sort options | Default |
|:--|:--|:--|
| All | Relevance, Event Time | Relevance |
| Insights | Relevance, Event Time | Relevance |
| Signals | Relevance, Event Time | Relevance |
| Entities | Relevance, Last Seen | Relevance |

* **Relevance**. Lists the closest matches to your search first.
* **Event Time**. Sorts insights and signals by the time of the event.
* **Last Seen**. Sorts entities by the time of the entity's last signal. Entities do not have an event time, so they use **Last Seen** instead.

To sort results:

1. Run a search.
1. Click the sort dropdown at the right side of the results header, for example **Relevance (desc.)**.
1. Select a sort option.
1. To reverse the order, change the sort direction in the dropdown. Time-based sorts list the newest results first (descending) by default.<br/><img src={useBaseUrl('img/cse/keyword-search-sort.png')} alt="Search sources" style={{border: '1px solid gray'}} width="200" />

How sorting behaves:

* **Pagination resets**. Changing the sort returns you to the first page of results. Moving between pages keeps your selected sort.
* **Tabs reset the sort**. Switching to another tab resets the sort to **Relevance**, because the available options differ by tab.
* **The sort is saved in the URL**. Your selection is stored in the `sort` parameter of the page URL, so it is preserved when you reload the page or share the link. **Relevance (desc.)** is the default and is not included in the URL.

:::note 
When you sort the **All** tab by **Event Time**, all insights and signals are listed before any entities, in either direction. Entities have no event time. To sort entities by time, open the **Entities** tab and sort by **Last Seen**.
:::

## Filter search results

You can narrow your results with filters, alone or together with a keyword search.

1. Click the filter icon <img src={useBaseUrl('img/cse/filter-icon.png')} alt="Filter icon" width="20" /> at the right side of the search bar.
1. Select a source to filter on.<br/><img src={useBaseUrl('img/cse/search-sources.png')} alt="Search sources" style={{border: '1px solid gray'}} width="300" />
1. A dropdown list of filters appears for that source. Select a field to filter on, or pick a suggestion.<br/><img src={useBaseUrl('img/cse/filter-options.png')} alt="List of fields to filter on" style={{border: '1px solid gray'}} width="300" />
1. Continue to select options to filter on from the options presented.

Filters and sort work together. Changing a filter or search term updates the results, and the current sort stays applied unless you switch tabs.

## Search using regular expressions

You can also enter a regular expression (regex) in the search bar and hit enter to run the search. Cloud SIEM's regular expression engine returns items that contain text matching the complete string. The engine implicitly adds anchors (`^` and `$`) to the beginning and end of your regex.

Cloud SIEM search uses Elasticsearch. For the regular expressions allowed in Cloud SIEM search, see [Regular expression syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/regexp-syntax.html) in the Elastic documentation.

To search for items that do not contain a particular keyword, use `not`. For example:

```
not:Initial Access
```
