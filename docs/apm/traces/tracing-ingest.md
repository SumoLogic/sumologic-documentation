---
id: tracing-ingest
title: Troubleshoot Ingest
sidebar_label: Troubleshoot Ingest
description: Use tracing to troubleshoot problems with data ingest.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use the `tracingIngest` source category to search for all events that impact [tracing collection](/docs/apm/traces/get-started-transaction-tracing#step-1-set-up-traces-collection).

## Trace and span limits

The following limits and constraints apply to trace data ingested by Sumo Logic:

| Limit | Value | Description |
|:--|:--|:--|
| Maximum spans per trace | 10,000 (OTLP/HTTP sources) | Traces exceeding this limit will have additional spans dropped with a `SpanDropped` audit event. |
| Maximum spans per trace | 1,000 (Older HTTP Traces sources) | Older HTTP Traces sources have a lower span limit per trace. |
| Span arrival window | 24 hours | Sumo Logic does not accept spans older than 24 hours. Spans with timestamps outside this window are dropped. |
| Maximum time between first and last span in a trace | 24 hours | All spans within a single trace must fall within a 24-hour window. The time difference between the earliest and latest span in a trace cannot exceed 24 hours. |
| Maximum metadata per trace | 64 MB | Total size of all metadata across all spans in a trace. |
| Maximum unique tag names per trace | 1,024 | Defines the maximum limit of indexed distinct tag keys. Tags beyond this limit are not indexed. |
| Maximum unique tag names per org | 10,000 per retention period | Organization-wide limit on unique tag names. |
| Tag name length | 64 characters | Tags with names longer than 64 characters are not indexed. |
| Tag value length | 4,096 characters | Tags with values over 4,096 characters are not indexed. |

### Trace assembly timeout

When Sumo Logic receives spans, it assembles them into complete traces. The trace assembly process has the following constraints:

* **Span arrival window**. Spans must arrive within 24 hours of their timestamp. Spans older than 24 hours are rejected and will not appear in trace data.
* **Trace duration limit**. The maximum time between the first and last span in a trace is 24 hours. If your application produces transactions that span more than 24 hours, the trace will only contain spans that fall within a 24-hour window.

:::note
These limits apply to Sumo Logic's hosted trace collection endpoints. If you are using the [Aggregating OpenTelemetry Collector](/docs/apm/traces/advanced-configuration/filter-shape-tracing-data), it has its own buffering configuration (`decision_wait` defaults to 30 seconds) that is separate from the backend trace assembly timeout.
:::

### Recommendations for long-running traces

If your application has long-running transactions (hours or days), consider the following approaches:

* **Break up long transactions**. Instrument your application to create separate traces for distinct phases of a long-running operation, using [Span Links](/docs/apm/traces/view-and-investigate-traces#span-links) to connect related traces.
* **Use shorter spans**. Instead of a single span covering the entire operation, create shorter spans that represent meaningful units of work within the 24-hour window.
* **Track with logs**. For operations exceeding 24 hours, consider using [correlated logs](/docs/apm/traces/advanced-configuration/correlate-logs) to track the overall transaction, with traces covering the active processing portions.

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
