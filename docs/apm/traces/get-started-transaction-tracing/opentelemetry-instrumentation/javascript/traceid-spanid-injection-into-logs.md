---
id: traceid-spanid-injection-into-logs
title: JavaScript TraceId and SpanId injection into logs
sidebar_label: TraceId and SpanId injection into logs
description: Learn how to configure traceId, spanId, and trace flags data injection into user logs in JavaScript applications.
---

Configuring the injection of **traceId**, **spanId**, and **trace flags** data into user logs in JavaScript applications is straightforward. Typically, you only need to add instrumented versions of the logging packages to your project dependencies and register them as new instrumentation.

:::note
The examples below are compatible with **OpenTelemetry JS API and SDK 1.0+**.
:::

## Winston Logger OpenTelemetry instrumentation

The following information walks through [winston](https://www.npmjs.com/package/winston) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston):

1. Install package dependency.
   ```bash
   npm install --save @opentelemetry/instrumentation-winston
   ```
1. Add winston instrumentation registration to the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript) for details.
   1. Import dependency:
      ```js
      const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
      ```
   1. Register `WinstonInstrumentation`:
      ```js
      registerInstrumentations({
      instrumentations: [
         new WinstonInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Bunyan Logger OpenTelemetry instrumentation

The following information walks through [bunyan](https://www.npmjs.com/package/bunyan) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan):

1. Install package dependency:  
   ```bash
   npm install --save @opentelemetry/instrumentation-bunyan
   ```
1. Add bunyan instrumentation registration to the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript) for details.
   * Import dependency.
      ```js
      const { BunyanInstrumentation } = require('@opentelemetry/instrumentation-bunyan');
      ```
   * Register `BunyanInstrumentation`.
      ```js
      registerInstrumentations({
      instrumentations: [
         new BunyanInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Pino Logger OpenTelemetry instrumentation

The following information walks through [pino](https://www.npmjs.com/package/pino) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-pino).

1. Install package dependency.
   ```bash
   npm install --save @opentelemetry/instrumentation-pino
   ```
1. Add pino instrumentation registration to the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript) for details.
   * Import dependency.  
      ```js
      const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
      ```
   * Register `PinoInstrumentation`.
      ```sql
      registerInstrumentations({
      instrumentations: [
         new PinoInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Custom logger - span Context extraction

In the case of custom loggers, the most important thing is to know how to obtain the current traceId, spanId, and trace flag. Follow the steps below:

1. Install package dependency.
   ```bash
   npm install --save @opentelemetry/api
   ```
1. Current **span Context** extraction is the way to obtain required data.
   * Import dependency.  
     ```js
     const api = require('@opentelemetry/api');
     ```
   * Get a current span.  
     ```js
     let current_span = api.trace.getSpan(api.context.active());
     ```
   * Obtain `trace_id`, `span_id` and `trace` flag.  
     ```js
     let trace_id = current_span.spanContext().traceId;
     let span_id = current_span.spanContext().spanId;
     let trace_flags = current_span.spanContext().traceFlags;
     ```
   * Example usage.  
     ```js
     console.log(`Example log trace_id:”${trace_id}” span_id:”${span_id}” trace_flags:”${trace_flags}”`);
     ```  
   * Example output.  
     ```js
     Example log trace_id:"b2fa3d72711c1adad9ec88348c46f449" span_id:"85733005b2678b28" trace_flags:"1"
     ```
