---
id: dotnet
title: AWS Lambda - .NET Function Instrumentation
sidebar_label: .NET
description: Learn how to install and configure OpenTelemetry distributed tracing for AWS .NET-based Lambda functions and send data to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApmTrace from '../../../../../reuse/apm-traces-layer-order.md';

This document covers how to install and configure OpenTelemetry distributed tracing for AWS Lambda functions based on .NET and send the data to Sumo Logic.

To obtain tracing data from AWS Lambda functions developed in .NET, you can use the following components

### Provided SDK

[OpenTelemetry Lambda SDK for .NET](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.AWSLambda) includes tracing APIs to instrument Lambda handlers and is provided on [NuGet](https://www.nuget.org/packages/OpenTelemetry.Instrumentation.AWSLambda).

### OpenTelemetry Lambda layer

[OpenTelemetry Lambda Layer for Collector](https://github.com/open-telemetry/opentelemetry-lambda/tree/main/collector#opentelemetry-collector-aws-lambda-extension-layer) includes OpenTelemetry Collector for Lambda components. Apply this layer to your Lambda handler that's already been instrumented with the OpenTelemetry Lambda .NET SDK to enable end-to-end tracing.

#### .NET Lambda layer supports

* .NET 6 SDK or later
* x86_64 and arm64 architectures

### Lambda function requirements

You'll need the following:

* .NET 6 SDK or later
* Lambda layers add permissions
* Sumo Logic OTLP/HTTP Source endpoint URL - To send spans from the instrumented Lambda function to Sumo Logic you need an endpoint URL from an existing or new [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp).

## Quick Start

### Overview

```text
┌─────────────────────┐    OTLP     ┌──────────────────────┐    HTTP     ┌─────────────┐
│   .NET Lambda       │ ────────►   │ Collector Layer      │ ────────►   │ Sumo Logic  │
│   Function          │  (default)  │ (Lambda Extension)   │ (protobuf)  │ OTLP Endpoint│
│   (Function.cs)     │             │ localhost:4318       │             │             │
└─────────────────────┘             └──────────────────────┘             └─────────────┘
```

### Prerequisites

* AWS CLI configured with appropriate permissions
* Configure the [AWS credential](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
* .NET 6 SDK
* Sumo Logic OTLP endpoint URL

### Configure the Collector Lambda layer

Use the following upstream [collector lambda layer](https://github.com/open-telemetry/opentelemetry-lambda/tree/main?tab=readme-ov-file#latest-layer-versions)

* `arn:aws:lambda:<region>:184161586896:layer:opentelemetry-collector-<amd64|arm64>-<version>:1`

By default, OpenTelemetry Collector Lambda layer exports telemetry data to AWS backends. To customize the collector configuration, add a collector.yaml to your function and specify its location via the `OPENTELEMETRY_COLLECTOR_CONFIG_URI` environment file

* Configure the collector layer to send data to SumoLogic:

    ```yaml
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: localhost:4317
          http:
            endpoint: localhost:4318

    exporters:
      otlphttp:
        endpoint: ${SUMO_LOGIC_OTLP_ENDPOINT}
        headers:
          Content-Type: application/x-protobuf
        encoding: proto

    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlphttp]
    ```

    Set the following environment variables:

    | Variable | Value | Purpose |
    |----------|-------|---------|
    | `SUMO_LOGIC_OTLP_ENDPOINT` | `https://your-endpoint.sumologic.net/receiver/v1/otlp/YOUR_TOKEN/v1/traces` | Sumo Logic endpoint |

    Once the file has been deployed with a Lambda, configuring the `OPENTELEMETRY_COLLECTOR_CONFIG_URI` will tell the OpenTelemetry extension where to find the collector configuration:

    ```bash
    aws lambda update-function-configuration --function-name Function --environment Variables={OPENTELEMETRY_COLLECTOR_CONFIG_URI=/var/task/collector.yaml}
    ```

### Configure the lambda function

Navigate to [functions](https://console.aws.amazon.com/lambda/home#/functions) in the AWS Lambda Console and open the function you want to instrument.

* Navigate to the **Layers** section and click **Add a layer**.

* In the **Choose a layer** menu, select **Specify an ARN** and paste the ARN ID for your Lambda function

  :::note
  Lambda layers are a regionalized resource, meaning that they can only be used in the Region in which they are published. Make sure to use the layer in the same region as your Lambda functions.
  :::

* Configure the following environment variables:

  | Variable | Value | Purpose |
  |----------|-------|---------|
  | `OTEL_EXPORTER_OTLP_ENDPOINT` | `localhost:4318` | Collector endpoint |
  | `OTEL_EXPORTER_OTLP_PROTOCOL` | `http/protobuf` | Export protocol |
  | `AWS_LAMBDA_EXEC_WRAPPER` | `/opt/otel-instrument` | Lambda wrapper |

Your function should be successfully instrumented. Invoke the function and find your traces in the [Sumo Logic Tracing screen](/docs/apm/traces/view-and-investigate-traces)

## References

* [OpenTelemetry Lambda Layer Documentation](https://github.com/open-telemetry/opentelemetry-lambda)

* [Sumo Logic OTLP Integration](https://help.sumologic.com/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/)
