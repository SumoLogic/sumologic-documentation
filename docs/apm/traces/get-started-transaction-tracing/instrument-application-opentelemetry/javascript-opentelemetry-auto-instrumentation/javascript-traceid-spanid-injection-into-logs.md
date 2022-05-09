---
id: javascript-traceid-spanid-injection-into-logs
---

# JavaScript TraceId and SpanId injection into logs

It is very simple to configure **traceId, spanId, and trace flags data** injection into user logs in JavaScript applications. Mostly it is enough to add instrumented versions of the logging packages into project dependencies and register them as new instrumentation.

:::note
The examples below apply to **OpenTelemetry JS** instrumentation version **0.23.0**.
:::

## Winston Logger OpenTelemetry instrumentation

The following information walks through [winston](https://www.npmjs.com/package/winston) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston):

1. Package dependency installation:  

   ```
   npm install --save @opentelemetry/instrumentation-winston
   ```

1. winston instrumentation registration should be added in the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](JavaScript_TraceId_and_SpanId_injection_into_logs/...md) for details.

   * Import dependency:

      ```
      const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
      ```

   * Register WinstonInstrumentation  

      ```
      registerInstrumentations({
      instrumentations: [
         new WinstonInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Bunyan Logger OpenTelemetry instrumentation

The following information walks through [bunyan](https://www.npmjs.com/package/bunyan) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan):

1. Package dependency installation:  

   ```
   npm install --save @opentelemetry/instrumentation-bunyan
   ```

1. bunyan instrumentation registration should be added in the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](/docs/apm/traces/get-started-transaction-tracing/javascript-opentelemetry-auto-instrumentation) for details.

   * Import dependency  

      ```
      const { BunyanInstrumentation } = require('@opentelemetry/instrumentation-bunyan');
      ```

   * Register BunyanInstrumentation  

      ```
      registerInstrumentations({
      instrumentations: [
         new BunyanInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Pino Logger OpenTelemetry instrumentation

The following information walks through [pino](https://www.npmjs.com/package/pino) logger [OpenTelemetry instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation-pino):

1. Package dependency installation : 

   ```
   npm install --save @opentelemetry/instrumentation-pino
   ```

1. pino instrumentation registration should be added in the file where OpenTelemetry JS instrumentation is configured. See [Sumo Logic OpenTelemetry JS auto-instrumentation](JavaScript_TraceId_and_SpanId_injection_into_logs/...md) for details.

   * Import dependency  

      ```
      const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');
      ```

   * Register PinoInstrumentation  

      ```
      registerInstrumentations({
      instrumentations: [
         new PinoInstrumentation(),
         // other instrumentations
      ],
      });
      ```

## Custom logger - span Context extraction

In the case of custom loggers, the most important thing is to know how to obtain the current traceId, spanId, and trace flag. Follow the steps below:

1. Package dependency installation  

   ```
   npm install --save @opentelemetry/api
   ```

1. Current **span Context** extraction is the way to obtain required data.

* Import dependency  

   ```
   const api = require('@opentelemetry/api');
   ````

* Get a current span  

   ```
   let current_span = api.trace.getSpan(api.context.active());
   ```

* Obtain trace_id, span_id and trace flag  

   ```
   let trace_id = current_span.spanContext().traceId;
   let span_id = current_span.spanContext().spanId;
   let trace_flags = current_span.spanContext().traceFlags;
   ```

* Example usage  

   ```
   console.log(`Example log trace_id:”${trace_id}” span_id:”${span_id}” trace_flags:”${trace_flags}”`);
   ```  
      
   Example output:  

   ```
   Example log trace_id:"b2fa3d72711c1adad9ec88348c46f449" span_id:"85733005b2678b28" trace_flags:"1"
   ```
