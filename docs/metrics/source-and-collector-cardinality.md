---
id: source-and-collector-cardinality
title: Source and Collector Wise Cardinality
sidebar_label: Source and Collector Wise Cardinality
description: Identify and analyze source and collector-level cardinality using audit logs to pinpoint high-cardinality sources.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

This document explains how to identify and analyze cardinality ingested per source and collector, helping you pinpoint high-cardinality sources and manage ingestion limits more effectively.

Previously, there was no direct visibility into the contribution of cardinality from individual sources. When limits were exceeded, there was limited control over which sources were paused. As a result, sources that were not significant contributors could be paused, while the actual high-cardinality sources remained active. This lack of source-level visibility made it difficult to accurately identify and address the root cause of high cardinality.

To address this, you can now run a query to identify cardinality at the source level and analyze which sources contribute the most within a given collector. This enables more targeted actions and helps avoid unnecessary impact on other sources.

Use the query below to determine the cardinality associated with sources for a specific collector.

```sql
_view=sumologic_volume _sourceCategory=cardinalityPerSourceCollector
  | parse regex "bucket:\s+(?<bucket>\S+)" nodrop
  | parse regex "(?<collectorId>[^;\s]+);(?<sourceId>\d+):(?<cardinality>\d+)" multi
  | num(cardinality)
  | fields bucket, collectorId, sourceId, cardinality
```

## Limitations

* If an organization has more than 100 sources, only the top 100 sources (by cardinality) are displayed for an audit log.
* Source and collector data is refreshed every hour, and a new audit log is generated to reflect the latest cardinality data.
