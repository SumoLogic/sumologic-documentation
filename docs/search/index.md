---
slug: /search
title: Log Search
description: Learn about the Sumo Logic search language, operators, and search features.
tags: [log search, search]
algolia: {
  priority: 1
}
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/search/get-started-search/search-basics/logsearch.png')} alt="icon" width="50"/>

Log Search allows you to query and analyze log data sent to Sumo Logic. There are many features to help you use our robust Search Query Language, such as LogCompare, LogReduce, LogExplain, Lookup Tables, Subqueries, and Time Compare. See [Get Started with Search](/docs/search/get-started-with-search) to begin exploring your data in Sumo Logic.

## Guides

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/get-started-with-search"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Getting started with Log Search</h4></a>
  <p>Start here to begin exploring your data in Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/search-query-language"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Search Query Language</h4></a>
  <p>The extensive Sumo Logic query options help you gain valuable insight into your log messages.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/search-cheat-sheets"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Search Cheat Sheets</h4></a>
  <p>Cheat sheets provide examples of useful search queries for different use cases.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/logreduce"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>LogReduce</h4></a>
  <p>Quickly assess activity patterns for things like a range of devices or traffic on a website.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/logcompare"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>LogCompare</h4></a>
  <p>Easily compare log data from different time periods to detect major changes or anomalies.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/lookup-tables"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Lookup Tables</h4></a>
  <p>Learn about Lookup tables and the search operators you can use with them.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/live-tail"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>LiveTail</h4></a>
  <p>Real-time live feed of log events associated with a Source or Collector.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/behavior-insights"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Behavior Insights</h4></a>
  <p>Gain behavioral insight of your environment using LogReduce operators.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/search/subqueries"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Subqueries</h4></a>
  <p>Filter and evaluate conditions for a query when you may not be sure of the exact filter.</p>
  </div>
</div>
</div>

<br/>

:::note
To interact with other Sumo Logic users, post feedback, or ask a question, visit the [Sumo Logic Community Search & Query Forum](https://support.sumologic.com/hc/en-us/community/topics).
:::

## Partitions and Views

Logs collected by Sumo Logic are indexed in Partitions and Scheduled Views. In addition, there are internal indexes such as Health Events, Archive, Audit, and Volume indexes.

* A Partition stores your data in an index separate from the rest of your account data so you can [optimize searches](optimize-search-performance.md), [manage variable retention](/docs/manage/partitions-data-tiers/manage-indexes-variable-retention), and specify certain [data to forward to S3](/docs/manage/data-forwarding/amazon-s3-bucket). See how to [Run a Search Against a Partition](/docs/search/optimize-search-partitions).
* Scheduled Views speed the search process subsets of your data by functioning as a pre-aggregated index. See how to [Run a Search Against a Scheduled View](/docs/manage/scheduled-views/run-search-against-scheduled-view).
* Health Events monitor the health of your Collectors and Sources. See how to [Search Health Events](/docs/manage/health-events).
* Archive allows you to forward log data from Installed Collectors to Amazon S3 buckets to collect at a later time. See how to [Search ingested Archive data](/docs/manage/data-archiving/archive).
* Audit and Event Audit provide information on the internal events that occur in Sumo Logic. See how to search the Audit and [Audit Event Index](/docs/manage/security/audit-event-index).
* Data Volume gives you visibility into how much data you are sending to Sumo Logic, allowing you to proactively manage your systems’ behavior and to fine tune your data ingest with respect to the data plan for your Sumo Logic subscription. See [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index) for details.

## Data Tiers

Data Tiers provide the ability to allocate data to different storage tiers based on the frequency of access: Continuous, Frequent, and Infrequent.

To search specific Data Tiers. See [Searching Data Tiers](/docs/manage/partitions-data-tiers).

## Traces

Traces are collected with SumoLogic Kubernetes Collection or a standalone OpenTelemetry collector through an HTTP Traces Source.

* Search raw spans from tracing data from the last seven days. See [Search Query Language support for Traces](get-started-with-search/search-basics/view-traces-search-results.md).
* View tracing data from search log messages by right-clicking an entry and selecting **Open Trace**. See [View Traces](/docs/apm/traces/view-and-investigate-traces) from Search Results.
