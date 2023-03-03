---
id: time-range-expressions
title: Time Range Expressions
description: When you are building a search query, you have the option to add a time range expression in the time range field.
---

When you are building a search query, you have the option to add a time range expression in the time range field.

The last millisecond of the defined time range is not searched. For example, a time range of 6:15 to 6.30 pm will run as 6:15:00:000 to 6:29:59:999.

## Preset time range expressions

Preset values are available to choose from, with **Last 15 Minutes** as the default start value and "now" being the implied end time. In cases where more control of the start and end time is required, you can type a time range expression directly into the time range field.

Search time ranges use either the default timezone set in your web browser, or the [Default Timezone](../../../get-started/account-settings-preferences.md) setting on the **Preferences** page, if you have set it.

![time-range-expressions.png](/img/search/get-started-search/search-basics/time-range-expressions.png)

## Relative time range expressions

Either a single relative expression or two relative expressions can be
specified.

* If only one expression is present, it is interpreted as the start time, and the end time is automatically set to "now". The token "now" can be entered to mean the current time.
* If two expressions are present, the first one is interpreted as the start time, and the second one is the end time.

Expressions should be prefixed with "-" to indicate that the time resolves to the past. The remainder of the expression contains a number and a time multiplier.

Valid time multipliers are:

* `s` for second 
* `m` for minute
* `h` for hour
* `d` for day

Future time expressions (for example, **now to +15m**) are supported and will return results if timestamps for any collected data are set in the future.

The table below contains examples of relative time-range expressions. 

| Relative Expression | Definition |
| :-- | :-- |
| -1d | From one day (24 hours) ago to now. |
| -1d now | From one day ago to now. |
| -1d -12h | From one day ago to 12 hours ago. |
| -12h -60m | From 12 hours ago to 60 minutes ago. |
| -60m -600s | From 60 minutes ago to 600 seconds ago. |

## Absolute time range expressions

While relative expressions are useful, sometimes it is more important to express a specific point in time. If only one time expression is present, it is interpreted as the start time. If two expressions are present, the first one is interpreted as the start time, the second is interpreted as the end time. If only a date is entered, the time value is implied to be midnight. Again, the token "now" represents the  current time. If no year is present in an absolute time expression, the current year is assumed.

To avoid indeterminate values, always enter the year in the format YYYY.

There are many different ways to combine year, month, and days in an absolute time range expression. Search time ranges use either the default **date format** set in your web browser or the [Date Format](../../../get-started/account-settings-preferences.md) setting on the **Preferences** page, if you have set it.

The table below contains examples of absolute time-range expressions. 

| Absolute Expression | Definition |
| :-- | :-- |
| 04/01 | From the most recent April 1st to now. |
| 04/01/2017 20:32:00 to 04/01/2017 20:35:00 | From April 1st, 2017 at 8:32 PM until April 1st, 2017 at 8:35 PM. |
| 04/01 04/02 | From midnight April 1st to midnight April 2nd of the current year. |
| 04/01/2017 00:00:00 to 04/02/2017 | From midnight April 1st, 2014 to midnight April 2nd, 2017. |
| 04/01/2017 | From midnight April 1st, 2017 to now. |
| 04/01/2017 04/02/2017 | From midnight April 1st, 2017 to midnight April 2nd, 2017. |
