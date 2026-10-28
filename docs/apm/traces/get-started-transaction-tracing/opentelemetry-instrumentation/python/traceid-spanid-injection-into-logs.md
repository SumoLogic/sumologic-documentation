---
id: traceid-spanid-injection-into-logs
title: Python Trace ID and Span ID Injection into Logs
sidebar_label: Trace ID and Span ID injection into logs
description: Learn how to configure trace ID, span ID, and trace flags data injection into user logs in Python applications.
---

To add `trace_id` and `span_id` to your Python lambda logs, you'll need to get a context from the current span and attach it to the log.

:::important
Make sure that the code from below is active in the `.py` file where your application requests are traced with OpenTelemetry python instrumentation. Logs not related to traced requests will not have `span_id` or `trace_id` filled in.
:::

## Python lambda

1. Add library import:
  ```py
  from opentelemetry import trace
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
