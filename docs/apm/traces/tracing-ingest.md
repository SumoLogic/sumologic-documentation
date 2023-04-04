---
id: tracing-ingest
title: Use Tracing to Troubleshoot Ingest
sidebar_label: Use Tracing to Troubleshoot Ingest
description: Use tracing to to search the audit index for all events that impact ingest.
 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The [Audit Event Index](/docs/manage/security/audit-event-index/) contains event logs in JSON format on account activities, allowing you to monitor and audit changes. You can use the `tracingIngest` source category to search the Audit Event Index for all events that impact [log ingestion](/docs/manage/ingestion-volume/log-ingestion/).

## Example query
In the following example, events logged for `_index=sumologic_system_events AND _sourceCategory=tracingIngest` indicate some impact on ingest. The example query assumes all event types are events to be informed about.
```_index=sumologic_system_events AND _sourceCategory=tracingIngest
| json field=_raw "eventName"
| timeslice 1h
| count by _timeslice, eventName
| transpose row _timeslice column eventName
```

## Ingest events
The following ingest events and accompanying reason messages appear in tracing ingest searches.

### ServiceMapEdgesDropped
The service map edge was dropped due to the number of edges is bigger than a limit:<br/>`Dropped ${numberOfDeletedEdges} edges because limit of number of edges is exceeded. (...)` 

### ServiceMapNodesDropped
The service map node was dropped due to the number of nodes is bigger than a limit:<br/>`Dropped ${numberOfDeletedNodes} nodes because limit of number of nodes is exceeded. (...)`

### SpanDropped
The span was dropped due to:
* Invalid schema:
   * `OTLP span dropped due to invalid format`
   * `Zipkin span dropped due to invalid format`
* The span was too big and couldn't be trimmed down: 
   * `Span could not be trimmed under the preliminary size limit. (...)`
   * `Span could not be trimmed under the size limit. (...)` 
* Quota exceeded:<br/>`Span dropped due to spans per minute limit exceeded`
* Out of time range:<br/>`Dropped span because it is outside of the data retention window`
* Span duplicated:<br/>`Dropped span because it is duplicated`  
* Spans per trace limit exceeded:<br/>`Dropped span because spans per trace limit is exceeded`

### SpanFieldTrimmed
The span field was trimmed due to the span size being too big:<br/>`Trimmed span field due to exceeded size limit. (...)`

### SpanLinksDropped
The span links were dropped due to the span size being too big:<br/>`Dropped link in a span, because span didn't fit into the span size limit. (...)`

### SpanThrottled
The span was throttled due to a spike in ingest, but will be ingested after a delay:<br/>`Span has been throttled due to exceeded spans per minute limit`

### TraceDropped
The trace aggregate was not processed due to too many traces per minute:<br/>`Trace has been dropped due to per minute limit exceeded`

### TraceFieldTrimmed
The trace aggregate field was trimmed due to:
* Going above the max size limit:<br/>`Trimmed trace field due to exceeded size limit. (...)`  
* Critical path breakdown field was too big and was replaced with a default value:<br/>`Trimmed (replaced with default value) trace field due to exceeded size limit. (...)`
