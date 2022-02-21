---
slug: /search-and-logs
---

Search allows you to query and analyze log data sent to Sumo Logic. There are many features to help you use our robust Search Query Language, such as LogCompare, LogReduce, LogExplain, Lookup Tables, Subqueries, and Time Compare. See [Get Started with Search] to begin exploring your data in Sumo Logic.

## Partitions and Views 

Logs collected by Sumo Logic are indexed in Partitions and Scheduled Views. In addition, there are internal indexes such as Health Events, Archive, Audit, and Volume indexes. 

* A Partition stores your data in an index separate from the rest of your account data so you can [optimize searches], [manage variable retention], and specify certain [data to forward to S3]. See how to Run a [Search Against a Partition].
* Scheduled Views speed the search process subsets of your data by functioning as a pre-aggregated index. See how to [Run a Search Against a Scheduled View].
* Health Events monitor the health of your Collectors and Sources. See how to [Search Health Events].
* Archive allows you to forward log data from Installed Collectors to AWS S3 buckets to collect at a later time. See how to Search ingested Archive data.
* Audit and Event Audit provide information on the internal events that occur in Sumo Logic. See how to search the [Audit] and [Audit Event] Index.
* Data Volume gives you visibility into how much data you are sending to Sumo Logic, allowing you to proactively manage your systems’ behavior and to fine tune your data ingest with respect to the data plan for your Sumo Logic subscription. See [Data Volume Index] for details.

## Data Tiers 

Data Tiers provide the ability to allocate data to different storage tiers based on the frequency of access: Continuous, Frequent, and Infrequent.

To search specific Data Tiers. See [Searching Data Tiers].

## Traces 

Traces are collected with SumoLogic Kubernetes Collection or a standalone OpenTelemetry collector through an HTTP Traces Source.

* Search raw spans from tracing data from the last seven days. See [Search Query Language support for Traces].
* View tracing data from search log messages by right-clicking an entry and selecting **Open Trace**. See [View Traces] from Search Results.

:::note
To interact with other Sumo Logic users, post feedback, or ask a question, visit the Sumo Logic Community Search & Query Forum. 
:::