---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java
title: Java OpenTelemetry auto-instrumentation
sidebar_label: Java OpenTelemetry auto-instrumentation
description: OpenTelemetry Instrumentation for Java automatically detects when one of the popular libraries is being used in the service and injects the instrumentation without writing any code.
---

Perhaps the most convenient way to start capturing telemetry from Java (or, generally speaking, JVM) is to incorporate [OpenTelemetry Instrumentation for Java](https://github.com/open-telemetry/opentelemetry-java-instrumentation). It automatically detects when one of the [popular libraries](https://github.com/open-telemetry/opentelemetry-java-instrumentation#supported-libraries-frameworks-and-application-servers) is being used in the service and injects the instrumentation without writing any code. It’s also possible to mix automatic instrumentation with manual instrumentation if needed. This method works for all Java 8+ JVMs.

:::tip
If the OTLP Java exporter fails due to missing system libraries, we recommend using the Zipkin exporter.
:::

import Iframe from 'react-iframe';

:::sumo Micro Lesson
Tutorial: Auto-instrumentation of a Java app by OpenTelemetry for K8s Environment.

<Iframe url="https://www.youtube.com/embed/P_74rhI1M30?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::

## Installation

The Java agent and configuration needs to be provided for each of the monitored service instances. The address of the OpenTelemetry Collector (or Collector/Agent) needs to be prepared first (`COLLECTOR_HOSTNAME`) and the desired name of the service (`SERVICE_NAME`) and application (`APPLICATION_NAME`).

Instruction below applies to **OpenTelemetry Java Auto Instrumentation** in version **1.26.0**.

## Step 1: Download and distribute the agent JAR

The [agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.26.0/opentelemetry-javaagent.jar) should be downloaded and distributed to each of the service hosts or containers, as the JVM will need access to it.

:::note
Ensure that the agent has root permissions for the Java jar files.
:::

## Step 2: Update the JVM configuration (valid for version 1.26.0)

Either of the following options could be used as the template, with the following changes:

* The path to the javaagent JAR file needs to replaced with the location of the file downloaded and distributed in step 1.
* `OTLP_HTTP_ENDPOINT` must be provided with the location of the OpenTelemetry Collector/Agent (recommended for production) or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp). Refer to the following setup instructions if you don't yet have the collector installed:
  * [Set up traces collection for Kubernetes environments](../../set-up-traces-collection-for-kubernetes-environments.md)
  * [Set up traces collection for other environments](../../set-up-traces-collection-for-other-environments.md)
* `SERVICE_NAME` needs to be replaced with the name used for the identification of the service.
* `APPLICATION_NAME` needs to be replaced with the name used for the identification of the application.

### Option 1: Leveraging environment variables (recommended)

The following environment variables need to be made accessible by JVM:

```bash
JAVA_TOOL_OPTIONS="-javaagent:path/to/opentelemetry-javaagent.jar"

OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=none
OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_SERVICE_NAME=SERVICE_NAME
OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME
```

### Option 2: Changing the java command line

The command line of the service needs to be appended with the following
attributes:

```bash
java -javaagent:path/to/opentelemetry-javaagent.jar \
    -Dotel.traces.exporter=otlp \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.endpoint=http://OTLP_HTTP_ENDPOINT \
    -Dotel.exporter.otlp.protocol=http/protobuf \
    -Dotel.service.name=SERVICE_NAME \
    -Dotel.resource.attributes=application=APPLICATION_NAME \
    ...
```

:::note
When setting up OTLP Endpoint for OpenTelemetry Collector/Agent add port number (4318) e.g. `http://OTLP_HTTP_ENDPOINT:4318`.
:::

## Troubleshooting

To confirm the instrumentation was installed, after starting the service, the following log lines are to be expected in the console:

```log
[otel.javaagent 2023-06-12 09:39:15:913 +0000] [main] INFO io.opentelemetry.javaagent.tooling.VersionLogger - opentelemetry-javaagent - version: 1.26.0
```
