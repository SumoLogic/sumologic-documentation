---
id: traceid-spanid-injection-into-logs
title: Python TraceId and SpanId injection into logs configuration
sidebar_label: TraceId and SpanId injection into logs
description: Learn how to configure traceId, spanId, and trace flags data injection into user logs in Python applications.
---

Here's how to add traceId and spanId into logs for Python lambda. You have to get a context from current span and attach it to the log.

## Python lambda

1. Add library import:
  ```py
  from OpenTelemetry import trace
  ```
2. Obtain current span context:
  ```py
  ctx = trace.get_current_span().get_span_context()
  ```
3. Get trace_id and span_id:
  ```py
  trace_id = '{trace:032x}'.format(trace=ctx.trace_id)
  span_id = '{span:016x}'.format(span=ctx.span_id)
  ```
4. Inject to log:
  ```py
  log.info('logging test trace_id=%s span_id=%s', trace_id, span_id)
  ```
