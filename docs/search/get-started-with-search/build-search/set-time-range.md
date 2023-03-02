---
id: set-time-range
title: Set the Time Range of a Search
sidebar_label: Set the Time Range
description: You can adjust the time range for searches and metrics to get the information that will be of most use.
---

To set the time range for searches or metrics visualizations, click the time area.

![time range cropped](/img/reuse/query-search/time-range-cropped.png)

The current time range is displayed, along with the following options to set the time:

* **Relative**. Select an interval relative to the current time. The display is updated as soon as you make a selection. You can enter absolute time and dates.  

    ![absolute timerange.png](/img/search/get-started-search/build-search/absolutetimerange.png)

* **Custom**. Click a date to select it as the start date, then move your cursor to the desired end date and click to select it. The date settings shown below the calendar are updated. You can scroll to navigate between months or click to go to a specific month. To specify the time, highlight the portion of the time value you want to change, and modify the entry.  

    ![time range custom.png](/img/reuse/query-search/time-range-custom.png)

* **Recent**. If you have specified any relative or custom time ranges during your current login session, they are available for selection under **Recent**.

#### Rules

The following general rules apply to time ranges:

* For all time expressions with only one start time entered, the default assumed end-time is "now".
* If you enter two times, the first is assumed to be the start time, and the second is assumed to be the end time for the time range.
* When entering hours, you can use a 24-hour format, such as 17:32:00, or a 12-hour format, such as 5:32pm.
* To enter dates, always use a slash ("/") between month, day, and year in this format: mm/dd/yyyy. Sumo Logic does not support dates entered in yyyy/mm/dd notation or yy/mm/dd notation.
* Abbreviations for custom time are h=hours, d=days, w=weeks, m=months.
* If you enter a date, the assumed time for the date is midnight of that day. (00:00:00).
* For relative time, use these shorthand entries: d=day, h=hour, m=minute, and s=second.
* You can enter relative time ranges like this: "-1d -12h" for the range between one day ago and 12 hours ago.
* Time ranges use either the default timezone set in your web browser, or the [Default Timezone](../../../get-started/account-settings-preferences.md) setting on the **Preferences** page, if you have set it.
* The timezone offset is displayed in the time range selector pop-up dialog. For example, in the previous screenshot, +1100 is added to display the offset for Australia, including DST.
* The timezone offset is also displayed in the **Time** column of the **Messages** tab in search results.
* The last millisecond of the defined time range is not searched. For example, a time range of 6:15 to 6.30 pm will run as 6:15:00:000 to 6:29:59:999.

For more information about entering time ranges, see [Time Range Expressions](../search-basics/time-range-expressions.md).

Time range options can vary depending on the type of account your organization has. Sumo Logic Free accounts allow time ranges up to seven days.
