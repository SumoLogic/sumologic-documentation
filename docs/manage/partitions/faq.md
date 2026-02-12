---
id: faq
title: Partitions FAQ
sidebar_label: Partitions FAQ
description: Answers to frequently asked questions about Sumo Logic Partitions.
---

### What is the default scope?

For the tier-based pricing model:

- All partitions in the continuous tier are considered a part of the default scope. 
- Decommissioned partitions are also included.
- Partitions in the Infrequent and Frequent tier are not part of the default scope.

For Flex customers:

- The customer can configure at the partition level to include or exclude it in the default scope.
- All partitions which are not excluded explicitly will then be included in the default scope.

## How does Sumo Logic decide on which partitions to scan?

1. For any query, the first step is determining the scope of the query. If your query does not explicitly mention the `index/view` clause in the source expression, Sumo Logic will consider all partitions in the default scope. You can override the scope of the query by mentioning the specific `index/view` in the source expression `(_index=partitionA)` or adding other tier partitions in the scope by using `_dataTier` modifier like `_dataTier=Infrequent or _dataTier=All`.
2. Then apply a **[partition selection process](#what-happens-in-the-partition-selection-process)** as mentioned below that helps with the final list of partitions that will scan.

## What happens in the partition selection process?

Sumo Logic applies the partition selection process purely based on the routing expressions of the partitions and matches with the search expression of the query. Sumo Logic excludes any partitions that it can; the rest are scanned.

### How does the partition selection process work?

The system tries to match the source expression of the query with the routing expressions of all the partitions in the scope of the query. 

- If the partition matches the source expression, then all other partitions are filtered out and only the matching partition is considered for scan (for example, source expression: `_collector=service1_all_logs AND _sourceCategory=another_category` and routing expression of a partition:  `_collector=service1_all_logs`).
- If the routing expression of a partition and the source expression of the query are not overlapping, that partition will be excluded from the scan (for example, source expression: `_sourceCategory=prod_logs` and routing expression of a partition: `_sourceCategory=staging_logs`).
- The matching logic is filtered with the complex boolean expressions in either the routing expressions or the source expression of the query.
- The system will err on the side of caution in case there is ambiguity to guarantee functional correctness of the query results.
- The system does not have any information about the data other than routing expressions for this selection process.
- The number of partitions scanned is directly related to how well a query source expression matches the routing expressions. Therefore, it is recommended to use simpler expressions, and preferably, use the same dimensions for partition routing as you would generally use in your queries.

### What happens when you change the routing expression of a partition?

Sumo Logic maintains a historical record of the routing expressions of the partitions. It also considers the historical routing expressions with the timerange to filter the partitions.

### Is there a way to find out which partitions are being scanned?

Currently, there is no way to extract this list for a given query, but Sumo Logic can expose it on demand on your log search page. You can look at the corresponding audit log in the search query audit index to check the number of partitions being scanned in each query.

### Why are decommissioned partitions being scanned?

Disabling a partition does not remove the existing data in it. Disabling simply means that we will no longer ingest data into that partition. The data already present in a partition will continue to be served in queries and will still need to be scanned.

### What happens when you set `_dataTier=All`?

When you specify `_dataTier=All`, the query will include partitions from both the *Infrequent* and *Frequent* tiers. The partition selection process will still be applied to minimize the number of partitions that need to be scanned.

### What happens when you do not include `_dataTier=Continuous`?

By default, `_dataTier=Continuous` is the scope, and you do not need to specify this explicitly.

### What happens if you specify an index or view which is not a partition in the query, like a scheduled view, audit index, or security indexes?

If the query's scope does not include any partitions, the partition selection process is not executed, and all indexes/views within the scope are scanned for the query's time range.

### Are all the data scanned in the selected partitions?

No data outside the specified time range and interval type (message time, receipt time, or searchable time) is scanned for the query.
