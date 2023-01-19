---
id: filter-search
title: Filter and Search CSE List Pages
sidebar_label: Filter and Search
description: Learn how to search CSE list pages.
keywords:
    - CSE
    - search
    - filters
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can filter and search the list pages in CSE—**Insights**, **Signals**, **Entities**, **Records**, **Rules**, and **Network Blocks**—using the **Filter** bar near the top of the page.

<img src={useBaseUrl('img/cse/list-page-search.png')} alt="Sumo Logic thumbnail logo"/>

## Filter items
When you click in the **Filters** bar, a dropdown list of filters appears. After you select a filter you’ll be presented with a dialog so you can specify your filtering criteria.

<img src={useBaseUrl('img/cse/filter-options.png')} alt="Sumo Logic thumbnail logo" width="350"/>

## Search items
You also enter a search string or regex in the **Filter** bar, and press Return to run a search. Note that CSE's regular expression engine will return items that contain text matching the complete string. The engine implicitly adds anchors  (`^` and `$`) to the beginning and end of your regex.

You can use `not` to search for items that do not contain a particular keyword, for example:

`not:Initial Access`  
