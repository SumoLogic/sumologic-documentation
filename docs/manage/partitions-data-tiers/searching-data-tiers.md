---
id: searching-data-tiers
title: Searching Data Tiers
description: Learn how to search specific Data Tiers.
---

This page has information about how to search different Data Tiers, and when you should use `_dataTier`, a *search modifier* that restricts your search to a single tier. 

import Iframe from 'react-iframe';

:::sumo Micro Lesson
Searching Data Tiers.

<Iframe url="https://www.youtube.com/embed/w0H8upLpCwU?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::

## About the _dataTier search modifier

In Sumo Logic, a search modifier is a tag that gives the Sumo Logic backend information about how to process a query. The `_dataTier` modifier tells Sumo Logic which Data Tier a query should run against: Continuous, Frequent, or Infrequent.

:::note
Search modifiers are different from Sumo Logic’s [built-in metadata fields](/docs/search/get-started-with-search/search-basics/built-in-metadata), which are key-value pairs that are tagged to incoming log data, and then can be used to find that data easily, later. 
:::

When you include the `_dataTier` modifier in a query, the query will run against only the tier or tiers you specify. If you do not specify one or more partitions in the query, using `_index`, the query will run against all partitions in the tier you specified with `_dataTier`. The `_dataTier` modifier acts as an alias for all the indexes part of the tier or tiers selected. 

If you don’t include `_dataTier`, and do not specify any partitions in the query, your search will run against the Continuous tier. If you do specify one or more partitions, Sumo Logic will infer what tier or tiers contain those partitions, and query only those partitions.

Even though you don't have to use `_dataTier` when you are querying selected partitions, it is a good practice, as it makes it clear from looking at the query what tier it runs against.

## Examples

| Example query	| Description |
| :-- | :-- |
| `error` | Searches all partitions in the Continuous tier  for messages that contain the string “error”. |
| `_dataTier=Frequent error` | Searches all partitions in the Frequent tier  for messages that contain the string “error”. |
| `_dataTier=All error` | Searches all partitions in all tiers for messages that contain the string “error”. |
| `(_dataTier=Continuous OR _dataTier=Infrequent) error` | Searches all partitions in the Continuous and Infrequent tier for messages that contain the string “error”. |
| `_dataTier=Infrequent error` | Searches all the partitions in the Infrequent tier for messages that contain the string “error”. |
| `_dataTier=Infrequent _index=payments error` | Searches the “payments” partition in the Infrequent tier for messages that contain the string “error”. |
| `_index=InfreqPart error`<br/>(Where `InfreqPart` is a partition in the Infrequent tier.) | Searches the partition named “InfreqPart” in the Infrequent tier for messages that contain the string “error”. |
| `_index=ContPart1 OR _index=FreqPart2 OR _index=InfreqPart3 error`<br/>(Where `ContPart1`, `FreqPart2`, and `InfreqPart3` are partitions in the Continuous, Frequent, and Infrequent tier respectively.) | Sumo Logic infers the tier that contains each of the specified partitions and searches them for messages that contain the string “error”. |
| `_sourceCategory=apache error` | Searches the Continuous tier for messages whose source category is "apache" and that contain the string “error”. |
| `(_dataTier=Continuous OR _dataTier = Infrequent) _index=<FreqPart2>`<br/>This is an example of a query that will fail. | This query will fail because it limits the search to the the Continuous and Infrequent tiers, but specifies a partition that is in the Frequent tier. |

## _dataTier limitations

The `_dataTier` search modifier is not supported in:

* Live mode dashboards
* Role search filters
* Real time alerts
* Partition routing expressions
* Logs-to-Metrics rules
* In scheduled searches, setting `_dataTier` to All, Frequent, or Infrequent is not supported.
* Searches against Cloud SIEM Enterprise data in Sumo Logic. Don't use `_dataTier` when searching CSE data. Instead, use `_index` to specify the security partition or partitions you want to access, as described in [Searching for CSE Records in Sumo Logic](docs/cse/records-signals-entities-insights/search-cse-records-in-sumo.md).

In addition, because `_dataTier` is a reserved name in Sumo Logic, you can’t assign it to a [Field](/docs/manage/fields.md) or in a parse expression for a [Field Extraction Rule](/docs/manage/field-extractions).  

## Best practices

* To query a single tier, use `_dataTier=<TierName>` (i.e. `_dataTier=Infrequent`) in the scope of your query.
* To query all tiers, use `_dataTier=All`.
* When you run a query that will return data from the Infrequent tier, the best practice is to review the scan estimate after writing the query and before before running it. See the following section for more information.

### Estimated and actual scan data for Infrequent queries

When you enter a query that will run against the Infrequent Tier (`_dataTier=Infrequent` or `_dataTier=All`), Sumo Logic estimates and displays the amount of data in the Infrequent tier that will be scanned in order to return the search results.

The screenshot below shows the estimate of how much Infrequent data will be scanned for a query that uses  `_dataTier=All` in the scope.

![CrossTier -Query Start-Estimated Scan.png](/img/partitions-data-tiers/CrossTier-Query-Start-Estimated-Scan.png)

Here's an example of the estimated scan for a query that uses`(_dataTier=Continuous OR _dataTier=Infrequent)` in the scope.

![CrossTier -Query Start-Estimated Scan-2.png](/img/partitions-data-tiers/CrossTier-Query-Start-Estimated-Scan-2.png)

After you run a query, the actual amount of Infrequent data scanned to return the results is shown.

![CrossTier-Query Complete.png](/img/partitions-data-tiers/CrossTier-Query-Complete.png)

If you click in the status area under the histogram, popup with more detailed information appears.

![CrossTier-Query-Complete-SearchDetails.png](/img/partitions-data-tiers/CrossTier-Query-Complete-SearchDetails.png)

### Cross-tier searches and role search filters

This section describes the combined result of cross-tier searches and a role search filter.

Given these partitions:

* `dashboardContinuous` in the Continuous Tier
* `dashboardFreq` in the Frequent Tier
* `dashboardInfreq` in the Infrequent Tier

| Role search filter  | Search query | Results | Notes |
|:--|:--|:--|:--|
| `*` | `_index=dashboard*` | Results will include data from all three of the partitions  | Because the role search filter grants access to all partitions, regardless of tier, results are returned for each of the partitions. |
| `_index=dashboard*` | `*` | Results will only include data from the `dashboardContinuous` partition. | Although the filter gives the user access to `dashboardCont`, `dashboardFreq` and `dashboardInfreq`. The search query "\*" means only continuous views, so of the three views the user has access to, the one in the Continuous tier will be the one selected. |

### _dataTier and scheduled views and audit indexes 

When you query scheduled views, the Sumo Logic Audit Index, or the Sumo Logic Audit Event Index, it isn’t necessary to specify a tier with `_dataTier`. Search these indexes using `_index`.  By default, Sumo will run such queries against the Continuous tier. 

If you use `_dataTier` to specify a tier other than Continuous in a query of scheduled views or either of the audit indexes, Sumo Logic presents an error message.

### API Support with Rate Limiting

The rate limits described in the [Rate limit throttling](/docs/api/search-job "About the Search Job API") section of the *About the Search Job API* topic apply to cross-tier searches with these concurrent active job limits: 

* A limit of 200 active concurrent search jobs applies to your organization for the Continuous Tier (`_dataTier=Continuous`), the Infrequent Tier (`_dataTier=Infrequent`), and All Tiers (`_dataTier=All`).
* When searching only the Frequent Tier (`_dataTier=Frequent`), a rate limit of 20 concurrent search jobs applies to your organization.
