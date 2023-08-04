---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript
title: JavaScript OpenTelemetry auto-instrumentation
sidebar_label: JavaScript OpenTelemetry auto-instrumentation
description: Learn how to instrument your JavaScript/NodeJS services using the Sumo Logic distribution for OpenTelemetry JS (recommended) or the official OpenTelemetry distribution.
---

You can instrument your JavaScript/NodeJS services either using [Sumo Logic distribution for OpenTelemetry JS](#auto-instrumentation-using-sumo-logic-opentelemetry-for-js-distro-easy-setup) that is all-in-one, easy and quick to setup or a bit more demanding [official OpenTelemetry distribution](#auto-instrumentation-using-official-opentelemetry-for-js). 

## Option 1: Auto-instrumentation using Sumo Logic OpenTelemetry for JS distro (Basic)

Sumo Logic [provides its own distribution for OpenTelemetry (OT) JS](https://www.npmjs.com/package/@sumologic/opentelemetry-node) tracing instrumentation. It is fully compatible with official OT package and free to use also with other vendor backends. This method is recommended as it makes installation easy, straightforward, and quick with a "just-works" scenario. It is provided as all-in-one runner for node.js projects used to enable OpenTelemetry auto-instrumentation with OTLP HTTP exporter.

### Setup

Instead of running your script like `node index.js`, use the following command:

```bash
npx @sumologic/opentelemetry-node index.js
```

Your `index.js` file will run automatically with a started [`@opentelemetry/sdk-node`](https://www.npmjs.com/package/@opentelemetry/sdk-node).

Remember to provide configuration using environment variables:

* `OTEL_EXPORTER_OTLP_ENDPOINT` - must be provided with the location of the OpenTelemetry Collector/Agent (recommended for production) or Sumo Logic HTTP Traces source. Refer to the following setup instructions if you haven't yet installed a collector:
   * [Set up traces collection for Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md)
   * [Set up traces collection for other environments usage](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md)
* `OTEL_SERVICE_NAME` - a logical service name that represents its business logic
* `OTEL_RESOURCE_ATTRIBUTES` - set "application" name attribute which should represent its business logic and extra attributes attached to all spans. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. For more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels).

**Example:**

```bash
OTEL_SERVICE_NAME=api
OTEL_RESOURCE_ATTRIBUTES="application=banking-app,deployment.environment=dev"
OTEL_EXPORTER_OTLP_ENDPOINT=http://examplehost:4318
npx @sumologic/opentelemetry-node index.js
```

To speed up the `npx @sumologic/opentelemetry-node` command, you can do:

```bash
npm i -g @sumologic/opentelemetry-node
```

### Instrumented packages

Sumo Logic OpenTelemetry for JS instrumentation enables all officially supported core and contrib auto-instrumentation plugins defined in [@opentelemetry/auto-instrumentations-node](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node), including:
* [@opentelemetry/instrumentation-dns](https://www.npmjs.com/package/@opentelemetry/instrumentation-dns)
* [@opentelemetry/instrumentation-http](https://www.npmjs.com/package/@opentelemetry/instrumentation-http)
* [@opentelemetry/instrumentation-grpc](https://www.npmjs.com/package/@opentelemetry/instrumentation-grpc)
* [@opentelemetry/instrumentation-express](https://www.npmjs.com/package/@opentelemetry/instrumentation-express)
* [@opentelemetry/instrumentation-koa](https://www.npmjs.com/package/@opentelemetry/instrumentation-koa)
* [@opentelemetry/instrumentation-graphql](https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql)
* [@opentelemetry/instrumentation-ioredis](https://www.npmjs.com/package/@opentelemetry/instrumentation-ioredis)
* [@opentelemetry/instrumentation-redis](https://www.npmjs.com/package/@opentelemetry/instrumentation-redis)
* [@opentelemetry/instrumentation-pg](https://www.npmjs.com/package/@opentelemetry/instrumentation-pg)
* [@opentelemetry/instrumentation-mongodb](https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb)
* [@opentelemetry/instrumentation-mysql](https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql)

### Limitations

* Only OTLP/HTTP proto exporter is supported
* Only W3C context propagation is supported
* Support for logs and metrics requires instrumentation using official OpenTelemetry for JS

## Option 2: Auto-instrumentation using official OpenTelemetry for JS (Advanced)

The OpenTelemetry-JS community supports all active versions of NodeJS. See a [list of supported runtimes](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes). Instruction below apply to **OpenTelemetry JavaScript Instrumentation** in version **1.1.0/0.28.0**.

There are a few simple steps to instrument your application and obtain telemetry data.

### Packages installation

The installation of the packages listed below is required to apply the instrumentation and export telemetry data.

```bash
npm install --save @opentelemetry/sdk-trace-node@1.1.0
npm install --save @opentelemetry/sdk-trace-base@1.1.0
npm install --save @opentelemetry/resources@1.1.0
npm install --save @opentelemetry/api@1.1.0
```

The packages above are mandatory. The next step is to install OpenTelemetry plugins and chosen exporters. They will automatically instrument used node modules. The list of available plugins can be found [here](https://github.com/open-telemetry/opentelemetry-js/tree/master/packages). If the application is an HTTP Client/Server then their  corresponding plugins must be installed like in the example below:
```bash
npm install --save @opentelemetry/instrumentation-http@0.27.0
```

### Instrumentation with OpenTelemetry HTTP exporter

[OpenTelemetry HTTP exporter](https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto/v/0.27.0)

Install OpenTelemetry HTTP exporter package:  

```bash
npm install --save @opentelemetry/exporter-trace-otlp-proto@0.28.0
```

To enable instrumentation in your application, add the code below to your project. The best way is to save it and name it **tracer.js** - this file will contain everything that is needed to configure tracing. The first step is to provide `YOUR_SERVICE_NAME` which should define a logical service name as a string value that represents its business logic. This will appear as a tracing service name in the Sumo Logic web interface. Similar to service name `YOUR_APPLICATION_NAME` should represent its business logic. The next step is to create new `NodeTracerProvider()` to automatically instrument NodeJS applications. It is important to initialize [NodeTracerProvider](https://github.com/open-telemetry/opentelemetry-js/tree/stable/v1.0.1/packages/opentelemetry-sdk-trace-node#how-auto-instrumentation-works) before any other module of the application.

Next, configure the OpenTelemetry Exporter, `exporterOptions`. This is where `url` is configured. The `url `sets the collection receiver endpoint from a Sumo Logic Source. The example below points to the default Sumologic Kubernetes Collector.

After the exporter configuration, the instrumentation has to be registered. In our example, `HttpInstrumentation()` is registered. This will enable auto-instrumentation for the HTTP package. If there are other libraries to instrument it is enough to add them to the `instrumentations` list. All available instrumentation packages can be found in the repositories [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages) and [OpenTelemetry JS Contrib](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins).

```js
'use strict';

const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { Resource } = require('@opentelemetry/resources');


module.exports = () => {
 const resources = new Resource({
    'service.name': 'YOUR_SERVICE_NAME',
    'application': 'YOUR_APPLICATION_NAME',
    //'ANY_OTHER_ATTRIBUTE_KEY': 'ANY_OTHER_ATTRIBUTE_VALUE',
 });

 const provider = new NodeTracerProvider({ resource: resources });

 const exporterOptions = {
  url: 'http://collection-sumologic-otelcol.sumologic:4318/v1/traces',
 }

 const exporter = new OTLPTraceExporter(exporterOptions);
 provider.addSpanProcessor(new BatchSpanProcessor(exporter));
 provider.register();

 registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
  ],
 })
 return opentelemetry.trace.getTracer("instrumentation-example");
}
```

The last step is to execute `tracer` in your application code. Add the following line in the code below in your application on the top of the code.

```js
const tracer = require('./tracer')()
```
