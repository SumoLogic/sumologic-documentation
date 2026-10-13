---
id: set-time-range
title: Set the Time Range of a Search
sidebar_label: Set the Time Range
description: You can adjust the time range for searches and metrics to get the information that will be of most use.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To set the time range for searches or metrics visualizations, click the time area.

<img src={useBaseUrl('img/reuse/query-search/time-range-cropped.png')} alt="Time range cropped" style={{border: '1px solid gray'}} width="300" />

The current time range is displayed, along with the following options to set the time:

* **Relative**. Select an interval relative to the current time. The display is updated as soon as you make a selection. You can enter absolute time and dates.<br/><img src={useBaseUrl('img/search/get-started-search/build-search/absolutetimerange.png')} alt="Absolute timerange" style={{border: '1px solid gray'}} width="400" />
* **Custom**. Click a date to select it as the start date, then move your cursor to the desired end date and click to select it. The date settings shown below the calendar are updated. You can scroll to navigate between months or click to go to a specific month. To specify the time, highlight the portion of the time value you want to change, and modify the entry.<br/><img src={useBaseUrl('img/reuse/query-search/time-range-custom.png')} alt="Time range custom" style={{border: '1px solid gray'}} width="200" />
* **Recent**. If you have specified any relative or custom time ranges during your current login session, they are available for selection under **Recent**.

#### Display details

* The timezone offset is displayed in the time range selector pop-up dialog. For example, in the previous screenshot, +1100 is added to display the offset for Australia, including DST.
* The timezone offset is also displayed in the **Time** column of the **Messages** tab in search results.

For the syntax rules for typing relative and absolute time range expressions directly into the time range field, see [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions).

:::note
This page covers how to set the time period a search looks at. By default, that period is measured against message time. To measure it against a different timestamp field instead, see [Use Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time) or [Use Searchable Time](/docs/search/get-started-with-search/build-search/use-searchable-time).
:::
