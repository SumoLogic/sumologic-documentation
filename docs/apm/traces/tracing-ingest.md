---
id: tracing-ingest
title: Troubleshoot Ingest
sidebar_label: Troubleshoot Ingest
description: Use tracing to troubleshoot problems with data ingest.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use the `tracingIngest` source category to search for all events that impact [tracing collection](/docs/apm/traces/get-started-transaction-tracing#step-1-set-up-traces-collection).

## Example query

Use the following index and source category filters to find all the `tracingIngest` audit logs:
```
_index=sumologic_system_events AND _sourceCategory=tracingIngest
```

In the following example, all the events logged indicate some impact on ingest. The example query assumes all event types are events to be informed about.
```
_index=sumologic_system_events AND _sourceCategory=tracingIngest
| json field=_raw "eventName"
| timeslice 1h
| count by _timeslice, eventName
| transpose row _timeslice column eventName
```

## Ingest events

When ingest events are returned by the query, audit logs provide the name of the event type (such as `SpanDropped`), the amount of that event type, and the error message associated with the event type.

In the following example, 57 spans were dropped and reported in one audit log.

```
"severityLevel": "Info",
"details": {
"amount": 57,
"name": "SpanDropped",
"description": "Dropped span because spans per trace limit is exceeded. Limit: 10000." }
```

The following ingest events and accompanying reason messages appear in tracing ingest audit logs.

### ServiceMapEdgesDropped
The service map edge was dropped due to the number of edges being bigger than a limit:<br/>`Dropped ${numberOfDeletedEdges} edges because limit of number of edges is exceeded. (...)` 

### ServiceMapNodesDropped
The service map node was dropped due to the number of nodes being bigger than a limit:<br/>`Dropped ${numberOfDeletedNodes} nodes because limit of number of nodes is exceeded. (...)`

### SpanDropped
The span was dropped due to:
* Invalid schema:
   * `OTLP span dropped due to invalid format.`
   * `Zipkin span dropped due to invalid format.`
* The span was too big and couldn't be trimmed down: 
   * `Span could not be trimmed under the preliminary size limit. (...)`
   * `Span could not be trimmed under the size limit. (...)` 
* Quota exceeded:<br/>`Span dropped due to spans per minute limit exceeded. (...)`
* Out of time range:<br/>`Dropped span because it is outside of the data retention window. (...)`
* Span duplicated:<br/>`Dropped span because it is duplicated. (...)`  
* Spans per trace limit exceeded:<br/>`Dropped span because spans per trace limit is exceeded. (...)`

### SpanFieldTrimmed
The span field was trimmed due to the span size being too big:<br/>`Trimmed span field due to exceeded size limit. (...)`

### SpanLinksDropped
The span link was dropped due to the span size being too big:<br/>`Dropped link in a span, because span didn't fit into the span size limit. (...)`

### SpanThrottled
The span was throttled due to a spike in ingest:<br/>`Span has been throttled due to exceeded spans per minute limit. It will be processed with a delay.`

### TraceDropped
The trace aggregate was not processed due to too many traces per minute:<br/>`Trace has been dropped due to per minute limit exceeded. Trace information might not exist or be incomplete.`

### TraceFieldTrimmed
The trace aggregate field was trimmed due to:
* Going above the max size limit:<br/>`Trimmed trace field due to exceeded size limit. (...)`  
* Critical path breakdown field was too big and was replaced with a default value:<br/>`Trimmed (replaced with default value) trace field due to exceeded size limit. (...)`
