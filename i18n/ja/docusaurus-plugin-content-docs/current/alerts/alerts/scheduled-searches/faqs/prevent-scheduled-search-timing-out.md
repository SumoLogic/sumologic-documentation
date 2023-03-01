---
id: prevent-scheduled-search-timing-out
---

# How to Prevent your Scheduled Search from Timing Out

Before you create a scheduled search, be aware that  Sumo Logic will not allow the scheduled search to run indefinitely. At some point, the query will be timed out to protect the reliability of the service.

## Timeout Settings

Sumo Logic's timeout setting is equivalent to 1/3rd of the scheduled search's time range, with a minimum timeout of 3 minutes and a maximum timeout of 120 minutes.

For example, if the search time range is a 2 hour period, then the timeout threshold would be:

2 (time range in hours) x 60 (minutes) / 3 = 40 minutes

If the calculated timeout threshold is less than 3 minutes, the search will time out at 3 minutes. If the calculated timeout threshold is more than 120 minutes, the search will time out at 120 minutes.

Sumo Logic will attempt to run the scheduled search three consecutive times in case the search times out. After the third failed event, an email will be sent to the author of the search, and the scheduled search will be suspended for at least a four-hour period to give the user an opportunity to modify their query.

## Preventing Search Timeout

To test the performance of a query, time how long it takes to complete before you save and schedule the search. If it completes below the expected time out thresholds mentioned previously, then it’s fine to schedule on a recurring basis.

:::tip
Reach out to the Sumo Logic Support team to get guidance on optimizing your query.
:::

Here are also a few additional things to consider when conducting your performance tests:

* Use a time range outside of the last 24-hour period. For example, if you plan on saving a search with the relative timeframe of the **Last 24 hours**, run a test using the following time range instead: **-48h -24h** (48 hours ago to 24 hours ago). Doing this will trigger the same backend nodes that would be called to run your scheduled search.
* [Optimize your searches](/docs/search/optimize-search-performance.md) as much as possible.
* If the data you are testing against is not reflective of the actual volume you’ll be scanning on a recurring basis, then the test itself should be considered invalid. Similarly, avoid scheduling searches preemptively. Wait until you get a good sample size and make sure your live streaming is completely set up.
* If there are plans to add more data to your account in the near future, please keep that in mind in your testing and include a buffer to make sure that your increased data volume won’t cause your scheduled search to time out.
