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

* Press the **X** in the selection area to clear a selection.
* Click elsewhere in the histogram to make another selection.
* Press **Shift Click** in the selected area (pink highlighted area) to open a new search tab for the selected time range.
* Your selection is maintained if you go to another tab, but not if you close or save the search.<br/>  ![histogram drilldown](/img/search/get-started-search/search-page/histogram-drilldown.png)

If you prefer not to display the histogram, click **Hide Histogram**.

## Filter by Log Level

Sumo would provide out of the box log level distribution in ad-hoc queries. Helping users to quickly identify anomalies and drill down in the high severity logs quickly. This would help users to navigate through a large volume of logs and filter the relevant logs in their troubleshooting workflows.

Ability to visualize the log level distribution in the histogram results. And also they should be able to filter messages of specific log level(s) in the same view.  

<details><summary>What are log levels?</summary>

define warn, critical, etc.

</details>

Introducing Log Levels
We are pleased to announce Log Level detection - helps you to identify log level for each log and shows the distribution of log levels over the search timeframe.

See log-level patterns at a glance
No more parsing log levels, writing queries to see your distribution of error logs.

Click to filter log level
Want to see just the error logs? Just click on the error label and we'll show just them.
Select multiple log-levels using shift + click.

Know the severity/log-level of each log message
Quickly identify the log-level of each log message using the color coded ribbon for each message.

Log levels in the field browser
The log_level field is available in the field browser as well, just use this reserved field in your queries to perform advanced operations.

Don't like the distribution? Just hide them
We'll save your preferences, so that we don't show you the log levels, if you ever feel like seeing them again, just toggle this button.

only available for UI queries. This requires the system to heuristically determine the log level of a log message and use that information to generate the histogram buckets by log level. Additionally raw log messages should have this metadata present so that those could be filtered if requested from the UI.
