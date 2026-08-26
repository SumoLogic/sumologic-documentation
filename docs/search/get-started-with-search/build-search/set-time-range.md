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

## Relative

Select an interval relative to the current time. The display is updated as soon as you make a selection. You can enter absolute time and dates.

<img src={useBaseUrl('img/search/get-started-search/build-search/absolutetimerange.png')} alt="Absolute timerange" style={{border: '1px solid gray'}} width="400" />

## Custom

Click a date to select it as the start date, then move your cursor to the desired end date and click to select it. The date settings shown below the calendar are updated. You can scroll to navigate between months or click to go to a specific month. To specify the time, highlight the portion of the time value you want to change, and modify the entry.

<img src={useBaseUrl('img/reuse/query-search/time-range-custom.png')} alt="Time range custom" style={{border: '1px solid gray'}} width="200" />

## Recent

If you have specified any relative or custom time ranges during your current login session, they are available for selection under **Recent**.

## Rules

The following general rules apply to the time range picker:

* When entering hours, you can use a 24-hour format, such as 17:32:00, or a 12-hour format, such as 5:32pm.
* To enter dates, always use a slash (`/`) between month, day, and year in this format: mm/dd/yyyy. Sumo Logic does not support dates entered in yyyy/mm/dd notation or yy/mm/dd notation.
* Abbreviations for custom time are h=hours, d=days, w=weeks, m=months.
* Time ranges use either the default timezone set in your web browser, or the [Default Timezone](../../../get-started/account-settings-preferences.md) setting on the **Preferences** page, if you have set it. For more on how this setting affects what you see in the UI, see [Default time zone](/docs/send-data/reference-information/time-reference#default-time-zone).
* The timezone offset is displayed in the time range selector pop-up dialog. For example, in the previous screenshot, +1100 is added to display the offset for Australia, including DST.
* The timezone offset is also displayed in the **Time** column of the **Messages** tab in search results.

For the rules and syntax for typing a relative or absolute time range expression directly into the time range field (including shorthand like `-1d -12h`), see [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions).

Time range options can vary depending on the type of account your organization has. Sumo Logic Free accounts allow time ranges up to seven days.
