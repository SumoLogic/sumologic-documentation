---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/javascript
title: JavaScript OpenTelemetry Auto-Instrumentation
sidebar_label: OpenTelemetry Auto-Instrumentation
description: Learn how to instrument your JavaScript/NodeJS services using the Sumo Logic distribution for OpenTelemetry JS (recommended) or the official OpenTelemetry distribution.
---

You can instrument your JavaScript/NodeJS services by using either the [official OpenTelemetry distribution](#option-1-auto-instrumentation-using-official-opentelemetry-for-js) (recommended) or the [Sumo Logic Distribution for OpenTelemetry JS](#option-2-auto-instrumentation-using-sumo-logicopentelemetry-for-js-distro-basic). 

## Option 1: Auto-instrumentation using official OpenTelemetry for JS

The OpenTelemetry-JS community supports all active versions of NodeJS. See a [list of supported runtimes](https://github.com/open-telemetry/opentelemetry-js#supported-runtimes). 

The instructions below apply to the **OpenTelemetry JavaScript Instrumentation** in version **1.9.0/0.48.0**.

There are a few simple steps to instrument your application and obtain telemetry data.

### Packages installation

:::note required step
You must install the packages listed below to apply the instrumentation and export telemetry data.
:::

```bash
npm install --save @opentelemetry/api@1.9.0
npm install --save @opentelemetry/auto-instrumentations-node@0.48.0
```

### Instrumentation configuration

After successful installation of the packages, it is important to properly configure instrumentation. Configuration is set through environment variables.

* Disables the metrics exporter:
  ```bash
  OTEL_METRICS_EXPORTER=none
  ```
* Sets the exporter to OTLP:
  ```bash
  OTEL_TRACES_EXPORTER=otlp
  ```
* Configures the endpoint where telemetry data will be sent:
  ```bash
  OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_ENDPOINT:4318
  ```
  This should be the OpenTelemetry Collector/Agent endpoint address or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp). For Kubernetes environments, see the [available endpoints for a direct connection](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md). For other environments, see [endpoints and protocols](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md).
* Configures the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
  ```bash
  OTEL_SERVICE_NAME=SERVICE_NAME
  ```
* Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma-separated key=value pairs.
  ```bash
  OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME
  ```
* Configure the resource detectors. Additional attributes related to environment are added to the spans.
  ```bash
  OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
  ```

### Application execution

When everything is configured, it is very simple to run an instrumented application.

```bash
node --require @opentelemetry/auto-instrumentations-node/register your-js-script.js
```

## Option 2: Auto-instrumentation using Sumo Logic OpenTelemetry for JS distro (Basic)

Sumo Logic [provides its own distribution for OpenTelemetry (OT) JS](https://www.npmjs.com/package/@sumologic/opentelemetry-node) tracing instrumentation. It is fully compatible with official OT package and free to use also with other vendor backends. This method is recommended as it makes installation easy, straightforward, and quick with a "just-works" scenario. It is provided as all-in-one runner for node.js projects used to enable OpenTelemetry auto-instrumentation with OTLP HTTP exporter.

### Setup

Instead of running your script like `node index.js`, use the following command:

```bash
npx @sumologic/opentelemetry-node index.js
```

Your `index.js` file will run automatically with a started [`@opentelemetry/sdk-node`](https://www.npmjs.com/package/@opentelemetry/sdk-node).

Remember to provide configuration using environment variables:

* `OTEL_EXPORTER_OTLP_ENDPOINT`. Must be provided with the location of the OpenTelemetry Collector/Agent (recommended for production) or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp). If you haven't yet installed a collector, refer to the following setup instructions:
  * [Set up traces collection for Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md)
  * [Set up traces collection for other environments usage](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md)
* `OTEL_SERVICE_NAME`. A logical service name that represents its business logic.
* `OTEL_RESOURCE_ATTRIBUTES`. Set "application" name attribute which should represent its business logic and extra attributes attached to all spans. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. For more information, see [Add Services Panel to Dashboard](/docs/apm/services-list-map/#add-services-panel-to-dashboard).

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

The Sumo Logic OpenTelemetry for JS instrumentation enables all officially supported core and contrib auto-instrumentation plugins defined in [@opentelemetry/auto-instrumentations-node](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node), including:
* [opentelemetry/instrumentation-amqplib](https://www.npmjs.com/package/@opentelemetry/instrumentation-amqplib)
* [opentelemetry/instrumentation-aws-lambda](https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-lambda)
* [opentelemetry/instrumentation-aws-sdk](https://www.npmjs.com/package/@opentelemetry/instrumentation-aws-sdk)
* [opentelemetry/instrumentation-bunyan](https://www.npmjs.com/package/@opentelemetry/instrumentation-bunyan)
* [opentelemetry/instrumentation-cassandra-driver](https://www.npmjs.com/package/@opentelemetry/instrumentation-cassandra-driver
* [opentelemetry/instrumentation-connect](https://www.npmjs.com/package/@opentelemetry/instrumentation-connect)
* [opentelemetry/instrumentation-cucumber](https://www.npmjs.com/package/@opentelemetry/instrumentation-cucumber
* [opentelemetry/instrumentation-dataloader](https://www.npmjs.com/package/@opentelemetry/instrumentation-dataloader)
* [opentelemetry/instrumentation-dns](https://www.npmjs.com/package/@opentelemetry/instrumentation-dns)
* [opentelemetry/instrumentation-express](https://www.npmjs.com/package/@opentelemetry/instrumentation-express)
* [opentelemetry/instrumentation-fastify](https://www.npmjs.com/package/@opentelemetry/instrumentation-fastify)
* [opentelemetry/instrumentation-fs](https://www.npmjs.com/package/@opentelemetry/instrumentation-fs)
* [opentelemetry/instrumentation-generic-pool](https://www.npmjs.com/package/@opentelemetry/instrumentation-generic-pool)
* [opentelemetry/instrumentation-graphql](https://www.npmjs.com/package/@opentelemetry/instrumentation-graphql)
* [opentelemetry/instrumentation-grpc](https://www.npmjs.com/package/@opentelemetry/instrumentation-grpc)
* [opentelemetry/instrumentation-hapi](https://www.npmjs.com/package/@opentelemetry/instrumentation-hapi)
* [opentelemetry/instrumentation-http](https://www.npmjs.com/package/@opentelemetry/instrumentation-http)
* [opentelemetry/instrumentation-ioredis](https://www.npmjs.com/package/@opentelemetry/instrumentation-ioredis)
* [opentelemetry/instrumentation-knex](https://www.npmjs.com/package/@opentelemetry/instrumentation-knex)
* [opentelemetry/instrumentation-koa](https://www.npmjs.com/package/@opentelemetry/instrumentation-koa)
* [opentelemetry/instrumentation-lru-memoizer](https://www.npmjs.com/package/@opentelemetry/instrumentation-lru-memoizer)
* [opentelemetry/instrumentation-memcached](https://www.npmjs.com/package/@opentelemetry/instrumentation-memcached)
* [opentelemetry/instrumentation-mongodb](https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb)
* [opentelemetry/instrumentation-mongoose](https://www.npmjs.com/package/@opentelemetry/instrumentation-mongoose)
* [opentelemetry/instrumentation-mysql](https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql)
* [opentelemetry/instrumentation-mysql2](https://www.npmjs.com/package/@opentelemetry/instrumentation-mysql2)
* [opentelemetry/instrumentation-nestjs-core](https://www.npmjs.com/package/@opentelemetry/instrumentation-nestjs-core)
* [opentelemetry/instrumentation-net](https://www.npmjs.com/package/@opentelemetry//instrumentation-net)
* [opentelemetry/instrumentation-pg](https://www.npmjs.com/package/@opentelemetry/instrumentation-pg)
* [opentelemetry/instrumentation-pino](https://www.npmjs.com/package/@opentelemetry/instrumentation-pino)
* [opentelemetry/instrumentation-redis](https://www.npmjs.com/package/@opentelemetry/instrumentation-redis)
* [opentelemetry/instrumentation-redis-4](https://www.npmjs.com/package/@opentelemetry/instrumentation-redis-4)
* [opentelemetry/instrumentation-restify](https://www.npmjs.com/package/@opentelemetry/instrumentation-restify)
* [opentelemetry/instrumentation-router](https://www.npmjs.com/package/@opentelemetry/instrumentation-router)
* [opentelemetry/instrumentation-socket.io](https://www.npmjs.com/package/@opentelemetry/instrumentation-socket.io)
* [opentelemetry/instrumentation-tedious](https://www.npmjs.com/package/@opentelemetry/instrumentation-tedious)
* [opentelemetry/instrumentation-undici](https://www.npmjs.com/package/@opentelemetry/instrumentation-undici)
* [opentelemetry/instrumentation-winston](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston)

### Limitations

* Only OTLP/HTTP proto exporter is supported
* Only W3C context propagation is supported
* Support for logs and metrics requires instrumentation using official OpenTelemetry for JS
