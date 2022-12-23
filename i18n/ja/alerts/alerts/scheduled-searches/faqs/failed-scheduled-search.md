---
id: failed-scheduled-search
---

# Why Would a Scheduled Search Fail?

A Scheduled Search may fail and be suspended for several reasons falling into three general areas.

## Scheduled Search Query

Failures could be related to the Scheduled Search query. Check the following possible issues. 

* In queries that use [lookup](/docs/search/search-query-language/search-operators/lookup-classic) files, the lookup file could be empty. This would cause the Scheduled Search to fail because Sumo Logic downloads the lookup file prior to executing the query. 
* Other query-specific factors could be at play. To test if the failure can be reproduced, run the Scheduled Search query. 
* To make sure your query is written correctly, see [Write Efficient Search Queries](/docs/search/get-started-with-search/build-search). 
* You may be able to optimize your query performance using [Partitions](/docs/manage/partitions-data-tiers) or [Scheduled Views](/docs/manage/scheduled-views).  
* Taking too long to complete. See [How to Prevent Your Scheduled Search from Timing Out](prevent-scheduled-search-timing-out.md). 

## Sumo Logic Backend Issues

Failures may be seen across many Scheduled Searches due to backend infrastructure issues at Sumo Logic, and nothing specific to that particular query. In this case, just wait until Sumo Logic service is restored and be ready to test your query for normal performance.

* Check http://status.sumologic.com for outages impacting multiple customers and specific functionality such as searches, real time alerts, etc.
* Sumo Logic reports Scheduled Search failures in the [Audit Index](/docs/manage/security/audit-index.md). You can determine if many Scheduled Search failures occurred at the same time of your failure. In this case, the Sumo Logic operations team is alerted to any infrastructure issues and will take action to address them as soon as possible. 

## Other Issues

Scheduled Search failures could be the result of other factors, such as a spike in data being processed by the Scheduled Search. 

* If you have a query that normally runs, but is close to reaching the [timeout period limit](prevent-scheduled-search-timing-out.md), it could finally fail due to changes in your account, such as the content and size of log messages, or the volume or number of messages sent during a specific time range. Choosing a narrower time range can help.
* Even if the query normally runs well within the timeout period limit, there a data surge could cause the need for more processing time
* There could be normal growth factors within an account such as increased Collector deployment that would cause some Source Categories to have a data surge. You should test your Scheduled Searches for performance periodically to address this possibility.

See also, [What Happens When a Scheduled Search is Suspended?](suspended-scheduled-search.md).

## What else can I do? 

For assistance with Scheduled Search issues, contact [Sumo Logic Support](https://support.sumologic.com/hc/en-us). 
