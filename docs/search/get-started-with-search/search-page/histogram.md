---
id: histogram
title: Using the Log Search Histogram
sidebar_label: Histogram
description: You can highlight a time range in the histogram for your search results to filter the search results based on that time range.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Change the Time Range in the Histogram

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

## Filter by Log Level

When performing ad-hoc **Log Search** queries, you can visualize and filter log-level distribution in both your Histogram results and Messages table view, helping you to:

* Quickly identify anomalies
* Drill down in the high severity logs quickly
* Navigate through a large volume of logs
* Filter the relevant logs in their troubleshooting workflows

<!--
<details><summary>What are log levels?</summary>

define warn, critical, etc.

</details>
-->

Log-Level pattern detection is automatic, meaning you do not need to parse log levels manually or write specific queries to see your distribution of error logs. Just execute a log search, and you'll see:

<img src={useBaseUrl('img/search/get-started-search/search-page/log-level-legend.png')} alt="log-level-legend" />

| Element | Description
| :-- | :--
| A | Histogram with stacked bars representing log level distribution over your search timeframe.
| B | Interactive Histogram legend showing the log level that each color represents. Click on any label to isolate it in the Histogram and corresponding messages beneath that. In this example, the **ERROR** label has been clicked, so you'll see only error logs reflected.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/log-level-error-filter.png')} alt="log-level-error-filter.png" /><br/>To select multiple log levels, use **shift + click**.
| C | Log messages corresponding to Histogram panels indicating log level severity. Log level message severity Quickly identify the log level of each log message using the color-coded legend for each message.
| D | **Hide Log Levels**. Click this to hide log levels from the Histogram chart, however, the **log_level** column will still show in the Messages table, but log level color coding corresponding will be removed. To enable it again, just click **Show Log Levels**.
| E | [Field Browser](/docs/search/get-started-with-search/search-page/field-browser) **log_level** filter. You can use this reserved field in your queries to perform advanced operations.
