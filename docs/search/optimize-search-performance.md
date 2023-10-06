---
id: optimize-search-performance
title: Optimize Search Performance
---

Search optimization tools speed the search process, delivering query results in less time and improving productivity for forensic analysis and log management.

Search speed generally depends on the amount of data and the type of query run against the data. Search optimization tools segment the data and queue it up for quick results.

An **index**, or proper subset of the data, is central to search optimization. When you run a search against an index, search results are returned more quickly and efficiently because the search is run against a smaller data set.

Sumo Logic supports index-based and field-based methods for search optimization.

Even with these methods, you need to ensure you are following our [best practices for queries](get-started-with-search/build-search/best-practices-search.md).

## Index-based methods

[**Partitions**](/docs/manage/partitions-data-tiers) route unstructured data into an index. See how to [Optimize Your Search with Partitions](/docs/search/optimize-search-partitions).

[**Scheduled Views**](/docs/manage/scheduled-views) pre-aggregate data and then index it.

## Metadata methods

With metadata tags assigned to your logs you can reference them in the [scope (keyword search expression)](get-started-with-search/build-search/keyword-search-expressions.md) of queries to drastically increase search performance.

{@import ../reuse/metadata-data-enrichment.md}

## Search optimization process

When data enters Sumo Logic, search optimization is done in the
following order:

1. Metadata is applied to your data as [Fields](/docs/manage/fields). The order of precedence for field assignment from highest to lowest is. 

    * Field Extraction Rule (FER)
    * Amazon EC2 resource tags
    * Amazon EC2 instance information
    * HTTP Header
    * Source
    * Collector

1. Partitions and Scheduled Views are applied. If both Partitions and Scheduled Views are defined, the Partitions are applied first.
1. The data is indexed.
1. The optimized and indexed data is available for use with other Sumo Logic features.

## Is there such a thing as creating too many indexes?

Yes. Indexes can be overused, and in some situations, they can even slow the search process. When designing your organization's indexes, think about the minimal amount of data it makes sense to index, regardless of the tool. When running a search on non-indexed data, Sumo Logic might need to process all indexed data as well, which can take a long time.

## How do Partitions and Scheduled Views differ?

Partitions begin building a **non-aggregate** index from the date a Partition started, only indexing data moving forward.

Scheduled Views **backfill**, meaning that all data that extends back to the start date of the Scheduled View can be queried.

## Choosing the right indexed search optimization tool

Here's a quick look at how to choose the right indexed search optimization tool.

| I want to... | Partition | Scheduled View |
| :-- | :-- | :-- |
| Run queries against a certain set of data | Choose if the quantity of data to be indexed is more than 2% of the total data. | Choose if the quantity of data to be indexed is less than 2% of the total data. |
| Use data to identify long-term trends |   | Yes |
| Segregate data by sourceCategory | Yes |   |
| Have aggregate data ready to query |   | Yes |
| Use RBAC to deny or grant access to the data set | Yes | Yes |
| Reuse the fields that I'm parsing for other searches against this same sourceCategory |   |   |

## How is data added to Partitions and Scheduled Views?

As data enters Sumo Logic, it is first routed to any Partitions for indexing. It is then checked against Scheduled Views, and any data that matches the Scheduled Views is indexed.

Data can be in both a Partition and a Scheduled View because the two tools are used differently (and are indexed separately). Although Partitions are indexed first, the process does not slow the indexing of Scheduled Views.
