---
id: querystarttime
---

# queryStartTime()

The queryStartTime() operator returns the start time of the search [time
range](../../Get-Started-with-Search/How-to-Build-a-Search/Set-the-Time-Range.md "Set the Time Range")
in milliseconds. You can use it in combination with queryEndTime() to
establish times and ranges for your non-continuous queries.

For dashboards in live mode or real time scheduled searches,
queryTimeRange() is a more suitable option. In most cases the results
would still be the same as using queryStartTime() and queryEndTime(),
but the latter can be off from the real range by a few milliseconds.

### Syntax

-   `queryStartTime() as\<fiel\>`

### Rules

-   An alias is required.

### Examples

To get a duration of your query:

`error | (queryEndTime() - queryStartTime()) as duration`

To list start time, end time, and duration:

`error  | queryStartTime() as starttime | queryEndTime() as endtime | (endtime - starttime) as duration`
