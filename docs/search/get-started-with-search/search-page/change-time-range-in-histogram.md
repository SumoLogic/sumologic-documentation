---
id: change-time-range-in-histogram
title: Change the Time Range in the Histogram
description: You can highlight a time range in the histogram for your search results to filter the search results based on that time range.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can highlight a time range in the search results histogram to filter your search results in the **Messages** tab based on that time range.  

* Your search results must be complete or paused for this feature to work.
* Only the **Messages** tab is filtered. The **Aggregates** tab doesn't change.

Click a bar in the histogram and use your cursor to select a contiguous set of bars. The search results update automatically to show only the results for the selected time range. The overall settings on the page don't change, but the message list is filtered to show only the messages for the selected period.

![histogram drilldown](/img/search/get-started-search/search-page/histogram-drilldown.png)

* Press the **X** in the selection area to clear a selection.
* Click elsewhere in the histogram to make another selection.
* Press **Shift Click** in the selected area (pink highlighted area) to open a new search tab for the selected time range.
* Your selection is maintained if you go to another tab, but not if you close or save the search.

If you'd prefer not to display the Log Search histogram, click **Hide Histogram**.

<img src={useBaseUrl('img/search/get-started-search/search-page/hide-histogram.png')} alt="Hide Histogram" width="300"/>
