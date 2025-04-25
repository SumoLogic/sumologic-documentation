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

## Search in Cloud SIEM

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Cloud SIEM**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Search Cloud SIEM**. You can also click the **Go To...** menu at the top of the screen and select **Search Cloud SIEM**. 
1. Click in the **Find Insights, Signals, Entities and more...** search bar at the top of the page.<br/><img src={useBaseUrl('img/cse/list-page-search.png')} alt="Search box at the top of the page" width="400" />
1. Enter text to search.
1. To filter, click the filter icon <img src={useBaseUrl('img/cse/filter-icon.png')} alt="Filter icon" width="20" /> on the right side of the search box.
1. Select a source to filter on. <br/><img src={useBaseUrl('img/cse/search-sources.png')} alt="Search sources" width="250" />
1. A dropdown list of filters appears for that source. Select a field to filter on, or pick a suggestion.<br/><img src={useBaseUrl('img/cse/filter-options.png')} alt="List of fields to filter on" width="400"/>
1. Continue to select options to filter on from the options presented.

## Search using regular expressions

You also enter a search string or regex in the search bar, and press Return to run a search. Note that Cloud SIEM's regular expression engine will return items that contain text matching the complete string. The engine implicitly adds anchors  (`^` and `$`) to the beginning and end of your regex.

Cloud SIEM search uses Elasticsearch. For regular expressions allowed for use in Cloud SIEM search, see [Regular expression syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/regexp-syntax.html) in the Elastic documentation.

You can use `not` to search for items that do not contain a particular keyword, for example: `not:Initial Access`  